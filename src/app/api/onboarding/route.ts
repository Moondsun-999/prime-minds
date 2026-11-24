// Receives a client's onboarding answers and forwards them to ONBOARDING_WEBHOOK_URL, which saves
// them to clients/<slug>/intake/ in the ops repo. Unlike the opt-in, a failure is reported to the
// client so her answers are never silently lost (the form keeps a copy in her browser).
import { clientForCode, cleanAnswers, missingRequired, toMarkdown } from "@/lib/onboarding";

interface OnboardingBody {
  code?: unknown;
  answers?: unknown;
  website?: unknown; // honeypot: real people leave it empty
}

const MAX_BODY = 100_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ ok: false, error: "too_large" }, { status: 413 });

  let body: OnboardingBody;
  try {
    body = JSON.parse(raw) as OnboardingBody;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website !== "") return Response.json({ ok: true });

  const slug = typeof body.code === "string" ? clientForCode(body.code) : null;
  if (!slug) return Response.json({ ok: false, error: "link" }, { status: 404 });

  const answers = cleanAnswers(body.answers);
  const missing = missingRequired(answers);
  if (missing.length) return Response.json({ ok: false, error: "missing", missing }, { status: 400 });

  const webhook = process.env.ONBOARDING_WEBHOOK_URL;
  if (!webhook) return Response.json({ ok: false, error: "store" }, { status: 503 });

  const submittedAt = new Date().toISOString();
  // Date and time (UTC) in the name, so a second submission never collides with the first.
  const stamp = submittedAt.slice(0, 16).replace("T", "-").replace(":", "");
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Onboarding-Secret": process.env.ONBOARDING_WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify({
        client: slug,
        submittedAt,
        path: `clients/${slug}/intake/${stamp}-onboarding.md`,
        markdown: toMarkdown(slug, answers, submittedAt),
        answers,
      }),
    });
    if (!res.ok) return Response.json({ ok: false, error: "store" }, { status: 502 });
  } catch {
    return Response.json({ ok: false, error: "store" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

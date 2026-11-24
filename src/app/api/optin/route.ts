// Receives the lead-magnet opt-in and forwards it to OPTIN_WEBHOOK_URL (for example an n8n webhook).
// The guide is delivered on-site either way, so a webhook failure never blocks the reader.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface OptInBody {
  name?: unknown;
  email?: unknown;
  company?: unknown; // honeypot: real people leave it empty
}

export async function POST(request: Request) {
  let body: OptInBody;
  try {
    body = (await request.json()) as OptInBody;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";

  if (typeof body.company === "string" && body.company !== "") {
    return Response.json({ ok: true });
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return Response.json({ ok: false, error: "email" }, { status: 400 });
  }

  const webhook = process.env.OPTIN_WEBHOOK_URL;
  let stored = false;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "pick-one",
          at: new Date().toISOString(),
        }),
      });
      stored = res.ok;
    } catch {
      stored = false;
    }
  }

  return Response.json({ ok: true, stored });
}

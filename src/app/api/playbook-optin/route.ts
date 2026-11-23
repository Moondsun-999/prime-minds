// Receives the /playbook opt-in (name, WhatsApp, email, "paid clients in the last 6 months?") and
// forwards it to PLAYBOOK_OPTIN_WEBHOOK_URL (an n8n webhook that writes to HubSpot and sends the guide).
// Until that variable is set, the request is accepted but nothing is stored (`stored: false`).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{7,18}$/;
const MAX_BODY = 4_000;

interface PlaybookOptInBody {
  name?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  paid?: unknown;
  company?: unknown; // honeypot: real people leave it empty
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ ok: false, error: "too_large" }, { status: 413 });

  let body: PlaybookOptInBody;
  try {
    body = JSON.parse(raw) as PlaybookOptInBody;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company !== "") return Response.json({ ok: true });

  const name = text(body.name, 80);
  const whatsapp = text(body.whatsapp, 22);
  const email = text(body.email, 200);
  const paid = body.paid === "yes" || body.paid === "no" ? body.paid : null;

  const missing = [
    !name && "name",
    !PHONE.test(whatsapp) && "whatsapp",
    !EMAIL.test(email) && "email",
    !paid && "paid",
  ].filter(Boolean);
  if (missing.length) return Response.json({ ok: false, error: "missing", missing }, { status: 400 });

  const webhook = process.env.PLAYBOOK_OPTIN_WEBHOOK_URL;
  let stored = false;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          paidLast6Months: paid === "yes",
          source: "playbook",
          at: new Date().toISOString(),
        }),
      });
      stored = res.ok;
    } catch {
      stored = false;
    }
    if (!stored) return Response.json({ ok: false, error: "store" }, { status: 502 });
  }

  return Response.json({ ok: true, stored });
}

# Deployment — Prime Minds (khalk.co)

Checked 2026-11-11.

## How it's wired
- **GitHub:** `Moondsun-999/prime-minds`, branch `master`.
- **Vercel:** project `prime-minds` in the `khalks-projects` team, connected to the GitHub repo.
  Every push to `master` deploys production; every PR gets a preview URL.
- **Domains (Vercel):** `www.khalk.co` (primary) and `khalk.co`. The apex redirects to `www.khalk.co`.
- **DNS (Cloudflare, nameservers `ivy`/`max.ns.cloudflare.com`):**

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | @ | Vercel IPs (216.198.79.1, 64.29.17.1) | DNS only (grey cloud) |
| CNAME | www | project-specific `*.vercel-dns-017.com` target | DNS only (grey cloud) |

> Keep both records **DNS only**. Proxying through Cloudflare conflicts with Vercel's SSL.

Vercel shows the nameservers with a ✗ because DNS is managed at Cloudflare, not Vercel. That's expected.

## Environment variables
Set in Vercel → Project → Settings → Environment Variables (server-only; never `NEXT_PUBLIC_`).

Client onboarding form (`/onboarding/<code>`):
- `ONBOARDING_CODES`: private link codes mapped to client folder slugs, `code1:kawtar,code2:nachwa`.
  Codes are random, 16–64 letters/digits. Any code not listed gets a 404. Add a pair per new client.
- `ONBOARDING_WEBHOOK_URL`: where `/api/onboarding` sends the answers (JSON with `client`, `path`,
  `markdown`, `answers`). The receiver saves `markdown` to `path` in the ops repo.
- `ONBOARDING_WEBHOOK_SECRET`: sent as the `X-Onboarding-Secret` header; the receiver rejects anything else.

Until the webhook is set, the form shows the client an error on submit and keeps her answers in her
browser, so nothing is lost.

## `vercel.json`
Security headers on every route and long-term caching for `/images/*`. Redirects are handled by the
Vercel domain settings, not this file.

## Checking a deploy
1. `vercel ls prime-minds` (or the Vercel connector) shows the latest deploy as **Ready**.
2. Open https://khalk.co: it should land on https://www.khalk.co with a valid padlock.
3. Check on mobile.

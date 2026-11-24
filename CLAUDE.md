@AGENTS.md

# prime-minds (website)

The Prime Minds website at **khalk.co**: an English VSL landing page that sends visitors to the
Skool community. An admin panel is planned here but not built yet.

Business knowledge (ICP, offer, research, clients, content, automations) lives in the ops repo
(`../ops`), not here. Brand and voice come from the global brief (`../CLAUDE.md`, `../brand/`).
Read the canonical offer and ICP from `../ops/docs/primeminds/` before changing any copy.

## Stack
- Next.js 16 (App Router, `src/app`), React 19, TypeScript strict
- CSS Modules + custom properties from `src/app/globals.css`. No Tailwind.
- Vercel hosting (GitHub-connected, `vercel.json` for headers), Vercel Web Analytics
- DNS on Cloudflare (`khalk.co`); the apex redirects to `www.khalk.co`
- npm (`package-lock.json`)

## Commands
- `npm run dev`: dev server on http://localhost:3000
- `npm run lint`: ESLint
- `npx tsc --noEmit`: typecheck
- `npm run build`: production build; run before every PR

## Layout
- `src/app/[lang]`: the home page in three languages (`/ar` Arabic, `/en` English, `/ma` Darija in Latin letters); `src/proxy.ts` redirects `/` by country and phone language; copy in `src/content/home/`; `src/i18n/config.ts` holds the detection rules
- `src/app/(en-only)`: pages that stay outside the language routes (guide, coaching, onboarding), with their own root layout; `src/app/fonts.ts`, `globals.css` (tokens)
- `src/components`: one section per file (`Hero`, `ProblemSection`, `PricingSection`, …), each with its `.module.css`
- `src/components/ui`: reusable primitives (Button, Card, Accordion, SectionWrapper)
- `public/images/brand`: logos and favicons used by the site
- `src/app/(en-only)/guide` (lead-magnet opt-in), `…/guide/pick-one` (the workbook), `…/coaching` (1:1 landing page), `src/app/api/optin` (forwards opt-ins to `OPTIN_WEBHOOK_URL`)
- `src/content/pickOne.ts`: the workbook's text (single source); `src/lib/links.ts`: booking link and funnel paths
- `…/onboarding/[code]`: private Arabic onboarding form for coaching clients (noindex, 404 without a valid code); questions in `src/content/onboarding.ts`, server helpers in `src/lib/onboarding.ts`, submit route `src/app/api/onboarding` (forwards to `ONBOARDING_WEBHOOK_URL`)
- `src/app/[lang]/playbook`: the HVCO opt-in («محرّك العملاء») in ar, en and ma (`/playbook` redirects by language like `/`); Arabic is RTL with Amiri; text in `src/content/playbook/{ar,en,ma}.ts` (ar is the source), sections in `src/components/playbook/`, form posts to `src/app/api/playbook-optin` (forwards to `PLAYBOOK_OPTIN_WEBHOOK_URL`)
- `docs/deployment.md`: how Vercel + Cloudflare are wired

Code rules: `.claude/rules/code.md`.

## Workflow
- One branch per task (`feat/…`, `fix/…`, `chore/…`), PR to `master`, squash merge.
- Before a PR: `npm run lint`, typecheck, `npm run build`.
- Every PR gets a Vercel preview: check it before merging. **Merging or pushing to `master` deploys production.**
- Skool has no public API: every CTA is a direct link to the community.

## Never
- Read, print or edit `.env*` files (except `.env.example`), or commit secrets.
- Deploy with `vercel --prod` from a laptop; production deploys come from `master`.
- Publish copy that breaks the voice rules in `../brand/VOICE.md` (banned phrases, income claims).

## Mistakes log
<!-- When Claude gets something wrong, add a one-line rule here in the same PR as the fix. -->
- 2026-11-11 — Page title used the banned phrase "Financial Freedom" — check `../brand/VOICE.md` banned phrases before shipping copy.

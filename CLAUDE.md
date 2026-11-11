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
- `src/app`: `layout.tsx` (fonts, metadata, analytics), `page.tsx` (section order), `globals.css` (tokens)
- `src/components`: one section per file (`Hero`, `ProblemSection`, `PricingSection`, …), each with its `.module.css`
- `src/components/ui`: reusable primitives (Button, Card, Accordion, SectionWrapper)
- `public/images/brand`: logos and favicons used by the site
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

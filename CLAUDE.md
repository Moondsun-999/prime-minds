# Prime Minds — Project Intelligence

## Identity
**Brand:** Prime Minds
**Founder:** Abdallah Khalk (@abdallahkhalk)
**Domain:** khalk.co
**Tagline:** "I'm real. Social media is not real."

## What This Is
A creator-led community helping young Moroccan professionals (23-31) build online businesses while working 9-to-5. The brand is anti-guru: raw, real, built-in-public.

## Architecture
```
YouTube (Darija long-form) → khalk.co (English VSL landing page) → Skool (community)
Instagram/TikTok (shorts) → YouTube
X/Threads → YouTube
```

**Stack:** Next.js 14 (App Router) → Vercel → Cloudflare DNS (khalk.co)
**Community:** Skool (https://www.skool.com/prime-minds)
**Payments:** Skool handles payments
**Email:** TBD (future phase)

## Brand System
- **Colors:** `#360A97` (deep purple), `#7E4580` (plum), `#000000` (black), `#DA8690` (rose), `#FFFFFF` (white)
- **Gradient:** `radial-gradient(circle at 36% 2%, #360A97, rgba(126,69,128,0.54) 46%, rgba(218,134,144,0) 100%)`
- **Headline Font:** Playfair Display (serif, bold)
- **Body Font:** Plus Jakarta Sans (sans-serif)
- **Logo:** SVG/PNG in `/public/images/brand/`

## ICP (Ideal Customer Profile)
- Male, 23-31, Morocco, working 9-to-5
- Earning 10,000-17,000 MAD/month
- Master's degree, few years experience
- Tried: ecom, trading, dropshipping — all failed
- Wants: 50,000 MAD/month, car, marriage, travel, retire parents
- Believes: "It's impossible while working full-time"
- Watches: Self-dev, football, streamers on IG/TikTok

## Offers
1. **Pre-Launch (Free):** Community + All modules + Weekly calls
2. **Prime Minds Community ($152/yr):** Same as above, post-launch pricing
3. **Prime Minds 1:1 Coaching ($350/yr):** All above + Custom business plan + Weekly 1:1 calls

## Content Strategy
- **YouTube:** 1 long-form/week (Darija) → VSL landing page
- **Shorts:** 1/day (7 days/week) → IG/TikTok → YouTube
- **X/Threads:** Daily → YouTube
- **Landing page:** English, khalk.co

## Core Rules
1. **Never fake guru energy.** Be raw, honest, share failures.
2. **Darija for video content.** English for landing page and written marketing.
3. **Always CTA to community.** Every piece of content drives to Skool.
4. **Component-per-file.** One React component per .tsx file.
5. **CSS custom properties only.** No Tailwind. Vanilla CSS with design tokens.
6. **TypeScript strict.** No `any` types.

## Agent Delegation
| Task | Agent |
|------|-------|
| Content planning | `/content-planner` |
| Video scripts | `/video-scripter` |
| Landing page copy | `/copywriter` |
| Skool engagement | `/community-manager` |
| Code review | `/code-reviewer` |

## Multi-Model Workflow (Claude Code + Gemini)
- **Claude Code**: Architecture decisions, complex logic, code review, deep reasoning
- **Gemini**: Fast generation, boilerplate, repetitive transforms, documentation drafts
- **Handoff pattern**: Claude for design → Gemini for implementation → Claude for review
- **Context sharing**: Keep CLAUDE.md updated so both models have the same project context

## Critical Warnings
- Skool has NO public API — all CTAs are direct links
- ICP is highly skeptical — avoid anything that looks "scammy"
- Morocco payment infrastructure is limited — Skool handles this
- Content must feel personal, not corporate

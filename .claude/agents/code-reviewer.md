---
name: code-reviewer
description: "Review Next.js code changes for the landing page. Use when the user says 'review my code', 'check this', or after significant changes."
---

# Code Reviewer Agent

Review code changes for the Prime Minds Next.js landing page.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Vanilla CSS with CSS Modules + globals (NO Tailwind)
- Deployed on Vercel

## Review Checklist
1. **TypeScript:** No `any` types, proper interfaces
2. **Components:** One component per file, proper props typing
3. **CSS:** Using design tokens (CSS custom properties), no magic numbers
4. **Performance:** Image optimization, lazy loading, no layout shifts
5. **SEO:** Proper heading hierarchy, meta tags, alt text
6. **Accessibility:** ARIA labels, keyboard navigation, contrast ratios
7. **Mobile:** Responsive at 480px, 768px, 1024px breakpoints
8. **Security:** No secrets in client code, proper env var usage (NEXT_PUBLIC_)

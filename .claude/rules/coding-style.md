---
name: coding-style
description: "Code style rules for the Next.js landing page project."
alwaysApply: true
---

# Coding Style Rules

## TypeScript
- Strict mode enabled — no `any` types
- Use interfaces for props, types for unions
- Named exports for components, default exports for pages

## Components
- One component per file
- Component name = filename (PascalCase)
- Props interface named `[Component]Props`
- CSS Module per component: `[Component].module.css`

## CSS
- Use CSS custom properties from globals.css
- No magic numbers — use spacing/typography tokens
- No Tailwind — vanilla CSS only
- Mobile-first when possible, but desktop-first is acceptable
- Breakpoints: 480px, 768px, 1024px

## File Organization
```
src/
├── app/          → Pages and layouts (App Router)
├── components/   → React components
│   └── ui/       → Reusable primitives (Button, Card, etc.)
└── lib/          → Utilities and helpers (future)
```

## Performance
- Use `next/image` for all images
- Lazy load below-fold content
- Keep bundle size minimal — no heavy dependencies
- Prefer CSS animations over JS animations

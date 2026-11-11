---
paths:
  - "src/**"
---

# Code rules

## TypeScript
- Strict mode, no `any`.
- Interfaces for props (`[Component]Props`), types for unions.
- Named exports for components, default exports for pages and layouts.

## Components
- One component per file; component name = filename (PascalCase).
- One CSS Module per component: `[Component].module.css`.
- Reusable primitives go in `src/components/ui/`.

## CSS
- Use the custom properties in `src/app/globals.css`; no magic numbers, use the spacing and type tokens.
- Vanilla CSS only, no Tailwind.
- Breakpoints: 480px, 768px, 1024px.
- Prefer CSS animations over JS animations.

## Performance
- `next/image` for every image.
- Lazy-load below-the-fold content.
- No heavy dependencies; check bundle impact before adding one.

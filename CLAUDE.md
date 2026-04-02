# Claude Code Guide — Miami Springs Historical Society

## Content (events, board members)

Dynamic content is stored as Markdown files, not in components:

- **Events** → `src/content/events/` — one `.md` file per event
- **Board members** → `src/content/board/` — one `.md` file per board member
- **Resources page links** → `src/data/resources.ts`
- **Site settings** (email, phone, Facebook URL) → `src/data/general.json`
- **Museum hours** → `src/data/general.json` under `hours`

## Design system

All colors, fonts, and spacing use CSS custom properties defined in `src/layouts/Layout.astro`. Never hardcode hex values, rgba colors, or font names in components — use the variables:

```css
var(--color-primary)      /* brown */
var(--color-accent)       /* green */
var(--color-bg)           /* off-white */
var(--color-text-muted)   /* muted brown */
var(--font-display)       /* Playfair Display */
var(--font-body)          /* Lora */
```

## Accessibility

The site targets WCAG 2.1 AA. When adding new sections or components:

- Add `aria-labelledby` to all `<section>` elements
- Use semantic HTML (`<nav>`, `<main>`, `<header>`, `<footer>`)
- Ensure focus styles are visible (use `:focus-visible` with `var(--color-accent)`)
- Don't go below 0.75rem font size
- Alt text on images should be descriptive

## Deployment

Pushing to `main` automatically builds and deploys via GitHub Actions. The site is static — Astro generates HTML at build time, served via Cloudflare Workers.

Verify changes locally before pushing: `npm run build`.

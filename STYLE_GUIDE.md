# Miami Springs Historical Society — Style Guide

## Colors

All colors are defined as CSS custom properties in `src/layouts/Layout.astro`. **Never hardcode hex or rgba values in components.** Use these variables:

| Variable | Value | Use |
|---|---|---|
| `--color-primary` | `#8b4513` | Main brown — headings, buttons, links |
| `--color-primary-dark` | `#6b3410` | Hover state for primary |
| `--color-secondary` | `#d2b48c` | Tan — nav accents, decorative borders |
| `--color-accent` | `#2c5f2d` | Forest green — dividers, hover links |
| `--color-eyebrow` | `#a8e6a9` | Light green — accent text on dark backgrounds |
| `--color-bg` | `#faf6f0` | Off-white page background |
| `--color-bg-alt` | `#e8d8c4` | Warm tan — alternate section backgrounds |
| `--color-text` | `#2a1a0e` | Body text |
| `--color-text-muted` | `#6b5040` | Secondary text |
| `--color-white` | `#fff` | Pure white |
| `--color-nav-bg` | `rgba(42,26,14,0.93)` | Nav bar background |
| `--color-nav-bg-mobile` | `rgba(42,26,14,0.97)` | Nav mobile dropdown |
| `--color-overlay-dark` | `rgba(42,26,14,0.82)` | Dark photo overlay |
| `--color-overlay-light` | `rgba(250,246,240,0.88)` | Light panel overlay |
| `--color-panel-text-light` | `rgba(250,246,240,0.92)` | Body text on dark panels |
| `--color-panel-counter-light` | `rgba(250,246,240,0.7)` | Secondary text on dark panels |
| `--color-panel-counter-dark` | `rgba(42,26,14,0.6)` | Secondary text on light panels |
| `--color-footer-text` | `rgba(250,246,240,0.6)` | Footer body text |
| `--color-footer-link-border` | `rgba(250,246,240,0.5)` | Footer link underline |
| `--color-footer-link-border-hover` | `rgba(250,246,240,0.7)` | Footer link underline hover |
| `--color-btn-ghost-border` | `rgba(255,255,255,0.55)` | Ghost button border |
| `--color-btn-ghost-hover` | `rgba(255,255,255,0.08)` | Ghost button hover background |
| `--color-facebook` | `#1877f2` | Facebook brand blue |
| `--color-facebook-dark` | `#0f5cc9` | Facebook brand blue hover |
| `--color-overlay-gradient-start` | `rgba(42,26,14,0.6)` | Photo overlay gradient top |
| `--color-overlay-gradient-mid` | `rgba(42,26,14,0.75)` | Photo overlay gradient middle |
| `--color-overlay-gradient-end` | `rgba(42,26,14,0.88)` | Photo overlay gradient bottom |
| `--color-photo-credit` | `rgba(255,255,255,0.5)` | Photo credit text on dark photo |
| `--color-photo-credit-link` | `rgba(255,255,255,0.6)` | Photo credit link on dark photo |
| `--color-photo-credit-link-hover` | `rgba(255,255,255,0.9)` | Photo credit link hover on dark photo |

### Contrast rules (WCAG 2.1 AA)

- Normal text on any background: **4.5:1 minimum**
- Large text (≥ 1.5rem bold or ≥ 2rem): **3:1 minimum**
- Decorative non-text elements (borders, dividers): **3:1 minimum**
- Dark green (`--color-accent`) **must not** be used for text or icons on the dark nav background — use `--color-secondary` instead
- Dark green **must not** be used for decorative elements on dark overlays — use `--color-eyebrow` instead

---

## Typography

| Variable | Value |
|---|---|
| `--font-display` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'Lora', Georgia, serif` |

- `--font-display` — headings (h1–h4), logo, section titles
- `--font-body` — all body copy, nav links, buttons, captions
- **Minimum font size: 0.75rem.** Never go smaller.
- Both fonts are loaded via Google Fonts in `Layout.astro`.

---

## Spacing

Max content width: `--max-width: 1100px`

Recurring patterns:
- Section top/bottom padding: `5rem 0`
- Container horizontal padding: `0 2rem`
- Section heading bottom margin: `1rem`
- Divider bottom margin: `2.5rem` (centered), `1.25rem` (left-aligned)

---

## Components

### Section title + divider

Every section uses this pattern:

```html
<h2 id="[section]-heading" class="section-heading">
  <a href="#[section]">Section Title</a>
</h2>
<div class="divider"></div>
```

```css
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
}
.divider {
  width: 60px;
  height: 3px;
  background-color: var(--color-accent);
  margin: 0 auto 2.5rem;
}
```

Use `.divider--left` for left-aligned dividers (shorter bottom margin: `1.25rem`).
On **dark panel backgrounds**, use `--color-eyebrow` for the divider instead of `--color-accent`.

### Buttons

**Primary:**
- Background: `--color-primary` / hover: `--color-primary-dark`
- Text: `--color-white`
- Border: `2px solid --color-primary`
- Padding: `0.75rem 2rem`
- Font: `--font-body`, `0.8125rem`, uppercase, `letter-spacing: 0.1em`

**Ghost (on dark/photo backgrounds):**
- Background: transparent / hover: `--color-btn-ghost-hover`
- Text: `--color-white`
- Border: `2px solid --color-btn-ghost-border`

**Link-style:**
- Text: `--color-primary` / hover: `--color-accent`
- `border-bottom: 2px solid --color-accent`
- Font: `0.8125rem`, uppercase

---

## Accessibility

This site targets **WCAG 2.1 AA**.

- Every `<section>` must have `aria-labelledby` pointing to its heading `id`
- Use semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`
- All images must have descriptive `alt` text (not empty, not "image of")
- Focus styles use the global rule in `Layout.astro` — do not override `:focus-visible` without maintaining visibility
- Do not go below `0.75rem` font size
- The skip link (`<a class="skip-link">`) in `Layout.astro` must remain as-is

---

## Internationalization

All user-facing strings go in `src/i18n/en.json` (English) and `src/i18n/es.json` (Spanish). Every key in `en.json` must have a matching key in `es.json`.

**Allowed exceptions for hardcoded strings:** proper nouns (org name, place names), addresses, email addresses, phone numbers, photo credits.

---

## Adding new CSS variables

If a new color or opacity variant is needed and no existing variable fits, add it to the `:root` block in `src/layouts/Layout.astro` before using it. Name variables by role, not by value (e.g., `--color-footer-link-border`, not `--color-white-50`).

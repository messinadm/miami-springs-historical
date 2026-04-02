# Miami Springs Historical Society Website

Static website for the [Miami Springs Historical Society](https://miamispringshistoricalsociety.com), built with [Astro](https://astro.build) and hosted on [Cloudflare Workers](https://workers.cloudflare.com).

## How it works

```
Edit files → git commit → git push to main → Cloudflare builds → site is live (~1 min)
```

Content — events, board members, and site settings — is stored as plain files in this repo. No CMS login required. Change a file, push it, and the site updates automatically.

## Quick start (local development)

```bash
npm install        # first time only
npm run dev        # http://localhost:4321
npm run build      # verify production build locally
```

## Updating content

### Site settings
Edit `src/data/general.json` — hours, email, phone, Facebook URL. Changes propagate to all sections of the site automatically.

> **Note:** Museum hours also appear in `src/i18n/en.json` under `footer.hours` — update both if hours change.

### Events
Add a file to `src/content/events/` named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "Annual Membership Meeting"
date: 2026-04-14T18:30:00-04:00
location: "Curtiss Mansion, 500 Deer Run Drive"
---

Description of the event.
```

The site automatically sorts events by date and hides them after they pass.

For a recurring event (second Tuesday each month), use:

```markdown
---
title: "Museum Open Hours"
recurring: "monthly-second-tuesday"
recurringStartAfter: 2026-04-14
location: "501 East Drive"
---
```

### Board members
Add or edit a file in `src/content/board/`. The `order` field controls display order.

```markdown
---
name: "Jane Smith"
role: "President"
order: 1
---
```

Set `name: "TBD"` for vacant seats — they are automatically hidden from the site.

### Images
Drop files into `public/`. Reference them in components as `/filename.jpg`.

## Branch structure

| Branch | Purpose |
|---|---|
| `main` | Production — English-only site |
| `español` | Bilingual feature branch — merges into `main` once Spanish translations are verified by a native speaker |

Content and feature changes go on `main`. i18n wiring and translation changes go on `español`, which is kept rebased off `main`.

## Internationalization

The site is fully bilingual (English / Spanish). Spanish pages live under the `/es/` prefix.

### How it works

- Translation strings are stored in `src/i18n/en.json` and `src/i18n/es.json`
- The `useTranslations(locale)` helper in `src/i18n/utils.ts` looks up keys with dot notation and falls back to English if a key is missing
- All components use `const t = useTranslations(Astro.currentLocale)` to get locale-appropriate strings
- Astro's i18n routing (`astro.config.mjs`) handles the `/es/` prefix — the default locale (English) has no prefix
- A Cloudflare Worker (`worker.ts`) automatically redirects Spanish-preferring browsers to `/es` on first visit, respecting a `lang` cookie for explicit user preference

### Adding or updating translations

Edit `src/i18n/es.json` on the `ai-translated` branch. Every key in `en.json` should have a corresponding key in `es.json`. The `useTranslations` helper falls back to English for any missing key.

### Spanish pages

| English | Spanish |
|---|---|
| `/` | `/es` |
| `/museum` | `/es/museum` |
| `/resources` | `/es/resources` |
| `/*` (404) | `/es/404` |

## Internationalization

The site is fully bilingual (English / Spanish). Spanish pages live under the `/es/` prefix.

Translation strings are stored in `src/i18n/en.json` and `src/i18n/es.json`. All components use `const t = useTranslations(Astro.currentLocale)` to get locale-appropriate strings, with automatic fallback to English for any missing key.

A Cloudflare Worker (`worker.ts`) automatically redirects Spanish-preferring browsers to `/es` on first visit, based on the `Accept-Language` header. A `lang` cookie persists the user's explicit choice when they switch languages manually.

To update translations, edit `src/i18n/es.json`. Every key in `en.json` should have a corresponding key in `es.json`.

## Pages

| English | Spanish | Description |
|---|---|---|
| `/` | `/es` | Home — hero, about, history slideshow, events, connect, board, footer |
| `/museum` | `/es/museum` | Museum exhibits, visit info, satellite locations |
| `/resources` | `/es/resources` | Curated external references for Miami Springs history research |
| `/rss.xml` | — | RSS feed of upcoming events |
| `/*` (no match) | `/es/*` | Custom 404 page with 1920s land boom theme |

## Project structure

```
miami-springs-historical/
├── public/                  # Static assets (images, favicon, _headers)
├── src/
│   ├── components/          # Page sections
│   │   ├── Nav.astro        # Navigation with language switcher
│   │   ├── Hero.astro       # Full-bleed hero with CTA
│   │   ├── About.astro      # About section + history slideshow
│   │   ├── Events.astro     # Upcoming events from content collection
│   │   ├── FacebookFeed.astro  # Embedded Facebook Page widget + connect section
│   │   ├── Board.astro      # Board of directors from content collection
│   │   └── Footer.astro     # Footer with hours, links, attribution
│   ├── content/
│   │   ├── config.ts        # Zod schema validation for content collections
│   │   ├── events/          # One .md file per event
│   │   └── board/           # One .md file per board member
│   ├── data/
│   │   ├── general.json     # Site-wide settings (email, phone, Facebook URL)
│   │   └── resources.ts     # Curated links data for the resources page
│   ├── i18n/
│   │   ├── en.json          # English translation strings
│   │   ├── es.json          # Spanish translation strings
│   │   └── utils.ts         # useTranslations() helper with English fallback
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML, SEO meta, structured data, global styles
│   └── pages/
│       ├── index.astro      # Home page (English)
│       ├── museum.astro     # Museum page (English)
│       ├── resources.astro  # Resources & references page (English)
│       ├── 404.astro        # Custom 404 page (English)
│       ├── rss.xml.ts       # RSS feed generator
│       └── es/              # Spanish equivalents of all pages
│           ├── index.astro
│           ├── museum.astro
│           ├── resources.astro
│           └── 404.astro
├── worker.ts                # Cloudflare Worker — static assets + language detection/redirect
├── wrangler.jsonc           # Cloudflare Workers configuration
├── astro.config.mjs         # Astro configuration (sitemap, output settings)
├── .github/
│   └── workflows/
│       ├── ci.yml           # Type check + build on PRs to main
│       └── deploy.yml       # Build + deploy to Cloudflare on push to main
└── package.json
```

## Accessibility

The site targets WCAG 2.1 AA compliance:

- Skip-to-main-content link for keyboard users
- `aria-labelledby` on all landmark sections
- `aria-current="page"` on active nav link
- Focus ring with sufficient contrast (green accent)
- Minimum font size 0.75rem across all elements
- Two-factor link styling (color + border-bottom) for non-color-dependent identification
- Semantic HTML throughout

## Tech stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site framework |
| [Cloudflare Workers](https://workers.cloudflare.com) | Hosting, CDN, and edge Worker |
| GitHub Actions | CI (type check + build on PRs) and CD (deploy on push to main) |
| Markdown | Content authoring for events and board members |
| TypeScript + Zod | Schema validation for content collections |
| `@astrojs/sitemap` | Automatic sitemap generation |
| `@astrojs/rss` | RSS feed generation |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for one-time Cloudflare setup, required secrets, and deployment details.

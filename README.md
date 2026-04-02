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

## Pages

| URL | Description |
|---|---|
| `/` | Home — hero, about, history slideshow, events, connect, board, footer |
| `/museum` | Museum exhibits, visit info, satellite locations |
| `/resources` | Curated external references for Miami Springs history research |
| `/rss.xml` | RSS feed of upcoming events |
| `/*` (no match) | Custom 404 page with 1920s land boom theme |

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
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML, SEO meta, structured data, global styles
│   └── pages/
│       ├── index.astro      # Home page
│       ├── museum.astro     # Museum page
│       ├── resources.astro  # Resources & references page
│       ├── 404.astro        # Custom 404 page
│       └── rss.xml.ts       # RSS feed generator
├── worker.ts                # Cloudflare Worker entry point (static asset serving)
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

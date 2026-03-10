# Miami Springs Historical Society Website

Static website for the [Miami Springs Historical Society](https://miamispringshistoricalsociety.org), built with [Astro](https://astro.build) and hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## How it works

```
Edit files → git commit → git push to main → Cloudflare Pages builds → site is live (~1 min)
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
Edit `src/data/general.json` — tagline, hours, email, phone, Facebook URL. Changes propagate to all sections of the site automatically.

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

For a recurring event (e.g. second Tuesday monthly), use `recurring: 'second-tuesday'` instead of a fixed `date`.

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

## Project structure

```
miami-springs-historical/
├── public/                  # Static assets (images, favicon)
├── src/
│   ├── components/          # Page sections: Nav, Hero, About, Events, Board, Footer
│   ├── content/
│   │   ├── events/          # One .md file per event
│   │   └── board/           # One .md file per board member
│   ├── data/
│   │   └── general.json     # Site-wide settings
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML, global styles, fonts
│   └── pages/
│       └── index.astro      # Single-page site entry point
├── DEPLOYMENT.md            # Cloudflare Pages setup and deployment details
└── package.json
```

## Tech stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site framework |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hosting and CDN |
| GitHub | Source control, triggers deploys on push to `main` |
| Markdown | Content authoring for events and board members |
| TypeScript | Schema validation for content collections (Zod) |

## Deployment setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for one-time Cloudflare Pages setup, environment variables, and custom domain configuration.

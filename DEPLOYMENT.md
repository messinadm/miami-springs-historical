# Deployment Guide

This site is an [Astro](https://astro.build) static site deployed to **Cloudflare Workers**
via GitHub Actions. Every push to the `main` branch triggers an automatic build and deploy —
no manual steps required after initial setup.

---

## How it works

```
Push to main → GitHub Actions builds → wrangler deploys to Cloudflare → cache purged → site is live
```

The build runs `npm run build`, producing a `dist/` folder of static assets. The Cloudflare
Worker (`worker.ts`) serves those assets at the edge and handles automatic language detection
for the bilingual site. Custom 404 handling is configured in `wrangler.jsonc`.

### Language detection (Worker middleware)

On each request, `worker.ts` checks:
1. A `lang` cookie set by the user's explicit language choice in the nav
2. The `Accept-Language` request header

If Spanish is preferred and the visitor is on an English URL (no `/es/` prefix), they are
redirected to the Spanish equivalent. The cookie takes priority — once a user manually switches
language, the redirect does not override their choice.

---

## CI/CD workflows

### CI — `.github/workflows/ci.yml`
Runs on every pull request to `main`. Performs:
1. Astro type check (`npx astro check`)
2. Production build (`npm run build`)

Fails fast if the build is broken before anything reaches `main`.

### Deploy — `.github/workflows/deploy.yml`
Runs on every push to `main`. Performs:
1. Production build
2. `npx wrangler deploy` — pushes static assets + Worker to Cloudflare
3. Full cache purge via Cloudflare API

### Required GitHub secrets

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Authenticates wrangler and cache purge API calls |
| `CLOUDFLARE_ACCOUNT_ID` | Identifies the Cloudflare account for wrangler |
| `CLOUDFLARE_ZONE_ID` | Identifies the DNS zone for cache purge |

Set these in the repo under **Settings → Secrets and variables → Actions**.

---

## One-time Cloudflare setup

These steps only need to be done once.

### 1. Log in to Cloudflare

Go to https://dash.cloudflare.com and log in.

### 2. Create a new Workers application

1. In the left sidebar, click **Workers & Pages**
2. Click **Create** → **Workers** → **Connect to Git**
3. Authorize Cloudflare to access your GitHub account if prompted
4. Select the repository: `messinadm/miami-springs-historical`
5. Click **Begin setup**

> **Note:** Choose **Workers**, not Pages. The repo uses `wrangler.jsonc` to configure
> static asset serving via the Workers platform.

### 3. Configure the build

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Build output directory | `dist` |
| Root directory | *(leave blank)* |

### 4. Set Node version

Expand **Environment variables** and add:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `22` |

> The `.node-version` file in the repo also signals this, but setting it explicitly
> ensures compatibility across all Cloudflare build environments.

### 5. Deploy

Click **Save and Deploy**. The first build takes about a minute.

---

## Custom domain

The live site is at **https://miamispringshistoricalsociety.com**.

To configure a custom domain after the initial deploy:

1. In your Workers application, go to **Settings → Domains & Routes**
2. Click **Add** → **Custom domain**
3. Enter `miamispringshistoricalsociety.com`
4. If the domain is on Cloudflare, DNS is configured automatically

---

## Caching

The `public/_headers` file disables HTML caching at the Cloudflare edge:

```
/*
  Cache-Control: no-store
```

This ensures content changes (events, board members) appear immediately after deploy without
requiring a manual cache purge. The deploy workflow also does a full cache purge as a belt-and-suspenders measure.

---

## Making content changes

All content is stored as files in this repository:

| Content | Location |
|---|---|
| Site settings (email, phone, Facebook URL) | `src/data/general.json` |
| Museum hours | `src/i18n/en.json` → `footer.hours` |
| Events | `src/content/events/` — one `.md` file per event |
| Board members | `src/content/board/` — one `.md file` per member |
| Resources page links | `src/data/resources.ts` |
| Images | `public/` |

To update content:
1. Edit the relevant file
2. `git add` and `git commit`
3. `git push origin main`
4. Cloudflare automatically rebuilds and deploys (~1 minute)

---

## Local development

```bash
npm install          # first time only
npm run dev          # dev server at http://localhost:4321
npm run build        # production build to dist/
npx astro check      # TypeScript type check
```

---

## Project structure

```
miami-springs-historical/
├── public/                  # Static files served as-is
│   └── _headers             # Edge caching headers
├── src/
│   ├── components/          # Astro components (Nav, Hero, About, Events, FacebookFeed, Board, Footer)
│   ├── content/
│   │   ├── config.ts        # Zod schema for content collections
│   │   ├── board/           # Board member markdown files
│   │   └── events/          # Event markdown files
│   ├── data/
│   │   ├── general.json     # Site-wide settings
│   │   └── resources.ts     # Resources page link data
│   ├── i18n/
│   │   ├── en.json          # English strings
│   │   ├── es.json          # Spanish strings
│   │   └── utils.ts         # useTranslations() helper
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout with SEO and structured data
│   └── pages/
│       ├── index.astro      # Home page (English)
│       ├── museum.astro     # Museum page (English)
│       ├── resources.astro  # Resources & references page (English)
│       ├── 404.astro        # Custom 404 page (English)
│       ├── rss.xml.ts       # RSS feed
│       └── es/              # Spanish equivalents of all pages
├── worker.ts                # Cloudflare Worker entry point
├── wrangler.jsonc           # Cloudflare Workers config (assets, 404 handling)
├── astro.config.mjs         # Astro config (sitemap, i18n routing, output)
├── .github/workflows/       # CI and deploy workflows
├── .node-version            # Pins Node 22
└── package.json
```

---

## Tech stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site framework |
| [Cloudflare Workers](https://workers.cloudflare.com) | Hosting and CDN |
| [GitHub Actions](https://github.com/features/actions) | CI and automated deployment |
| Markdown | Content authoring (events, board members) |
| TypeScript + Zod | Schema validation for content collections |

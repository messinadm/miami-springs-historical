# Deployment Guide

This site is an [Astro](https://astro.build) static site deployed to **Cloudflare Pages**
via a direct GitHub integration. Every push to the `main` branch triggers an automatic
build and deploy — no manual steps required after initial setup.

---

## How it works

```
Edit files → git commit → git push to GitHub → Cloudflare Pages builds → site is live
```

Cloudflare Pages pulls the code from GitHub, runs `npm run build`, and publishes the
contents of the `dist/` folder as a static website.

---

## Repository

**GitHub:** https://github.com/messinadm/miami-springs-historical
**Branch deployed:** `main`

---

## One-time Cloudflare Pages setup

These steps only need to be done once. After that, deploys are fully automatic.

### 1. Log in to Cloudflare

Go to https://dash.cloudflare.com and log in.

### 2. Create a new Pages project

1. In the left sidebar, click **Workers & Pages**
2. Click **Create** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to access your GitHub account if prompted
4. Select the repository: `messinadm/miami-springs-historical`
5. Click **Begin setup**

### 3. Configure the build

On the build configuration screen, set:

| Setting | Value |
|---|---|
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leave blank)* |

### 4. Set Node version (required for Astro 5)

Still on the same screen, expand **Environment variables** and add:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `22` |

> The `.node-version` file in the repo also signals this, but setting it as an
> environment variable ensures compatibility with all Cloudflare build environments.

### 5. Deploy

Click **Save and Deploy**. Cloudflare will run the first build. It takes about a minute.

---

## Custom domain (optional)

After the initial deploy succeeds:

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g. `miamispringshistoricalsociety.org`)
4. Follow the DNS instructions — if your domain is also on Cloudflare, it will be
   configured automatically

---

## Making content changes

All content is stored as files in this repository:

| Content | Location |
|---|---|
| Site settings (tagline, hours, email, phone, Facebook URL) | `src/data/general.json` |
| Events | `src/content/events/` — one `.md` file per event |
| Board members | `src/content/board/` — one `.md` file per member |
| Images | `public/` |
| Page components | `src/components/` |

To update content:
1. Edit the relevant file
2. `git add` and `git commit`
3. `git push origin main`
4. Cloudflare Pages automatically rebuilds and deploys (takes ~1 minute)

### Event file format

```markdown
---
title: "Spring Meeting"
date: 2026-03-14
location: "Curtiss Mansion, 500 Deer Run Drive"
---

Description of the event goes here.
```

Filename convention: `YYYY-MM-DD-slug.md` (e.g. `2026-03-14-spring-meeting.md`)

### Board member file format

```markdown
---
name: "Jane Smith"
role: "President"
order: 1
---

Optional bio text.
```

The `order` field controls display order on the site. Lower numbers appear first.

---

## Local development

```bash
# Install dependencies (first time only)
npm install

# Start local dev server at http://localhost:4321
npm run dev

# Build the site locally to verify before pushing
npm run build
```

---

## Project structure

```
miami-springs-historical/
├── public/                  # Static files copied as-is
│   ├── admin/               # Decap CMS admin panel (not currently in use)
│   ├── curtiss-mansion-1927.jpg
│   └── curtiss-mansion-entrance.jpg
├── src/
│   ├── components/          # Astro components (Nav, Hero, About, Events, Board, Footer)
│   ├── content/
│   │   ├── board/           # Board member markdown files
│   │   └── events/          # Event markdown files
│   ├── data/
│   │   └── general.json     # Site-wide settings
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout
│   └── pages/
│       └── index.astro      # Main page
├── astro.config.mjs         # Astro configuration
├── package.json
└── .node-version            # Pins Node 20 for Cloudflare Pages builds
```

---

## Tech stack

| Tool | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site framework |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hosting and CDN |
| GitHub | Source code and version control |
| Markdown | Content authoring (events, board members) |

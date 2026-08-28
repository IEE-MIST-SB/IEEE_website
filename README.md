## IEEE MIST Student Branch Website

Official website for the IEEE MIST Student Branch, covering all chapters (WIE, CS, RAS, PES, and others). Built to make event updates fast and easy for chapter representatives, without needing any coding knowledge.

## Tech Stack

- **[Astro](https://astro.build/)** — static site framework that builds the site
- **[Decap CMS](https://decapcms.org/)** — simple form-based editor for adding/updating events
- **GitHub** — stores all content and code
- **Vercel / Netlify** — free hosting with automatic deploys on every push
- **Google Forms** — used for event registrations

No traditional backend or database is required. Content is stored as Markdown files in this repo, and the site rebuilds automatically whenever content changes.

## How It Works

1. Chapter reps log into the CMS at `/admin` on the live site
2. They fill out a simple form (title, date, chapter, description, image, location, registration link)
3. Publishing the form commits a new Markdown file to this repo
4. The hosting platform detects the change and automatically rebuilds/deploys the site

No Git commands, no code editing, no manual deployment — just fill and publish.

## Project Structure

```
/
├── src/
│   ├── content/
│   │   └── events/        # Event Markdown files (managed via Decap CMS)
│   ├── pages/              # Site pages (home, events, about, etc.)
│   ├── components/         # Reusable Astro/UI components
│   └── layouts/            # Page layouts
├── public/
│   └── admin/               # Decap CMS config (config.yml + index.html)
├── astro.config.mjs
└── package.json
```

## Event Frontmatter Schema

Each event is a Markdown file with the following frontmatter fields:

```yaml
title: "Event Title"
date: 2026-08-23
chapter: "WIE"   # WIE | CS | RAS | PES
description: "Short description of the event"
image: "/images/events/example.jpg"
location: "MIST Auditorium"
registrationLink: "https://forms.gle/xxxxxxx"
```

## Local Development (for devs)

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Adding Events (for chapter reps)

1. Go to `yoursite.com/admin`
2. Log in with your GitHub account
3. Click **New Event**
4. Fill in the details and select your chapter
5. Click **Publish**

That's it — the event will appear on the live site automatically after the build finishes (usually within a minute or two).

## Deployment

The site auto-deploys via Vercel/Netlify on every push to the `main` branch. The official IEEE MIST domain is pointed to the hosting provider via DNS (CNAME), so the site is served on our official domain while hosting remains free.

## Contributing

- **Devs:** Fork or branch, make changes, open a PR
- **Chapter reps:** Use the CMS at `/admin` — no need to touch this repo directly

## Questions

Reach out to the web team in the IEEE MIST Student Branch group for help with setup, access, or issues.

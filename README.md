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
│   │   └── events/         # Event Markdown files (managed via Decap CMS)
│   ├── content.config.ts   # Event frontmatter schema
│   ├── data/
│   │   ├── chapters.ts     # Chapter names, logos, colours, contacts
│   │   └── committee.ts    # Committee members, past panels, milestones, awards
│   ├── pages/              # Site pages (see the route table below)
│   ├── components/         # Reusable Astro components
│   ├── layouts/            # Page layouts
│   └── utils/              # Path + date helpers
├── public/
│   ├── admin/              # Decap CMS config (config.yml + index.html)
│   └── images/             # Static images
├── astro.config.mjs
└── package.json
```

## Pages & Where the Content Lives

| Route | File | Content comes from |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Section components + events collection |
| `/about` | `src/pages/about.astro` | Inline copy + `src/data/committee.ts` |
| `/chapters` | `src/pages/chapters/index.astro` | `src/data/chapters.ts` |
| `/chapters/<slug>` | `src/pages/chapters/[slug].astro` | `src/data/chapters.ts` + events collection |
| `/events` | `src/pages/events/index.astro` | Events collection |
| `/events/<slug>` | `src/pages/events/[...slug].astro` | Events collection |
| `/contact` | `src/pages/contact.astro` | Inline copy + `src/data/chapters.ts` |
| `/legacy` | `src/pages/legacy.astro` | `src/data/committee.ts` |
| 404 | `src/pages/404.astro` | Inline copy |

Text marked `Placeholder — …` is waiting for real copy. Committee names, chapter
details, milestones, and awards live in `src/data/` so they only need editing in
one place; events are Markdown files and should be added through `/admin`.

The contact form in `src/pages/contact.astro` has a placeholder `action` — point it
at a Google Form or Formspree endpoint before launch.

## Event Frontmatter Schema

Each event is a Markdown file with the following frontmatter fields:

```yaml
title: "Event Title"
date: 2026-08-23
chapter: "WIE"        # SB | EDS | APS | WIE | MTT-S | SPS
description: "Short description of the event"
image: "/images/events/example.jpg"   # optional
location: "MIST Auditorium"           # optional
time: "10:00 AM — 4:00 PM"            # optional
registrationLink: "https://forms.gle/xxxxxxx"  # optional
featured: false        # pins the event to the top of /events
tags: ["Workshop"]     # optional
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

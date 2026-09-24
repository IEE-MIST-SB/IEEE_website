## IEEE MIST Student Branch Website

Official website for the IEEE MIST Student Branch, covering all chapters (WIE, CS, RAS, PES, and others). Built to make event updates fast and easy for chapter representatives, without needing any coding knowledge.

## Tech Stack

- **[Astro](https://astro.build/)** — static site framework that builds the site
- **[Decap CMS](https://decapcms.org/)** — simple form-based editor for adding/updating events
- **GitHub** — stores all content and code
- **Vercel / Netlify** — free hosting with automatic deploys on every push
- **[Supabase](https://supabase.com/)** — stores contact messages, newsletter subscribers and event registrations, and can also supply events

The site itself is static. Event content lives as Markdown files in this repo (and optionally in Supabase), and the site rebuilds automatically whenever content changes. Form submissions go straight from the visitor's browser to Supabase — see [Supabase backend](#supabase-backend).

## How It Works

1. Chapter reps log into the CMS at `/admin` on the live site
2. They fill out a simple form (title, date, chapter, description, image, location, registration settings)
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
│   ├── lib/
│   │   ├── supabase.ts     # Tiny Supabase Data API client (insert / select)
│   │   ├── forms.ts        # Contact, newsletter and event-registration handlers
│   │   └── events.ts       # Merges Markdown events with Supabase events at build time
│   ├── pages/              # Site pages (see the route table below)
│   ├── components/         # Reusable Astro components
│   ├── layouts/            # Page layouts
│   └── utils/              # Path + date helpers
├── supabase/
│   └── schema.sql          # Tables + Row Level Security — run once in the Supabase SQL editor
├── public/
│   ├── admin/              # Decap CMS config (config.yml + index.html)
│   └── images/             # Static images
├── .env.example            # Optional Supabase overrides
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

The contact form in `src/pages/contact.astro` writes to Supabase (`contact_messages`).

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
registrationLink: "https://forms.gle/xxxxxxx"  # optional — offered as an alternative to the built-in sign-up
registrationOpen: true # set to false to hide the sign-up form
featured: false        # pins the event to the top of /events
tags: ["Workshop"]     # optional
```

## Supabase backend

Four things use Supabase. All of them run in the visitor's browser (or at build time) with the
project's **publishable** key, so what visitors can do is enforced by Row Level Security in the
database, not by hiding the key.

| Feature | Table | Visitor access |
| --- | --- | --- |
| Contact form (`/contact`) | `contact_messages` | insert only |
| Newsletter signup (home, chapters, event pages) | `newsletter_subscribers` | insert only; duplicates are reported as "already subscribed" |
| Event registration (upcoming event pages) | `event_registrations` | insert only; one registration per email per event |
| Events (optional) | `events` | read published rows only |

**One-time setup:** open the Supabase dashboard → **SQL Editor**, paste [`supabase/schema.sql`](supabase/schema.sql)
and run it. It is safe to re-run. Until it has been run, the forms will show a friendly error.

**Reading submissions:** use the dashboard's **Table Editor** (or the service-role key from a trusted
place — never commit it). Visitors cannot read any submission back.

**Events from Supabase:** insert a row into `events` with `published = true`. It is fetched at *build*
time, so it appears on the next deploy (trigger one from Vercel/Netlify or GitHub Actions). If Supabase is
unreachable the build carries on with the Markdown events only. If a Supabase slug matches a Markdown
file, the Markdown file wins. `body` is plain text — a blank line starts a new paragraph.

**Configuration:** the project URL and publishable key default to the IEEE MIST project in
`src/lib/supabase.ts`. To point at another project, copy `.env.example` to `.env` (or set the variables in
your host's dashboard). Never put a `service_role` key in a `PUBLIC_` variable.

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

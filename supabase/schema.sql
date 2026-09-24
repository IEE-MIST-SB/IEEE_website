-- IEEE MIST Student Branch — Supabase schema
--
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It is idempotent, so re-running it after edits is safe.
--
-- Security model: the website ships the *publishable* key to every browser, so the
-- database — not the key — is what protects the data. Every table has Row Level
-- Security enabled and the anonymous role gets the bare minimum:
--
--   contact_messages         INSERT only   (visitors can send, never read)
--   newsletter_subscribers   INSERT only
--   event_registrations      INSERT only
--   events                   SELECT only, and only rows where published = true
--
-- Read submissions from the Supabase dashboard (Table Editor) or with the service
-- role key from a trusted environment. Never put the service role key in this repo.

-- ---------------------------------------------------------------------------
-- Contact form
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
	id          uuid primary key default gen_random_uuid(),
	name        text not null check (char_length(btrim(name)) between 1 and 120),
	email       text not null check (char_length(email) <= 254 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
	subject     text check (char_length(subject) <= 120),
	message     text not null check (char_length(btrim(message)) between 1 and 5000),
	created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Newsletter
-- ---------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
	id          uuid primary key default gen_random_uuid(),
	email       text not null check (char_length(email) <= 254 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
	source      text check (char_length(source) <= 200),
	created_at  timestamptz not null default now()
);

-- One subscription per address, case-insensitively. The site treats the resulting
-- unique violation (23505) as "already subscribed".
create unique index if not exists newsletter_subscribers_email_key
	on public.newsletter_subscribers (lower(email));

-- ---------------------------------------------------------------------------
-- Events (optional second source next to the Markdown files in src/content/events)
-- ---------------------------------------------------------------------------
create table if not exists public.events (
	id                 uuid primary key default gen_random_uuid(),
	-- URL slug: the event page lives at /events/<slug>. Must not clash with a Markdown event.
	slug               text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	title              text not null,
	event_date         date not null,
	-- Chapter short code; 'SB' means a branch-wide event. Matches src/data/chapters.ts.
	chapter            text not null default 'SB' check (chapter in ('SB', 'EDS', 'APS', 'WIE', 'MTT-S', 'SPS')),
	description        text not null,
	body               text,                       -- full details; blank line = new paragraph
	image_url          text,                       -- "/images/..." path or absolute https URL
	location           text,
	event_time         text,                       -- free text, e.g. '10:00 AM — 4:00 PM'
	registration_link  text,                       -- optional external form, shown as an alternative
	registration_open  boolean not null default true,
	featured           boolean not null default false,
	tags               text[] not null default '{}',
	published          boolean not null default false,
	created_at         timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Event registrations
-- ---------------------------------------------------------------------------
-- event_slug is deliberately not a foreign key: registrations are accepted for
-- Markdown events too, which have no row in public.events.
create table if not exists public.event_registrations (
	id            uuid primary key default gen_random_uuid(),
	event_slug    text not null check (char_length(event_slug) between 1 and 200),
	name          text not null check (char_length(btrim(name)) between 1 and 120),
	email         text not null check (char_length(email) <= 254 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
	student_id    text check (char_length(student_id) <= 40),
	department    text check (char_length(department) <= 120),
	created_at    timestamptz not null default now()
);

create unique index if not exists event_registrations_event_email_key
	on public.event_registrations (event_slug, lower(email));

-- ---------------------------------------------------------------------------
-- Row Level Security + grants
-- ---------------------------------------------------------------------------
alter table public.contact_messages        enable row level security;
alter table public.newsletter_subscribers  enable row level security;
alter table public.events                  enable row level security;
alter table public.event_registrations     enable row level security;

-- Start from nothing so the result never depends on a project's default privileges.
revoke all on public.contact_messages, public.newsletter_subscribers,
              public.events, public.event_registrations from anon, authenticated;

grant insert on public.contact_messages       to anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
grant insert on public.event_registrations    to anon, authenticated;
grant select on public.events                 to anon, authenticated;

drop policy if exists "Anyone can send a contact message" on public.contact_messages;
create policy "Anyone can send a contact message"
	on public.contact_messages for insert to anon, authenticated
	with check (true);

drop policy if exists "Anyone can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to the newsletter"
	on public.newsletter_subscribers for insert to anon, authenticated
	with check (true);

drop policy if exists "Anyone can register for an event" on public.event_registrations;
create policy "Anyone can register for an event"
	on public.event_registrations for insert to anon, authenticated
	with check (true);

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public"
	on public.events for select to anon, authenticated
	using (published);

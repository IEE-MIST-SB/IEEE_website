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

-- Admins may also manage events (create/edit/delete/publish) from the dashboard.
drop policy if exists "Admins can manage events" on public.events;
create policy "Admins can manage events"
	on public.events for all to authenticated
	using (true) with check (true);
grant select, insert, update, delete on public.events to authenticated;

-- ---------------------------------------------------------------------------
-- Site content, editable from /dashboard without touching code.
--
-- Everyone (anon + authenticated) may SELECT — this is public marketing copy,
-- not sensitive data. Only `authenticated` (i.e. someone who signed in through
-- Supabase Auth, see below) may INSERT/UPDATE/DELETE.
-- ---------------------------------------------------------------------------

-- Chief Patron's Message and Counselor's Message (id is fixed: one row each).
create table if not exists public.leadership_messages (
	id            text primary key check (id in ('chief_patron', 'counselor')),
	eyebrow       text not null default '',
	heading       text not null default '',
	person_name   text not null default '',
	person_roles  text[] not null default '{}',
	message       text[] not null default '{}',   -- one array entry per paragraph
	image_url     text,
	updated_at    timestamptz not null default now()
);

create table if not exists public.executive_committee (
	id           uuid primary key default gen_random_uuid(),
	name         text not null check (char_length(btrim(name)) between 1 and 120),
	role         text not null check (char_length(btrim(role)) between 1 and 120),
	department   text,
	major        text,
	avatar_url   text,
	sort_order   integer not null default 0,
	updated_at   timestamptz not null default now()
);

create table if not exists public.associate_directors (
	id           uuid primary key default gen_random_uuid(),
	-- 'sb' for the branch-level group shown on the home page; a chapter slug otherwise.
	group_key    text not null default 'sb',
	group_label  text not null default 'IEEE MIST Student Branch',
	name         text not null check (char_length(btrim(name)) between 1 and 120),
	role         text not null check (char_length(btrim(role)) between 1 and 120),
	avatar_url   text,
	sort_order   integer not null default 0,
	updated_at   timestamptz not null default now()
);

-- Small key/value settings bag for the dashboard itself (e.g. the Vercel Deploy
-- Hook URL used by the "Publish" button). Admin-only, never exposed to anon.
create table if not exists public.site_settings (
	key          text primary key,
	value        text not null default '',
	updated_at   timestamptz not null default now()
);

alter table public.leadership_messages  enable row level security;
alter table public.executive_committee  enable row level security;
alter table public.associate_directors  enable row level security;
alter table public.site_settings        enable row level security;

revoke all on public.leadership_messages, public.executive_committee,
              public.associate_directors from anon, authenticated;
revoke all on public.site_settings from anon, authenticated;

grant select on public.leadership_messages, public.executive_committee,
                public.associate_directors to anon, authenticated;
grant insert, update, delete on public.leadership_messages, public.executive_committee,
                                  public.associate_directors to authenticated;
grant select, insert, update, delete on public.site_settings to authenticated;

drop policy if exists "Leadership messages are public" on public.leadership_messages;
create policy "Leadership messages are public"
	on public.leadership_messages for select to anon, authenticated using (true);
drop policy if exists "Admins can manage leadership messages" on public.leadership_messages;
create policy "Admins can manage leadership messages"
	on public.leadership_messages for all to authenticated using (true) with check (true);

drop policy if exists "Executive committee is public" on public.executive_committee;
create policy "Executive committee is public"
	on public.executive_committee for select to anon, authenticated using (true);
drop policy if exists "Admins can manage executive committee" on public.executive_committee;
create policy "Admins can manage executive committee"
	on public.executive_committee for all to authenticated using (true) with check (true);

drop policy if exists "Associate directors are public" on public.associate_directors;
create policy "Associate directors are public"
	on public.associate_directors for select to anon, authenticated using (true);
drop policy if exists "Admins can manage associate directors" on public.associate_directors;
create policy "Admins can manage associate directors"
	on public.associate_directors for all to authenticated using (true) with check (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
	on public.site_settings for all to authenticated using (true) with check (true);

-- Seed the two leadership rows so the dashboard has something to edit immediately.
-- (Uses the copy already on the site today — the ON CONFLICT clause means this is
-- a no-op if you've already edited these from the dashboard.)
insert into public.leadership_messages (id, eyebrow, heading, person_name, person_roles, message, image_url)
values
	(
		'chief_patron',
		'Leadership Message',
		'Chief Patron''s Message',
		'Brigadier General K.M Mustafizur Rahman, psc',
		array['Head, Department of EECE', 'Chief Patron, IEEE MIST Student Branch'],
		array[
			'IEEE is a global community that brings together students, professionals, researchers, and academics in the fields of engineering and technology. Being part of this community gives students the opportunity to learn, connect, and grow beyond the boundaries of their regular academic life.',
			'IEEE MIST Student Branch is an important platform for connecting our students with this wider engineering community. It provides opportunities to learn beyond the classroom, develop technical and leadership skills, and prepare for their future professional careers.',
			'Through workshops, seminars, competitions, projects, and other initiatives, IEEE MIST SB encourages students to explore new ideas, work together, and gain practical experience. These activities also help students connect with professionals, renowned researchers, professors, and students from around the world.',
			'The Student Branch also creates opportunities for students to interact with MIST alumni and learn from their academic and professional experiences. Such connections can inspire students and give them a clearer view of higher studies, research, and career opportunities.',
			'As the Chief Patron of IEEE MIST Student Branch, I am there to guide and support them, but their enthusiasm and initiative are what make the Student Branch successful. I am proud to be associated with IEEE MIST Student Branch, and I hope it continues to create opportunities for our students to learn, connect, lead, and contribute to the engineering community and beyond.',
			'I warmly welcome everyone to IEEE MIST Student Branch and wish the Branch continued success. May it continue to inspire our students to learn, innovate, connect, and contribute to the engineering community.'
		],
		'images/home/photo-chief-patron.jpg'
	),
	(
		'counselor',
		'Guidance & Vision',
		'Counselor''s Message',
		'Lt. Col Aminul Islam, PhD, EME',
		array['Counselor, IEEE MIST Student Branch'],
		array[
			'It has been a pleasure to see the IEEE MIST Student Branch grow into an active technical community, connecting our students with the wider IEEE community in Bangladesh and around the world.',
			'The Student Branch regularly brings valuable learning opportunities to MIST through technical seminars, workshops, conferences, and expert sessions. These programs allow students to interact with renowned researchers, professors from leading universities, industry professionals, and MIST alumni.',
			'One of the most encouraging aspects is the increasing participation of students. They are not only attending events but also taking the initiative to plan, organize, and conduct them, turning their ideas into real programs.',
			'Through this involvement, students gain experience that cannot always be learned in a classroom. They develop confidence, communication skills, teamwork, leadership, and the ability to take responsibility for a project from start to finish.',
			'The Student Branch is also creating stronger connections with MIST alumni. Their experiences in higher studies, research, and professional careers provide valuable guidance to our students and help keep the MIST community connected.',
			'I hope the IEEE MIST Student Branch will continue to develop as a platform for technical excellence, professional development, innovation, and responsible leadership. I am proud to be associated with this organization and look forward to witnessing its continued contribution to the students and the broader MIST community.'
		],
		'images/home/photo-branch-counselor.jpg'
	)
on conflict (id) do nothing;

-- Seed the Executive Committee and (branch-level) Associate Directors with the
-- roster already on the site, so the dashboard opens pre-populated instead of
-- empty. Guarded so re-running this file doesn't duplicate rows.
insert into public.executive_committee (name, role, department, major, avatar_url, sort_order)
select * from (values
	('Munawar Arif Nitol', 'Chair', 'EECE', 'Power', 'images/home/exec/munawar-nitol.jpg', 0),
	('Nasiruddin Mahmud Himel', 'Vice Chair', 'EECE', 'Electronics', null, 1),
	('Md. Mehedi Hasan Bhuiyan', 'General Secretary', 'EECE', 'Communication', 'images/home/exec/mehedi-hasan.jpg', 2),
	('Hafsa Khan', 'Treasurer', 'EECE', 'Electronics', 'images/home/exec/hafsa-khan.jpg', 3),
	('Mahdia Binte Maksud', 'Webmaster', 'EECE', 'Communication', 'images/home/exec/mahdia-maksud.jpg', 4),
	('Nushaira Monsur Raya', 'Visual Co-Ordinator', 'PME', null, null, 5)
) as seed(name, role, department, major, avatar_url, sort_order)
where not exists (select 1 from public.executive_committee);

insert into public.associate_directors (group_key, group_label, name, role, avatar_url, sort_order)
select * from (values
	('sb', 'IEEE MIST Student Branch', 'Tahiya Iffat Majumder', 'Operation and Logistics', 'images/home/associates/tahiya-majumder.jpg', 0),
	('sb', 'IEEE MIST Student Branch', 'Nusaiba Ahmed Naisha', 'Visual & Graphics', 'images/home/associates/nusaiba-naisha.jpg', 1),
	('sb', 'IEEE MIST Student Branch', 'Mohtasin Fuad Mahin', 'R&D', 'images/home/associates/mohtasin-mahin.jpg', 2),
	('sb', 'IEEE MIST Student Branch', 'Md. Abidur Rahman', 'Webmaster', 'images/home/associates/abidur-rahman.jpg', 3),
	('sb', 'IEEE MIST Student Branch', 'Yeasin Nobi Muhi', 'Membership Driven Program', 'images/home/associates/yeasin-muhi.jpg', 4),
	('sb', 'IEEE MIST Student Branch', 'Tasmima Yasmin Puspita', 'Public Relations & Branding', 'images/home/associates/tasmima-puspita.jpg', 5),
	('sb', 'IEEE MIST Student Branch', 'Fathin Hasnath Amil', 'Content Writer and Publication', 'images/home/associates/fathin-amil.jpg', 6)
) as seed(group_key, group_label, name, role, avatar_url, sort_order)
where not exists (select 1 from public.associate_directors);

-- ---------------------------------------------------------------------------
-- Storage: a public bucket for images uploaded from the dashboard (leadership
-- photos, committee/associate avatars). Public read (so the site can show the
-- images), authenticated-only write.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-content', 'site-content', true)
on conflict (id) do nothing;

drop policy if exists "Site content images are public" on storage.objects;
create policy "Site content images are public"
	on storage.objects for select to anon, authenticated
	using (bucket_id = 'site-content');

drop policy if exists "Admins can upload site content images" on storage.objects;
create policy "Admins can upload site content images"
	on storage.objects for insert to authenticated
	with check (bucket_id = 'site-content');

drop policy if exists "Admins can update site content images" on storage.objects;
create policy "Admins can update site content images"
	on storage.objects for update to authenticated
	using (bucket_id = 'site-content');

drop policy if exists "Admins can delete site content images" on storage.objects;
create policy "Admins can delete site content images"
	on storage.objects for delete to authenticated
	using (bucket_id = 'site-content');

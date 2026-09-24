/**
 * One list of events for the whole site.
 *
 * Events come from two places:
 *   1. Markdown files in `src/content/events` (managed through the Decap CMS at /admin).
 *   2. Rows in the Supabase `events` table where `published = true`.
 *
 * Supabase events are fetched at build time, so a new row appears on the site with the
 * next deploy (same as a new Markdown file). If Supabase cannot be reached the build
 * carries on with the Markdown events only. On a slug clash the Markdown file wins.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { selectRows } from './supabase';

export type EventData = CollectionEntry<'events'>['data'];

export interface SiteEvent {
	/** URL slug — the event page is `/events/<id>`. */
	id: string;
	data: EventData;
	source: 'markdown' | 'supabase';
	/** Present for Markdown events; the page renders it with `render(entry)`. */
	entry?: CollectionEntry<'events'>;
	/** Present for Supabase events: plain-text details, blank line = new paragraph. */
	body?: string;
}

interface EventRow {
	slug: string;
	title: string;
	event_date: string;
	chapter: string;
	description: string;
	body: string | null;
	image_url: string | null;
	location: string | null;
	event_time: string | null;
	registration_link: string | null;
	registration_open: boolean | null;
	featured: boolean | null;
	tags: string[] | null;
}

const CHAPTERS = ['SB', 'EDS', 'APS', 'WIE', 'MTT-S', 'SPS'] as const;

function fromRow(row: EventRow): SiteEvent | null {
	const date = new Date(row.event_date);
	const chapter = CHAPTERS.find((code) => code === row.chapter);
	if (!row.slug || !row.title || !row.description || !chapter || Number.isNaN(date.getTime())) {
		return null;
	}
	return {
		id: row.slug,
		source: 'supabase',
		body: row.body ?? undefined,
		data: {
			title: row.title,
			date,
			chapter,
			description: row.description,
			image: row.image_url ?? undefined,
			location: row.location ?? undefined,
			time: row.event_time ?? undefined,
			registrationLink: row.registration_link ?? undefined,
			registrationOpen: row.registration_open ?? true,
			featured: row.featured ?? false,
			tags: row.tags ?? [],
		},
	};
}

async function fetchSupabaseEvents(): Promise<SiteEvent[]> {
	try {
		const rows = await selectRows<EventRow>(
			'events',
			{ select: '*', published: 'eq.true', order: 'event_date.desc' },
			8_000,
		);
		return rows.flatMap((row) => {
			const event = fromRow(row);
			if (!event) console.warn(`[events] Skipping invalid Supabase event "${row?.slug}".`);
			return event ? [event] : [];
		});
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`[events] Supabase events unavailable, using Markdown events only. (${reason})`);
		return [];
	}
}

let cached: Promise<SiteEvent[]> | undefined;

async function load(): Promise<SiteEvent[]> {
	const [markdown, remote] = await Promise.all([getCollection('events'), fetchSupabaseEvents()]);

	const events: SiteEvent[] = markdown.map((entry) => ({
		id: entry.id,
		data: entry.data,
		source: 'markdown',
		entry,
	}));

	const taken = new Set(events.map((event) => event.id));
	for (const event of remote) {
		if (taken.has(event.id)) {
			console.warn(`[events] Supabase event "${event.id}" clashes with a Markdown event; keeping the Markdown one.`);
			continue;
		}
		taken.add(event.id);
		events.push(event);
	}
	return events;
}

/** All events, unsorted. Fetched once per build. */
export function getAllEvents(): Promise<SiteEvent[]> {
	cached ??= load();
	return cached;
}

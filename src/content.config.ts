import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Events are plain Markdown files in `src/content/events/`, authored either by hand
 * or through the Decap CMS form at `/admin`. The schema below must stay in sync with
 * `public/admin/config.yml`.
 */
const events = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		/** Chapter short code — must match a `shortName` in src/data/chapters.ts, or "SB" for branch-wide events. */
		chapter: z.enum(['SB', 'EDS', 'APS', 'WIE', 'MTT-S', 'SPS']),
		description: z.string(),
		image: z.string().optional(),
		location: z.string().optional(),
		time: z.string().optional(),
		registrationLink: z.string().optional(),
		/** Pins the event to the top of the Events page and the home page slider. */
		featured: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { events };

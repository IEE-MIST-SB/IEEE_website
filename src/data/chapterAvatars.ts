import { withBase } from '../utils/paths';

/**
 * Real committee photos, layered onto committee.ts's name/role data at render time.
 * Kept separate from committee.ts (owned by another session) so photo sourcing stays
 * independent of the name/role data itself. Keyed by chapter slug -> member name.
 */
export const chapterExecAvatars: Record<string, Record<string, string>> = {
	wie: {
		'Sarah Zahin': withBase('images/chapters/wie/exec/sarah-zahin.jpg'),
		'Meherun Nahar Maya': withBase('images/chapters/wie/exec/meherun-nahar.jpg'),
		'Nafisa Akther': withBase('images/chapters/wie/exec/nafisa-akther.jpg'),
		'Sadia Chowdhury Mohona': withBase('images/chapters/wie/exec/sadia-mohona.jpg'),
		'Nazifa Tasnim': withBase('images/chapters/wie/exec/nazifa-tasnim.jpg'),
		'Sumaiya Ferdous': withBase('images/chapters/wie/exec/sumaiya-ferdous.jpg'),
	},
};

export const chapterAssociateAvatars: Record<string, Record<string, string>> = {
	wie: {
		'Nashita Ahmed Chowdhury': withBase('images/chapters/wie/associates/nashita-ahmed.jpg'),
		'Tasfia Rahman Priyota': withBase('images/chapters/wie/associates/tasfia-priyota.jpg'),
		'Farzana Haque Snigdha': withBase('images/chapters/wie/associates/farzana-snigdha.jpg'),
		'Raisa Tashfia': withBase('images/chapters/wie/associates/raisa-tashfia.jpg'),
		'Syeda Iffat Jahan Tarin': withBase('images/chapters/wie/associates/syeda-iffat.jpg'),
		'Sharita Nasia': withBase('images/chapters/wie/associates/sharita-nasia.jpg'),
		'Tasmia Masnur': withBase('images/chapters/wie/associates/tasmia-masnur.jpg'),
	},
};

/** Chapter-specific secondary accent, for chapters with a two-tone brand (e.g. WIE's purple/pink). */
export const chapterAccent2: Record<string, string> = {
	wie: '#E31B79',
	'mtt-s': '#B87333', // copper, used for the mission checkmarks/badges in the MTT-S design
};

/**
 * Which chapters have a hero background pattern asset in public/images/chapters/<slug>/,
 * and its extension. Explicit rather than filesystem-probed at build time: an
 * import.meta.url-relative existsSync() check works in `astro dev` but silently resolves
 * to nothing under `astro build`'s SSG pipeline, so patterns disappeared in production
 * without any error. Update this map when adding/removing a chapter's bg-pattern file.
 */
export const chapterHeroPattern: Record<string, string> = {
	eds: 'png',
	wie: 'svg',
};

/** Chapters with a full-bleed hero background photo instead of (or under) a tiled pattern. */
export const chapterHeroPhoto: Record<string, string> = {
	sps: 'images/chapters/sps/hero-bg.png',
	'mtt-s': 'images/chapters/mtt-s/hero-bg.png',
};

/** Same idea for the Join CTA section's decorative pattern (cta-pattern.png). */
export const chapterCtaPattern: Record<string, boolean> = {
	wie: true,
	eds: true,
	aps: true,
	sps: true,
	'mtt-s': true,
};

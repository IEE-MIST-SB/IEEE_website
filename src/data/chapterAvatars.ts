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
	aps: {
		'Md. Mehedi Hasan Bhuiyan': withBase('images/chapters/aps/exec/mehedi-hasan.jpg'),
		'Md. Forhaduzzaman Reyad': withBase('images/chapters/aps/exec/forhaduzzaman-reyad.jpg'),
		'Sadia Noushin Promi': withBase('images/chapters/aps/exec/sadia-noushin-promi.jpg'),
		'Abdullah Al Mahi': withBase('images/chapters/aps/exec/abdullah-al-mahi.jpg'),
		'Nazifa Tasnim': withBase('images/chapters/aps/exec/nazifa-tasnim.jpg'),
	},
	eds: {
		'Hafsa Khan': withBase('images/chapters/eds/exec/hafsa-khan.jpg'),
		'Abdullah Al Mahi': withBase('images/chapters/eds/exec/abdullah-al-mahi.jpg'),
		'Sarah Zahin': withBase('images/chapters/eds/exec/sarah-zahin.jpg'),
		'Fahmid Amin Zawad': withBase('images/chapters/eds/exec/fahmid-zawad.jpg'),
	},
	sps: {
		'Mahdia Binte Maksud': withBase('images/chapters/sps/exec/mahdia-maksud.jpg'),
		'Md. Mehedi Hasan Bhuiyan': withBase('images/chapters/sps/exec/mehedi-hasan.jpg'),
		'Parsa Nusaiba': withBase('images/chapters/sps/exec/parsa-nusaiba.jpg'),
		'Munawar Arif Nitol': withBase('images/home/exec/munawar-nitol.jpg'),
		'Marjuka Sabira': withBase('images/chapters/sps/exec/marjuka-sabira.jpg'),
		'Mashrur Rashid': withBase('images/chapters/sps/exec/mashrur-rashid.jpg'),
	},
	'mtt-s': {
		'Sadia Chowdhury Mohona': withBase('images/chapters/wie/exec/sadia-mohona.jpg'),
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
	aps: {
		'Mushfiqur Rahman Tandid': withBase('images/chapters/aps/associates/mushfiqur-tandid.jpg'),
		'Md Adib Hossain': withBase('images/chapters/aps/associates/adib-hossain.jpg'),
		'Istiak Ahmed Anik': withBase('images/chapters/aps/associates/istiak-anik.jpg'),
		'Farhan Jobaer Shawpnil': withBase('images/chapters/aps/associates/farhan-shawpnil.jpg'),
		'S.M. Samiul Kabir Saad': withBase('images/chapters/aps/associates/samiul-kabir.jpg'),
		'Abir Paul': withBase('images/chapters/aps/associates/abir-paul.jpg'),
	},
	eds: {
		'Sharod Maitra': withBase('images/chapters/eds/associates/sharod-maitra.jpg'),
		'Nisat Habiba': withBase('images/chapters/eds/associates/nisat-habiba.jpg'),
		'Rodoshe Talukder Samata': withBase('images/chapters/eds/associates/rodoshe-samata.jpg'),
		'Md. Shahed Haque': withBase('images/chapters/eds/associates/shahed-haque.jpg'),
		'Md. Nahin Khan Oitizzo': withBase('images/chapters/eds/associates/nahin-oitizzo.jpg'),
		'Tawfiqur Rahman Abir': withBase('images/chapters/eds/associates/tawfiqur-abir.jpg'),
		'Mehrin Islam Prity': withBase('images/chapters/eds/associates/mehrin-prity.jpg'),
	},
	sps: {
		'Abdullah Al Nayeem': withBase('images/chapters/sps/associates/abdullah-nayeem.jpg'),
		'Fateen Nur Fuad': withBase('images/chapters/sps/associates/fateen-fuad.jpg'),
		'Mashrur Sadain Chowdhury': withBase('images/chapters/sps/associates/mashrur-chowdhury.jpg'),
		'Md. Razibul Islam Limon': withBase('images/chapters/sps/associates/razibul-limon.jpg'),
		'Md Fahim Marsad Shuvo': withBase('images/chapters/sps/associates/fahim-shuvo.jpg'),
		'Nahyan Tasnim': withBase('images/chapters/sps/associates/nahyan-tasnim.jpg'),
		'Rabsha Alam': withBase('images/chapters/sps/associates/rabsha-alam.jpg'),
	},
	'mtt-s': {
		'Tahasin Bin Zaman': withBase('images/chapters/mtt-s/associates/tahasin-zaman.jpg'),
		'Shadman Zakir Rhibhu': withBase('images/chapters/mtt-s/associates/shadman-rhibhu.jpg'),
		'Salman Sadique': withBase('images/chapters/mtt-s/associates/salman-sadique.jpg'),
		'Md Yasin Arafat Labib': withBase('images/chapters/mtt-s/associates/yasin-labib.jpg'),
		'Mahasin Samiha': withBase('images/chapters/mtt-s/associates/mahasin-samiha.jpg'),
		'Rezwan Dip': withBase('images/chapters/mtt-s/associates/rezwan-dip.jpg'),
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

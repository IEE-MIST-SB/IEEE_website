import { withBase } from '../utils/paths';

export interface Member {
	name: string;
	role: string;
	avatar?: string;
	/** Academic department, e.g. EECE, NSE, PME, BME. */
	department?: string;
	/** Major within the department, where one is recorded. */
	major?: string;
}

/** Faculty and senior leadership shown on the About page. */
export const leadership: Member[] = [
	{
		name: 'Brigadier General K.M Mustafizur Rahman, psc',
		role: 'Chief Patron',
		avatar: withBase('images/home/photo-chief-patron.jpg'),
		department: 'Head, Department of EECE, MIST',
	},
	{
		name: 'Lt. Col Aminul Islam, PhD, EME',
		role: 'Counselor',
		avatar: withBase('images/home/photo-branch-counselor.jpg'),
		department: 'Department of EME, MIST',
	},
];

/**
 * IEEE MIST Student Branch Executive Committee 2026.
 * Source: "IEEE MIST Student Branch 2026" panel document.
 */
export const executiveCommittee: Member[] = [
	{
		name: 'Munawar Arif Nitol',
		role: 'Chair',
		department: 'EECE',
		major: 'Power',
		avatar: withBase('images/home/exec/munawar-nitol.jpg'),
	},
	{
		name: 'Nasiruddin Mahmud Himel',
		role: 'Vice Chair',
		department: 'EECE',
		major: 'Electronics',
	},
	{
		name: 'Md. Mehedi Hasan Bhuiyan',
		role: 'General Secretary',
		department: 'EECE',
		major: 'Communication',
		avatar: withBase('images/home/exec/mehedi-hasan.jpg'),
	},
	{
		name: 'Hafsa Khan',
		role: 'Treasurer',
		department: 'EECE',
		major: 'Electronics',
		avatar: withBase('images/home/exec/hafsa-khan.jpg'),
	},
	{
		name: 'Mahdia Binte Maksud',
		role: 'Webmaster',
		department: 'EECE',
		major: 'Communication',
		avatar: withBase('images/home/exec/mahdia-maksud.jpg'),
	},
	{
		name: 'Nushaira Monsur Raya',
		role: 'Visual Co-Ordinator',
		department: 'PME',
	},
];

/**
 * Chapter executive panels for 2026, keyed by chapter slug.
 * Source: "IEEE MIST Student Branch 2026" panel document.
 */
export const chapterPanels: Record<string, Member[]> = {
	wie: [
		{ name: 'Sarah Zahin', role: 'Chair', department: 'EECE', major: 'Electronics' },
		{ name: 'Meherun Nahar Maya', role: 'Vice Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Nafisa Akther', role: 'General Secretary', department: 'EECE', major: 'Power' },
		{ name: 'Sadia Chowdhury Mohona', role: 'Treasurer', department: 'EECE', major: 'Communication' },
		{ name: 'Nazifa Tasnim', role: 'Webmaster', department: 'NSE' },
		{ name: 'Sumaiya Ferdous', role: 'Visual Co-Ordinator', department: 'EECE', major: 'Communication' },
	],
	aps: [
		{ name: 'Md. Mehedi Hasan Bhuiyan', role: 'Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Md. Forhaduzzaman Reyad', role: 'Vice Chair', department: 'EECE', major: 'Power' },
		{ name: 'Sadia Noushin Promi', role: 'General Secretary', department: 'NSE' },
		{ name: 'Abdullah Al Mahi', role: 'Treasurer', department: 'EECE', major: 'Electronics' },
		{ name: 'Nazifa Tasnim', role: 'Webmaster', department: 'PME' },
		{ name: 'Nushrat Jahan Mun', role: 'Visual Co-Ordinator', department: 'EECE', major: 'Communication' },
	],
	eds: [
		{ name: 'Hafsa Khan', role: 'Chair', department: 'EECE', major: 'Electronics' },
		{ name: 'Abdullah Al Mahi', role: 'Vice Chair', department: 'EECE', major: 'Electronics' },
		{ name: 'Nasiruddin Mahmud Himel', role: 'General Secretary', department: 'EECE', major: 'Electronics' },
		{ name: 'Fahmid Amin Zawad', role: 'Treasurer', department: 'EECE', major: 'Electronics' },
		{ name: 'Sarah Zahin', role: 'Webmaster', department: 'EECE', major: 'Electronics' },
		{ name: 'Md. Mahfuzur Rahman Kabbo', role: 'Visual Co-Ordinator', department: 'EECE', major: 'Electronics' },
	],
	sps: [
		{ name: 'Mahdia Binte Maksud', role: 'Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Md. Mehedi Hasan Bhuiyan', role: 'Vice Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Parsa Nusaiba', role: 'General Secretary', department: 'BME' },
		{ name: 'Munawar Arif Nitol', role: 'Treasurer', department: 'EECE', major: 'Power' },
		{ name: 'Marjuka Sabira', role: 'Webmaster', department: 'EECE', major: 'Communication' },
		{ name: 'Mashrur Rashid', role: 'Visual Co-Ordinator', department: 'PME' },
	],
	'mtt-s': [
		{ name: 'Md. Nazmul Islam Zisan', role: 'Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Naimul Hoque', role: 'Vice Chair', department: 'EECE', major: 'Communication' },
		{ name: 'Sabbir Ahmed Khan', role: 'General Secretary', department: 'EECE', major: 'Communication' },
		{ name: 'Nusrat Jahan Mun', role: 'Treasurer', department: 'EECE', major: 'Communication' },
		{ name: 'Sadia Chowdhury Mohona', role: 'Webmaster', department: 'EECE', major: 'Communication' },
		{ name: 'Israt Jahan Isha', role: 'Visual Co-Ordinator', department: 'EECE', major: 'Communication' },
	],
};

export interface AssociateGroup {
	/** Chapter slug, or `sb` for the branch-level directors. */
	key: string;
	label: string;
	/** Link target — omitted for the branch-level group. */
	slug?: string;
	members: Member[];
}

/**
 * Associate Directors 2026.
 * Source: "IEEE_AssociateDirectors_2026" directory.
 * Contact details from that document are deliberately not published here.
 */
export const associateDirectors: AssociateGroup[] = [
	{
		key: 'sb',
		label: 'IEEE MIST Student Branch',
		members: [
			{
				name: 'Tahiya Iffat Majumder',
				role: 'Operation and Logistics',
				avatar: withBase('images/home/associates/tahiya-majumder.jpg'),
			},
			{
				name: 'Nusaiba Ahmed Naisha',
				role: 'Visual & Graphics',
				avatar: withBase('images/home/associates/nusaiba-naisha.jpg'),
			},
			{
				name: 'Mohtasin Fuad Mahin',
				role: 'R&D',
				avatar: withBase('images/home/associates/mohtasin-mahin.jpg'),
			},
			{
				name: 'Md. Abidur Rahman',
				role: 'Webmaster',
				avatar: withBase('images/home/associates/abidur-rahman.jpg'),
			},
			{
				name: 'Yeasin Nobi Muhi',
				role: 'Membership Driven Program',
				avatar: withBase('images/home/associates/yeasin-muhi.jpg'),
			},
			{
				name: 'Tasmima Yasmin Puspita',
				role: 'Public Relations & Branding',
				avatar: withBase('images/home/associates/tasmima-puspita.jpg'),
			},
			{
				name: 'Fathin Hasnath Amil',
				role: 'Content Writer and Publication',
				avatar: withBase('images/home/associates/fathin-amil.jpg'),
			},
		],
	},
	{
		key: 'wie',
		label: 'Women in Engineering',
		slug: 'wie',
		members: [
			{ name: 'Nashita Ahmed Chowdhury', role: 'Operation and Logistics' },
			{ name: 'Tasfia Rahman Priyota', role: 'Visual & Graphics' },
			{ name: 'Farzana Haque Snigdha', role: 'R&D' },
			{ name: 'Raisa Tashfia', role: 'Webmaster' },
			{ name: 'Syeda Iffat Jahan Tarin', role: 'Membership Driven Program' },
			{ name: 'Sharita Nasia', role: 'Public Relations & Branding' },
			{ name: 'Tasmia Masnur', role: 'Content Writer and Publication' },
		],
	},
	{
		key: 'aps',
		label: 'Antennas and Propagation Society',
		slug: 'aps',
		members: [
			{ name: 'Mushfiqur Rahman Tandid', role: 'Operation and Logistics' },
			{ name: 'Md Adib Hossain', role: 'Visual & Graphics' },
			{ name: 'Istiak Ahmed Anik', role: 'R&D' },
			{ name: 'Syed Fairuz Mahdi', role: 'Webmaster' },
			{ name: 'Farhan Jobaer Shawpnil', role: 'Membership Driven Program' },
			{ name: 'S.M. Samiul Kabir Saad', role: 'Public Relations & Branding' },
			{ name: 'Abir Paul', role: 'Content Writer and Publication' },
		],
	},
	{
		key: 'eds',
		label: 'Electron Devices Society',
		slug: 'eds',
		members: [
			{ name: 'Sharod Maitra', role: 'Operation and Logistics' },
			{ name: 'Nisat Habiba', role: 'Visual & Graphics' },
			{ name: 'Rodoshe Talukder Samata', role: 'R&D' },
			{ name: 'Md. Shahed Haque', role: 'Webmaster' },
			{ name: 'Md. Nahin Khan Oitizzo', role: 'Membership Driven Program' },
			{ name: 'Tawfiqur Rahman Abir', role: 'Public Relations & Branding' },
			{ name: 'Mehrin Islam Prity', role: 'Content Writer and Publication' },
		],
	},
	{
		key: 'sps',
		label: 'Signal Processing Society',
		slug: 'sps',
		members: [
			{ name: 'Nahyan Tasnim', role: 'Operation and Logistics' },
			{ name: 'Abdullah Al Nayeem', role: 'Visual & Graphics' },
			{ name: 'Fateen Nur Fuad', role: 'R&D' },
			{ name: 'Mashrur Sadain Chowdhury', role: 'Webmaster' },
			{ name: 'Md. Razibul Islam Limon', role: 'Membership Driven Program' },
			{ name: 'Md Fahim Marsad Shuvo', role: 'Public Relations & Branding' },
			{ name: 'Rabsha Alam', role: 'Content Writer and Publication' },
		],
	},
	{
		key: 'mtt-s',
		label: 'Microwave Theory and Technology Society',
		slug: 'mtt-s',
		members: [
			{ name: 'Tahasin Bin Zaman', role: 'Operation and Logistics' },
			{ name: 'Shadman Zakir Rhibhu', role: 'Visual & Graphics' },
			{ name: 'Salman Sadique', role: 'R&D' },
			{ name: 'Md. Rashedul Alam Rafi', role: 'Webmaster' },
			{ name: 'Md Yasin Arafat Labib', role: 'Membership Driven Program' },
			{ name: 'Mahasin Samiha', role: 'Public Relations & Branding' },
			{ name: 'Rezwan Dip', role: 'Content Writer and Publication' },
		],
	},
];

/** Branch-level associate directors — shown on the home page. */
export const associateCommittee: Member[] =
	associateDirectors.find((group) => group.key === 'sb')?.members ?? [];

/** Associate directors for one chapter, by slug. */
export function associatesForChapter(slug: string): Member[] {
	return associateDirectors.find((group) => group.slug === slug)?.members ?? [];
}

export interface LegacyPanel {
	/** Term label shown on the year tab, e.g. "2026". */
	year: string;
	/** True for the panel currently in office. */
	current?: boolean;
	members: Member[];
}

/**
 * Past and present executive panels, shown as year tabs on the Legacy page
 * (Figma frame 31:688). 2026 is the real panel; earlier terms are placeholders
 * until the branch supplies them.
 */
export const legacyPanels: LegacyPanel[] = [
	{ year: '2026', current: true, members: executiveCommittee },
	{
		year: '2025',
		members: [
			{ name: 'Name to be added', role: 'Chair' },
			{ name: 'Name to be added', role: 'Vice Chair' },
			{ name: 'Name to be added', role: 'General Secretary' },
			{ name: 'Name to be added', role: 'Treasurer' },
			{ name: 'Name to be added', role: 'Webmaster' },
			{ name: 'Name to be added', role: 'Visual Co-Ordinator' },
		],
	},
	{
		year: '2024',
		members: [
			{ name: 'Name to be added', role: 'Chair' },
			{ name: 'Name to be added', role: 'Vice Chair' },
			{ name: 'Name to be added', role: 'General Secretary' },
			{ name: 'Name to be added', role: 'Treasurer' },
			{ name: 'Name to be added', role: 'Webmaster' },
			{ name: 'Name to be added', role: 'Visual Co-Ordinator' },
		],
	},
];

export interface Milestone {
	year: string;
	title: string;
	description: string;
}

/** Branch history timeline shown on the Legacy page. Placeholder rows. */
export const milestones: Milestone[] = [
	{
		year: '2019',
		title: 'Student Branch Founded',
		description: 'Placeholder — how and when the IEEE MIST Student Branch was established.',
	},
	{
		year: '2021',
		title: 'First Affinity Group',
		description: 'Placeholder — the formation of the WIE Affinity Group at MIST.',
	},
	{
		year: '2023',
		title: 'Technical Chapters Chartered',
		description: 'Placeholder — the chartering of the EDS, APS, MTT-S and SPS chapters.',
	},
	{
		year: '2024',
		title: 'Regional Recognition',
		description: 'Placeholder — awards or recognition received by the branch.',
	},
];

export interface Award {
	title: string;
	year: string;
	issuer: string;
	description: string;
}

export const awards: Award[] = [
	{
		title: 'Award Title Placeholder',
		year: '2024',
		issuer: 'IEEE Bangladesh Section',
		description: 'Placeholder — a one-line description of what the award recognised.',
	},
	{
		title: 'Award Title Placeholder',
		year: '2023',
		issuer: 'IEEE Region 10',
		description: 'Placeholder — a one-line description of what the award recognised.',
	},
	{
		title: 'Award Title Placeholder',
		year: '2022',
		issuer: 'IEEE Bangladesh Section',
		description: 'Placeholder — a one-line description of what the award recognised.',
	},
];

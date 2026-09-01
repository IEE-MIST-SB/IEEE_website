/**
 * Chapter page copy sourced from the Figma file (fileKey lkv4breNj08AtswP0xxUyf) and,
 * for EDS/APS/SPS/MTT-S/WIE, from full HTML/Tailwind exports of each chapter's real
 * design that the user supplied directly.
 *
 * The Figma chapter frames have significant copy-paste contamination — several
 * "About"/"Our Story" sections literally contain another chapter's text (e.g. EDS's
 * About paragraph was MTT-S's, SPS's was APS's, and APS/WIE/MTT-S's "Our Story" all
 * carried SPS's story verbatim). Per instruction, obvious wrong-chapter content was
 * NOT copied as-is; a chapter's own genuine copy was used instead of inventing new text.
 *
 * Where a chapter has no distinct "Our Story" narrative anywhere in its source (APS,
 * MTT-S, WIE all lack one — only EDS and SPS have real founding-history text), its
 * `story` reuses its own genuine `about` copy rather than fabricating founding dates or
 * events with no source.
 */

export interface MissionItem {
	icon: string;
	title: string;
	description: string;
}

export interface Stat {
	value: string;
	label: string;
}

/** A hero headline with one highlighted word/phrase, e.g. "Empowering Women in **Engineering** & Science". */
export interface HeroHeadline {
	before: string;
	highlight: string;
	after: string;
}

export interface ChapterCopy {
	/** Plain hero heading override (no highlight). Takes priority over heroHeadline and fullName. */
	heroTitle?: string;
	/** Custom hero headline with a highlighted word. Falls back to the chapter's fullName when omitted. */
	heroHeadline?: HeroHeadline;
	/** Small pill shown above the hero heading, e.g. "IEEE APS MIST Chapter". */
	heroBadge?: string;
	heroSubtitle: string;
	about: string[];
	mission: string[];
	missionItems?: MissionItem[];
	/** Heading above the mission column when it needs to differ from the default "Our Mission"
	 *  (e.g. when missionItems already includes its own "Our Mission" / "Our Vision" entries). */
	missionHeading?: string;
	vision?: string;
	story: string[];
	/** "450+ / Active Members" style tiles. Figma repeats identical numbers across every
	 *  chapter — these are the design's placeholder figures, not verified per-chapter data. */
	stats?: Stat[];
}

export const chapterCopy: Record<string, ChapterCopy> = {
	eds: {
		heroTitle: 'IEEE Electron Devices Society (EDS)',
		heroSubtitle:
			'The IEEE Electron Devices Society student branch chapter at MIST is dedicated to the field of electron devices, covering the modeling, design, and fabrication of microelectronic and nanophotonic structures.',
		about: [
			'The IEEE Electron Devices Society student branch chapter at MIST is dedicated to the field of electron devices, covering the modeling, design, and fabrication of microelectronic and nanophotonic structures.',
		],
		mission: [],
		missionItems: [
			{
				icon: 'rocket',
				title: 'Excellence in Microelectronics',
				description:
					'To foster a vibrant community of future engineers specializing in electron device technology through hands-on learning, industrial exposure, and academic mentorship.',
			},
		],
		story: [
			'Founded in 2018, the EDS Chapter at MIST was born from a desire to bridge the gap between theoretical semiconductor physics and practical VLSI design. Our early days were spent in humble laboratories, experimenting with breadboards and microcontrollers.',
			"Today, we serve as a hub for innovation in solid-state circuits and device modeling. We've hosted over 20 technical workshops and established a research culture that has led to several student publications in international journals.",
		],
	},
	sps: {
		heroTitle: 'Signal Processing Society',
		heroBadge: 'MIST Student Branch',
		heroSubtitle:
			'The science of analyzing, modifying, and synthesizing signals such as sound, images, and scientific measurements.',
		about: [
			'The science of analyzing, modifying, and synthesizing signals such as sound, images, and scientific measurements.',
		],
		mission: [],
		missionHeading: 'Mission & Vision',
		missionItems: [
			{
				icon: 'rocket',
				title: 'Our Mission',
				description:
					'To promote technical innovation in signal processing through workshops, research projects, and global collaboration within the MIST community.',
			},
			{
				icon: 'eye',
				title: 'Our Vision',
				description:
					'To be a global leader in signal processing education and research, empowering students to solve real-world challenges through data and signal analysis.',
			},
		],
		story: [
			'Founded with a vision to foster a vibrant community of signal processing enthusiasts, the SPS Chapter at MIST has grown into a hub for technical innovation and academic excellence.',
			'Since its inception, our chapter has been dedicated to empowering students through hands-on workshops, research-driven projects, and global collaboration, bridging the gap between theoretical knowledge and real-world applications in signal and image processing.',
		],
	},
	aps: {
		heroTitle: 'Antennas and Propagation Society',
		heroBadge: 'IEEE APS MIST Chapter',
		heroSubtitle:
			'Advancing the theory and practice of electromagnetics, antenna systems, and radio wave propagation environments. We connect the world through academic precision and engineering excellence.',
		about: [
			'The IEEE Antennas and Propagation Society (APS) at MIST is a premier technical community dedicated to the science of electromagnetic wave theory and its practical applications. Our chapter serves as a hub for students and faculty to explore the frontiers of antenna design, scattering, and propagation.',
			'By bridging the gap between theoretical physics and applied engineering, we empower our members to contribute to the next generation of wireless technologies—from satellite communications to 5G/6G network infrastructure.',
		],
		mission: [],
		missionHeading: 'Mission & Vision',
		missionItems: [
			{
				icon: 'rocket',
				title: 'Our Mission',
				description:
					'To promote technical innovation in antennas, propagation, and electromagnetic wave theory through workshops, research projects, and global collaboration within the MIST community.',
			},
			{
				icon: 'eye',
				title: 'Our Vision',
				description:
					'To establish a world-class hub for electromagnetic research and systems thinking, empowering students to solve complex wireless communication challenges.',
			},
		],
		stats: [
			{ value: '25+', label: 'Research Projects' },
			{ value: '12', label: 'Annual Workshops' },
		],
		// APS's source has no distinct founding-history narrative — its "Our Story" eyebrow
		// sits directly over this same About copy, so reuse it rather than invent one.
		story: [
			'The IEEE Antennas and Propagation Society (APS) at MIST is a premier technical community dedicated to the science of electromagnetic wave theory and its practical applications. Our chapter serves as a hub for students and faculty to explore the frontiers of antenna design, scattering, and propagation.',
			'By bridging the gap between theoretical physics and applied engineering, we empower our members to contribute to the next generation of wireless technologies—from satellite communications to 5G/6G network infrastructure.',
		],
	},
	wie: {
		heroHeadline: { before: 'Empowering Women in', highlight: 'Engineering', after: '& Science' },
		heroSubtitle:
			'The IEEE Women in Engineering (WIE) Affinity Group at MIST Student Branch is dedicated to promoting women engineers and scientists, and inspiring girls to follow their academic interests in a career in engineering.',
		about: [
			'IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests to a career in engineering.',
			'At MIST, our WIE Affinity Group serves as a catalyst for professional growth and community support. We organize technical workshops, leadership seminars, and mentorship programs that bridge the gap between academia and industry.',
		],
		mission: [],
		missionItems: [
			{
				icon: 'verified',
				title: 'Recognize Excellence',
				description: 'Promote and celebrate the achievements of women engineers through awards and fellowships.',
			},
			{
				icon: 'group',
				title: 'Build Community',
				description: 'Foster a vibrant network where students can find support and professional networking opportunities.',
			},
			{
				icon: 'school',
				title: 'Inspire Next Gen',
				description: 'Organize outreach programs targeting school-age girls to encourage STEM career paths.',
			},
		],
		stats: [
			{ value: '450+', label: 'Active Members' },
			{ value: '15+', label: 'Annual Events' },
		],
		// No distinct founding-history narrative exists in WIE's source either — reuse About.
		story: [
			'IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests to a career in engineering.',
			'At MIST, our WIE Affinity Group serves as a catalyst for professional growth and community support. We organize technical workshops, leadership seminars, and mentorship programs that bridge the gap between academia and industry.',
		],
	},
	'mtt-s': {
		heroHeadline: { before: 'Advancing the Frontier of', highlight: 'Microwave Engineering', after: '' },
		heroBadge: 'Microwave Theory and Technology Society',
		heroSubtitle:
			'The IEEE MTT-S Student Branch Chapter at MIST serves as a nexus for students passionate about high-frequency electronics, electromagnetics, and future communication technologies.',
		about: [
			'The IEEE Microwave Theory and Technology Society (MTT-S) is a transnational society with more than 10,000 members and 190 chapters worldwide. Our student branch chapter at MIST focuses on the theory and application of RF, microwave, mm-wave, and terahertz technologies.',
		],
		mission: [
			'Promoting the advancement of microwave theory and its practical applications.',
			'Providing technical resources and networking opportunities for MIST students.',
			'Bridging the gap between academic research and industrial implementation.',
		],
		stats: [
			{ value: '150+', label: 'Active Members' },
			{ value: '12', label: 'Technical Seminars' },
		],
		// No distinct founding-history narrative exists in MTT-S's source either — reuse About.
		story: [
			'The IEEE Microwave Theory and Technology Society (MTT-S) is a transnational society with more than 10,000 members and 190 chapters worldwide. Our student branch chapter at MIST focuses on the theory and application of RF, microwave, mm-wave, and terahertz technologies.',
		],
	},
};

/** "Become an IEEE Member Today" CTA — identical text confirmed across every chapter's real export. */
export const chapterCta = {
	heading: 'Become an IEEE Member Today',
	body: "Unlock exclusive technical resources, networking opportunities, and professional development tools as part of the world's largest technical community.",
	button: 'Join IEEE MIST Chapter',
};

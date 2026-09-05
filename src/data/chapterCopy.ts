/**
 * Chapter page copy sourced from the Figma file (fileKey lkv4breNj08AtswP0xxUyf), from
 * full HTML/Tailwind exports of each chapter's real design that the user supplied
 * directly, and — for `story` on EDS/APS/SPS/WIE — from real chair's-message PDFs the
 * user supplied directly (signed with `storyAttribution`).
 *
 * The Figma chapter frames have significant copy-paste contamination — several
 * "About"/"Our Story" sections literally contain another chapter's text (e.g. EDS's
 * About paragraph was MTT-S's, SPS's was APS's, and APS/WIE/MTT-S's "Our Story" all
 * carried SPS's story verbatim). Per instruction, obvious wrong-chapter content was
 * NOT copied as-is; a chapter's own genuine copy was used instead of inventing new text.
 *
 * MTT-S has no chair's-message source yet, so its `story` still reuses its own genuine
 * `about` copy rather than fabricating a narrative with no source.
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
	/** Signature line under a first-person Our Story (e.g. a chair's message), e.g. "Hafsa Khan, Chair". */
	storyAttribution?: string;
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
		// Real chair's message, supplied directly by the user ("Message from the Chair | IEEE EDS MIST SBC").
		story: [
			'The modern technological landscape is shaped not at the macro level, but at the scale of nanometers. From the microprocessors powering artificial intelligence to the emerging materials redefining energy efficiency, real innovation begins at the foundational device level. The IEEE Electron Devices Society MIST Student Branch Chapter exists to bring that world of solid-state physics, semiconductor technology, and microelectronics into focus for our students.',
			'Our vision is to bridge the gap between classroom semiconductor theory and the frontiers of device engineering. We strive to cultivate a vibrant ecosystem where students do not simply view integrated circuits and electron devices as black boxes, but as dynamic systems waiting to be optimized, designed, and revolutionized. By demystifying the physics of micro- and nano-electronics, we aim to prepare our members to actively participate in the rapidly evolving global semiconductor arena.',
			'To realize this, our chapter focuses on building pathways to real-world expertise. Through technical workshops, expert lectures, and research-oriented discussions, we expose our members to breakthroughs in VLSI design, emerging device architectures, and solid-state fabrication. We aim to provide students with the clarity and mentorship needed to translate complex physical principles into viable, high-impact research and engineering solutions.',
			'As Chair, my commitment is to make deep-tech accessible and engaging. Whether you are curious about what lies beneath the silicon wafer, eager to explore advanced device modeling, or aspiring to contribute to future hardware innovations, our chapter is your platform. Join us as we explore the atomic-scale foundations that power the future.',
		],
		storyAttribution: 'Hafsa Khan, Chair — IEEE EDS MIST SBC',
	},
	sps: {
		heroTitle: 'Signal Processing Society',
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
		// Real chair's message, supplied directly by the user ("Chair, IEEE SPS MIST SB Chapter Group's Message").
		story: [
			'Have we ever considered how closely signals are associated with our everyday lives? From the alarm that marks the beginning of our day and the rhythm of our heartbeat to the lectures we attend, the music we listen to, and the images we observe, information reaches us continuously through signals in different forms. Understanding, analyzing, and interpreting such information lies at the core of signal processing.',
			'The IEEE Signal Processing Society MIST Student Branch Chapter aims to provide students with a platform to explore this broad and continuously developing field beyond the scope of conventional coursework. Our objective is to strengthen students’ understanding of signal processing while providing exposure to contemporary applications, research directions, and professional practices.',
			'Through technical sessions, workshops, seminars, research-oriented activities, and interaction with academic and industry professionals, the Chapter seeks to promote technical learning and scholarly engagement among its members. We intend to provide opportunities through which students can exchange knowledge, develop research interests, and establish meaningful connections with the wider IEEE Signal Processing Society community.',
			'As Chair, I am committed to working with our members and the Chapter team to develop an active and inclusive technical community at MIST. I hope the Chapter will serve as a platform where students can broaden their knowledge, pursue their technical interests, and gradually develop the skills and perspectives required to contribute to the field.',
		],
		storyAttribution: 'Mahdia Binte Maksud, Chair — IEEE SPS MIST SB',
	},
	aps: {
		heroTitle: 'Antennas and Propagation Society',
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
		// Real chair's message, supplied directly by the user ("APS story.pdf").
		story: [
			'Advancing communication engineering requires more than studying established theories; it demands a deep connection to the ongoing global conversation in electromagnetics. The IEEE Antennas and Propagation Society MIST Student Branch Chapter exists to ignite that scholarly curiosity within our institution.',
			'Our vision is to help students bridge the gap between textbook fundamentals and impactful scientific discovery. We aim to establish MIST as a premier community for radio frequency design and applied electromagnetics, inspiring our members to envision their own contributions to the field.',
			'To achieve this, we host dynamic academic seminars and technical sessions that bring real world experts directly to our students. By showcasing advanced research and the practical challenges tackled by industry leaders, we expose our members to the true scope of modern engineering and the brilliant minds shaping it.',
			'As Chair, my commitment is to support your academic journey by connecting you with the broader scientific community. Whether you are exploring a new research interest or looking to understand the latest technological breakthroughs, our chapter is here to expand your perspective. Join us in exploring the boundless potential of applied research.',
		],
		storyAttribution: 'Md. Mehedi Hasan Bhuiyan, Chair — IEEE APS MIST Chapter',
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
		// Real chair's message, supplied directly by the user ("Chair, IEEE MIST SB WIE Affinity Group's Message").
		story: [
			"When I think about why the IEEE MIST SB WIE Affinity Group exists, I don't start with a mission statement. I start with a memory: a first-year student, unsure if she belongs in a room full of circuits and control systems. Multiply her by every department, batch, and year, and you have our core purpose, not as an afterthought to engineering education, but as a promise that no one has to find her footing alone.",
			"Our vision is simple: a MIST where women don't just participate, but lead in research labs, technical societies, industry boardrooms, and the very academic institutions that shape them. We want the presence of women across every discipline to be so unremarkable that it never again feels like an exception.",
			'Day to day, we build bridges between students and professionals. This year, that meant bringing together voices like Naima Fatima and Maliha Hossain Ridita for Engineering Her Way, addressing what it truly takes to build a career in this field. We create spaces for technical growth and community workshops, panels, and mentorship circles, while advocating for representation across IEEE\'s leadership pipelines.',
			"As Chair, my role is to clear the path; walking alongside new students while learning from those who came before. IEEE WIE gave me a global community when I needed it most. My hope is that our Affinity Group does the same for the next student sitting quietly in a lecture hall, wondering if she belongs. She does. We're building the proof of it, one activity at a time.",
		],
		storyAttribution: 'Sarah Zahin, Chair — IEEE MIST SB WIE Affinity Group',
	},
	'mtt-s': {
		heroHeadline: { before: 'Advancing the Frontier of', highlight: 'Microwave Engineering', after: '' },
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

/**
 * "Become an IEEE Member Today" CTA — identical text confirmed across every chapter's real export.
 * The button links out to IEEE's own membership application: the student branch chapter itself
 * can't enroll members — chapter membership follows from holding an IEEE membership, which only
 * IEEE (not IEEE MIST SB) can issue.
 */
export const chapterCta = {
	heading: 'Become an IEEE Member Today',
	body: "Unlock exclusive technical resources, networking opportunities, and professional development tools as part of the world's largest technical community.",
	button: 'Join IEEE',
	href: 'https://www.ieee.org/membership/join',
};

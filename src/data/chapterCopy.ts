/**
 * Chapter page copy sourced from the Figma file (fileKey lkv4breNj08AtswP0xxUyf).
 *
 * The Figma chapter frames have significant copy-paste contamination — several
 * "About"/"Our Story" sections literally contain another chapter's text (e.g. EDS's
 * About paragraph was MTT-S's, SPS's was APS's, and APS/WIE/MTT-S's "Our Story" all
 * carried SPS's story verbatim). Per instruction, obvious wrong-chapter content was
 * NOT copied as-is. Where a chapter's own section was corrupted, its own genuine copy
 * from elsewhere on the same Figma frame (usually the Hero subtitle) was used instead
 * of inventing new text. Where no genuine chapter-specific text existed in the file at
 * all (WIE's mission bullets, WIE/MTT-S's hero subtitle, any chapter's "Our Story"
 * beyond EDS and SPS), the field is simply omitted rather than fabricated.
 */

export interface ChapterCopy {
	heroSubtitle: string;
	about: string[];
	mission: string[];
	vision?: string;
	story?: string[];
}

export const chapterCopy: Record<string, ChapterCopy> = {
	eds: {
		heroSubtitle:
			'The IEEE Electron Devices Society student branch chapter at MIST is dedicated to the field of electron devices, covering the modeling, design, and fabrication of microelectronic and nanophotonic structures.',
		about: [
			'The IEEE Electron Devices Society student branch chapter at MIST is dedicated to the field of electron devices, covering the modeling, design, and fabrication of microelectronic and nanophotonic structures.',
		],
		mission: [
			'To foster a vibrant community of future engineers specializing in electron device technology through hands-on learning, industrial exposure, and academic mentorship.',
		],
		story: [
			"Founded in 2018, the EDS Chapter at MIST was born from a desire to bridge the gap between theoretical semiconductor physics and practical VLSI design. Our early days were spent in humble laboratories, experimenting with breadboards and microcontrollers.",
			"Today, we serve as a hub for innovation in solid-state circuits and device modeling. We've hosted over 20 technical workshops and established a research culture that has led to several student publications in international journals.",
		],
	},
	sps: {
		heroSubtitle:
			'The science of analyzing, modifying, and synthesizing signals such as sound, images, and scientific measurements.',
		about: [
			'The science of analyzing, modifying, and synthesizing signals such as sound, images, and scientific measurements.',
		],
		mission: [
			'To promote technical innovation in signal processing through workshops, research projects, and global collaboration within the MIST community.',
		],
		vision:
			'To be a global leader in signal processing education and research, empowering students to solve real-world challenges through data and signal analysis.',
		story: [
			'Founded with a vision to foster a vibrant community of signal processing enthusiasts, the SPS Chapter at MIST has grown into a hub for technical innovation and academic excellence.',
			'Since its inception, our chapter has been dedicated to empowering students through hands-on workshops, research-driven projects, and global collaboration, bridging the gap between theoretical knowledge and real-world applications in signal and image processing.',
		],
	},
	aps: {
		heroSubtitle:
			'Advancing the theory and practice of electromagnetics, antenna systems, and radio wave propagation environments. We connect the world through academic precision and engineering excellence.',
		about: [
			'The IEEE Antennas and Propagation Society (APS) at MIST is a premier technical community dedicated to the science of electromagnetic wave theory and its practical applications. Our chapter serves as a hub for students and faculty to explore the frontiers of antenna design, scattering, and propagation.',
			'By bridging the gap between theoretical physics and applied engineering, we empower our members to contribute to the next generation of wireless technologies—from satellite communications to 5G/6G network infrastructure.',
		],
		mission: [
			'To promote technical innovation in antennas, propagation, and electromagnetic wave theory through workshops, research projects, and global collaboration within the MIST community.',
		],
		vision:
			'To establish a world-class hub for electromagnetic research and systems thinking, empowering students to solve complex wireless communication challenges.',
	},
	wie: {
		heroSubtitle: 'Inspiring, engaging, and advancing women in engineering.',
		about: [
			'IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests to a career in engineering.',
			'At MIST, our WIE Affinity Group serves as a catalyst for professional growth and community support. We organize technical workshops, leadership seminars, and mentorship programs that bridge the gap between academia and industry.',
		],
		mission: [],
	},
	'mtt-s': {
		heroSubtitle: 'Microwave theory, techniques, and high-frequency applications.',
		about: [
			'The IEEE Microwave Theory and Technology Society (MTT-S) is a transnational society with more than 10,000 members and 190 chapters worldwide. Our student branch chapter at MIST focuses on the theory and application of RF, microwave, mm-wave, and terahertz technologies.',
		],
		mission: [
			'Promoting the advancement of microwave theory and its practical applications.',
			'Providing technical resources and networking opportunities for MIST students.',
			'Bridging the gap between academic research and industrial implementation.',
		],
	},
};

/** "Become an IEEE Member Today" CTA — identical text confirmed across SPS/APS/MTT-S in Figma. */
export const chapterCta = {
	heading: 'Become an IEEE Member Today',
	body: "Unlock exclusive technical resources, networking opportunities, and professional development tools as part of the world's largest technical community.",
	button: 'Join IEEE MIST Chapter',
};

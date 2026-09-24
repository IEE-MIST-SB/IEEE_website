/**
 * Content that editors manage from `/dashboard` instead of code:
 *   - Chief Patron's Message / Counselor's Message (`leadership_messages`)
 *   - Executive Committee (`executive_committee`)
 *   - Associate Directors, branch-level (`associate_directors`)
 *
 * Fetched from Supabase at build time, same pattern as `src/lib/events.ts`. If a
 * table is empty or Supabase can't be reached, the site falls back to the last-known
 * static copy in `src/data/committee.ts` so a build never breaks because of this.
 */
import { selectRows } from './supabase';
import {
	leadership as staticLeadership,
	executiveCommittee as staticExecutiveCommittee,
	associateCommittee as staticAssociateCommittee,
	type Member,
} from '../data/committee';
import { withBase } from '../utils/paths';

export interface LeadershipMessageData {
	eyebrow: string;
	heading: string;
	message: string[];
	personName: string;
	personRoles: string[];
	image: string;
	imageAlt: string;
}

interface LeadershipRow {
	id: string;
	eyebrow: string;
	heading: string;
	person_name: string;
	person_roles: string[];
	message: string[];
	image_url: string | null;
}

interface ExecRow {
	name: string;
	role: string;
	department: string | null;
	major: string | null;
	avatar_url: string | null;
	sort_order: number;
}

interface AssocRow {
	name: string;
	role: string;
	avatar_url: string | null;
	sort_order: number;
}

function staticLeadershipFallback(id: 'chief_patron' | 'counselor'): LeadershipMessageData {
	const person = staticLeadership.find((m) =>
		id === 'chief_patron' ? m.role === 'Chief Patron' : m.role === 'Counselor',
	);
	return {
		eyebrow: id === 'chief_patron' ? 'Leadership Message' : 'Guidance & Vision',
		heading: id === 'chief_patron' ? "Chief Patron's Message" : "Counselor's Message",
		message: [],
		personName: person?.name ?? '',
		personRoles: person ? [person.department ?? '', person.role].filter(Boolean) : [],
		image: person?.avatar ?? '',
		imageAlt: person?.name ?? '',
	};
}

let leadershipCache: Promise<Record<'chief_patron' | 'counselor', LeadershipMessageData>> | undefined;

async function loadLeadership() {
	const fallback = {
		chief_patron: staticLeadershipFallback('chief_patron'),
		counselor: staticLeadershipFallback('counselor'),
	};
	try {
		const rows = await selectRows<LeadershipRow>(
			'leadership_messages',
			{ select: '*' },
			8_000,
		);
		for (const row of rows) {
			if (row.id !== 'chief_patron' && row.id !== 'counselor') continue;
			if (!row.person_name) continue; // an emptied-out row falls back to the static copy
			fallback[row.id] = {
				eyebrow: row.eyebrow || fallback[row.id].eyebrow,
				heading: row.heading || fallback[row.id].heading,
				message: row.message?.length ? row.message : fallback[row.id].message,
				personName: row.person_name,
				personRoles: row.person_roles?.length ? row.person_roles : fallback[row.id].personRoles,
				image: row.image_url ? withBase(row.image_url) : fallback[row.id].image,
				imageAlt: row.person_name,
			};
		}
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`[content] Leadership messages unavailable, using static copy. (${reason})`);
	}
	return fallback;
}

/** Chief Patron's Message and Counselor's Message, edited from the dashboard. */
export function getLeadershipMessages() {
	leadershipCache ??= loadLeadership();
	return leadershipCache;
}

let execCache: Promise<Member[]> | undefined;

async function loadExecutiveCommittee(): Promise<Member[]> {
	try {
		const rows = await selectRows<ExecRow>(
			'executive_committee',
			{ select: '*', order: 'sort_order.asc' },
			8_000,
		);
		if (rows.length === 0) return staticExecutiveCommittee;
		return rows.map((row) => ({
			name: row.name,
			role: row.role,
			department: row.department ?? undefined,
			major: row.major ?? undefined,
			avatar: row.avatar_url ? withBase(row.avatar_url) : undefined,
		}));
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`[content] Executive committee unavailable, using static copy. (${reason})`);
		return staticExecutiveCommittee;
	}
}

/** Executive Committee, edited from the dashboard. */
export function getExecutiveCommittee(): Promise<Member[]> {
	execCache ??= loadExecutiveCommittee();
	return execCache;
}

let assocCache: Promise<Member[]> | undefined;

async function loadAssociateCommittee(): Promise<Member[]> {
	try {
		const rows = await selectRows<AssocRow>(
			'associate_directors',
			{ select: '*', group_key: 'eq.sb', order: 'sort_order.asc' },
			8_000,
		);
		if (rows.length === 0) return staticAssociateCommittee;
		return rows.map((row) => ({
			name: row.name,
			role: row.role,
			avatar: row.avatar_url ? withBase(row.avatar_url) : undefined,
		}));
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		console.warn(`[content] Associate directors unavailable, using static copy. (${reason})`);
		return staticAssociateCommittee;
	}
}

/** Associate Directors (branch-level), edited from the dashboard. */
export function getAssociateCommittee(): Promise<Member[]> {
	assocCache ??= loadAssociateCommittee();
	return assocCache;
}

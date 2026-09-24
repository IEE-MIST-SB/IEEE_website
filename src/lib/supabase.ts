/**
 * Minimal Supabase Data API (PostgREST) client.
 *
 * The site is fully static, so every Supabase call is either made in the visitor's
 * browser (form submissions) or at build time (fetching events). Both use the
 * project's *publishable* key, which is designed to be public. Access is enforced by
 * the Row Level Security policies in `supabase/schema.sql`, not by hiding the key.
 *
 * Publishable keys (`sb_publishable_…`) are not JWTs, so they are sent in the
 * `apikey` header only — never as a Bearer token.
 *
 * Override the defaults with `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_PUBLISHABLE_KEY`
 * (see `.env.example`).
 */

const DEFAULT_URL = 'https://czxhvlqhfqhovuslglpe.supabase.co';
const DEFAULT_KEY = 'sb_publishable__C3FKDsT53MA-0siZYUbKw_Q26ZkV_H';

const SUPABASE_URL = String(import.meta.env.PUBLIC_SUPABASE_URL || DEFAULT_URL).replace(/\/+$/, '');
const SUPABASE_KEY = String(import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_KEY);

const DEFAULT_TIMEOUT_MS = 10_000;

export class SupabaseError extends Error {
	/** Postgres / PostgREST error code, e.g. `23505` (unique violation). */
	readonly code?: string;
	/** HTTP status, or 0 when the request never reached the server. */
	readonly status: number;

	constructor(message: string, status: number, code?: string) {
		super(message);
		this.name = 'SupabaseError';
		this.status = status;
		this.code = code;
	}

	get isDuplicate() {
		return this.code === '23505';
	}

	get isNetwork() {
		return this.status === 0;
	}
}

async function request(path: string, init: RequestInit, timeoutMs = DEFAULT_TIMEOUT_MS) {
	let response: Response;
	try {
		response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
			...init,
			headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json', ...init.headers },
			signal: AbortSignal.timeout(timeoutMs),
		});
	} catch (cause) {
		const reason = cause instanceof Error ? cause.message : String(cause);
		throw new SupabaseError(`Could not reach Supabase: ${reason}`, 0);
	}

	if (response.ok) return response;

	let code: string | undefined;
	let message = response.statusText || `HTTP ${response.status}`;
	try {
		const body = await response.json();
		code = body?.code;
		message = body?.message ?? message;
	} catch {
		// Non-JSON error body — keep the status text.
	}
	throw new SupabaseError(message, response.status, code);
}

/**
 * Inserts one row. Uses `Prefer: return=minimal`, so the anonymous role only needs an
 * INSERT policy — it never needs (or gets) permission to read the row back.
 */
export async function insertRow(table: string, row: Record<string, unknown>): Promise<void> {
	await request(encodeURIComponent(table), {
		method: 'POST',
		headers: { Prefer: 'return=minimal' },
		body: JSON.stringify(row),
	});
}

/** Reads rows using PostgREST query params, e.g. `{ select: '*', published: 'eq.true' }`. */
export async function selectRows<T>(
	table: string,
	params: Record<string, string> = {},
	timeoutMs?: number,
): Promise<T[]> {
	const query = new URLSearchParams(params).toString();
	const response = await request(
		`${encodeURIComponent(table)}${query ? `?${query}` : ''}`,
		{ method: 'GET' },
		timeoutMs,
	);
	return (await response.json()) as T[];
}

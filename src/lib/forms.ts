/**
 * Browser-side form handlers that write to Supabase, plus the shared `bindForm`
 * helper that wires a <form> to one of them (status message, busy state, honeypot).
 */
import { SupabaseError, insertRow } from './supabase';

export type Outcome = { ok: true; message: string } | { ok: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: FormDataEntryValue | null | undefined, max: number) =>
	String(value ?? '')
		.trim()
		.slice(0, max);

/** Turns a failed Supabase call into a message that is safe and useful to show visitors. */
function failure(error: unknown, duplicateMessage?: string): Outcome {
	if (error instanceof SupabaseError) {
		if (error.isDuplicate && duplicateMessage) return { ok: true, message: duplicateMessage };
		if (error.isNetwork) {
			return { ok: false, message: 'We could not reach the server. Check your connection and try again.' };
		}
		if (error.code === '23514') {
			return { ok: false, message: 'Some of the details look invalid. Please check them and try again.' };
		}
	}
	console.error('[supabase]', error);
	return { ok: false, message: 'Something went wrong on our side. Please try again in a moment.' };
}

export async function submitContactMessage(data: FormData): Promise<Outcome> {
	const row = {
		name: clean(data.get('name'), 120),
		email: clean(data.get('email'), 254).toLowerCase(),
		subject: clean(data.get('subject'), 120),
		message: clean(data.get('message'), 5000),
	};
	if (!row.name || !row.message || !EMAIL_PATTERN.test(row.email)) {
		return { ok: false, message: 'Please fill in your name, a valid email address and a message.' };
	}
	try {
		await insertRow('contact_messages', row);
		return { ok: true, message: 'Thanks! Your message has been sent — we will get back to you soon.' };
	} catch (error) {
		return failure(error);
	}
}

export async function subscribeToNewsletter(data: FormData): Promise<Outcome> {
	const email = clean(data.get('email'), 254).toLowerCase();
	if (!EMAIL_PATTERN.test(email)) {
		return { ok: false, message: 'Please enter a valid email address.' };
	}
	try {
		await insertRow('newsletter_subscribers', { email, source: location.pathname.slice(0, 200) });
		return { ok: true, message: "You're subscribed! Watch your inbox for upcoming events." };
	} catch (error) {
		return failure(error, "You're already on the list — thank you!");
	}
}

export async function registerForEvent(data: FormData): Promise<Outcome> {
	const row = {
		event_slug: clean(data.get('event_slug'), 200),
		name: clean(data.get('name'), 120),
		email: clean(data.get('email'), 254).toLowerCase(),
		student_id: clean(data.get('student_id'), 40) || null,
		department: clean(data.get('department'), 120) || null,
	};
	if (!row.event_slug || !row.name || !EMAIL_PATTERN.test(row.email)) {
		return { ok: false, message: 'Please fill in your name and a valid email address.' };
	}
	try {
		await insertRow('event_registrations', row);
		return { ok: true, message: "You're registered! We'll email you the details closer to the event." };
	} catch (error) {
		return failure(error, "You're already registered for this event with that email.");
	}
}

/**
 * Wires a form to a handler. Expects an optional `[data-status]` element inside the
 * form for feedback and an optional `website` input used as a bot honeypot.
 */
export function bindForm(form: HTMLFormElement, handler: (data: FormData) => Promise<Outcome>) {
	const status = form.querySelector<HTMLElement>('[data-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	const show = (state: 'pending' | 'success' | 'error', message: string) => {
		if (!status) return;
		status.dataset.state = state;
		status.textContent = message;
	};

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (form.dataset.busy === 'true') return;

		const data = new FormData(form);

		// Bots fill every field. Pretend it worked without touching the database.
		if (String(data.get('website') ?? '').trim() !== '') {
			show('success', 'Thank you!');
			form.reset();
			return;
		}

		form.dataset.busy = 'true';
		if (submit) submit.disabled = true;
		show('pending', 'Sending…');

		try {
			const outcome = await handler(data);
			show(outcome.ok ? 'success' : 'error', outcome.message);
			if (outcome.ok) form.reset();
		} finally {
			form.dataset.busy = 'false';
			if (submit) submit.disabled = false;
		}
	});
}

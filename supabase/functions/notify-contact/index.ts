/**
 * Emails every new contact-form message to the branch inbox.
 *
 * Flow: visitor submits /contact -> row inserted into `contact_messages` ->
 * Supabase Database Webhook (INSERT) -> this function -> Resend -> inbox.
 * The message is already safely stored before this runs, so an email failure
 * never loses a message; it is just logged and the webhook shows the error.
 *
 * Secrets (set with `supabase secrets set`, never committed):
 *   WEBHOOK_SECRET  shared secret; the webhook must send it as `x-webhook-secret`
 *   RESEND_API_KEY  API key from https://resend.com
 *   MAIL_FROM       verified sender, e.g. "IEEE MIST Website <noreply@yourdomain.org>"
 *   MAIL_TO         optional, defaults to ieeemistsb@mist.ac.bd
 */

interface ContactRecord {
	id?: string;
	name?: string;
	email?: string;
	subject?: string | null;
	message?: string;
	created_at?: string;
}

const DEFAULT_TO = 'ieeemistsb@mist.ac.bd';

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

/** Header values must never contain line breaks (header injection). */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

export function buildEmail(record: ContactRecord) {
	const name = oneLine(record.name ?? 'Unknown');
	const email = oneLine(record.email ?? '');
	const subject = oneLine(record.subject || 'General Inquiry');
	const message = record.message ?? '';
	const sent = record.created_at ? new Date(record.created_at).toUTCString() : 'just now';

	const text = `New message from the IEEE MIST website contact form\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nSent: ${sent}\n\n${message}\n\n— Reply to this email to answer ${name} directly.`;

	const html = `<div style="font-family:system-ui,sans-serif;max-width:640px">
<h2 style="color:#002855;margin:0 0 16px">New contact form message</h2>
<table style="border-collapse:collapse;margin-bottom:16px">
<tr><td style="padding:4px 16px 4px 0;color:#717881">Name</td><td>${escapeHtml(name)}</td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#717881">Email</td><td>${escapeHtml(email)}</td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#717881">Subject</td><td>${escapeHtml(subject)}</td></tr>
<tr><td style="padding:4px 16px 4px 0;color:#717881">Sent</td><td>${escapeHtml(sent)}</td></tr>
</table>
<div style="white-space:pre-wrap;padding:16px;border-left:3px solid #00629b;background:#f4f4f4">${escapeHtml(message)}</div>
<p style="color:#717881;font-size:13px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
</div>`;

	return { subject: `[IEEE MIST Contact] ${subject} — ${name}`.slice(0, 200), text, html, replyTo: email };
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string) {
	const enc = new TextEncoder();
	const x = enc.encode(a);
	const y = enc.encode(b);
	let diff = x.length ^ y.length;
	for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
	return diff === 0;
}

export async function handle(req: Request, env: (key: string) => string | undefined): Promise<Response> {
	if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

	const secret = env('WEBHOOK_SECRET');
	const apiKey = env('RESEND_API_KEY');
	const from = env('MAIL_FROM');
	if (!secret || !apiKey || !from) {
		console.error('notify-contact: WEBHOOK_SECRET, RESEND_API_KEY and MAIL_FROM must be set');
		return new Response('Server not configured', { status: 500 });
	}
	if (!safeEqual(req.headers.get('x-webhook-secret') ?? '', secret)) {
		return new Response('Unauthorized', { status: 401 });
	}

	let payload: { type?: string; table?: string; record?: ContactRecord };
	try {
		payload = await req.json();
	} catch {
		return new Response('Bad request', { status: 400 });
	}
	if (payload.type !== 'INSERT' || payload.table !== 'contact_messages' || !payload.record) {
		return new Response('Ignored', { status: 200 });
	}

	const mail = buildEmail(payload.record);
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			from,
			to: [env('MAIL_TO') || DEFAULT_TO],
			reply_to: mail.replyTo || undefined,
			subject: mail.subject,
			text: mail.text,
			html: mail.html,
		}),
	});

	if (!response.ok) {
		console.error('notify-contact: Resend rejected the email', response.status, await response.text());
		return new Response('Email failed', { status: 502 });
	}
	return new Response('Sent', { status: 200 });
}

if (import.meta.main) {
	Deno.serve((req) => handle(req, (key) => Deno.env.get(key)));
}

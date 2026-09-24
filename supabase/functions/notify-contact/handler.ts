/**
 * Emails each new contact-form message to the branch inbox.
 *
 * Flow: visitor submits /contact -> row inserted into `contact_messages` ->
 * a Supabase Database Webhook (INSERT on that table) calls this function -> we send
 * the email through Resend. The row is already saved by then, so a failed email
 * never loses a message.
 *
 * Secrets (set with `supabase secrets set`):
 *   RESEND_API_KEY      required — from resend.com
 *   WEBHOOK_SECRET      required — same value as the `x-webhook-secret` header on the webhook
 *   CONTACT_TO_EMAIL    optional — defaults to ieeemistsb@mist.ac.bd
 *   CONTACT_FROM_EMAIL  optional — must be on a domain verified in Resend,
 *                       e.g. "IEEE MIST Website <noreply@yourdomain>"
 */

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Header values must be single-line; also caps the length. */
const oneLine = (value: unknown, max: number) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

function safeEqual(a: string, b: string) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

export async function handler(req: Request, env: (name: string) => string | undefined): Promise<Response> {
	if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

	const secret = env('WEBHOOK_SECRET');
	const apiKey = env('RESEND_API_KEY');
	if (!secret || !apiKey) {
		console.error('notify-contact: WEBHOOK_SECRET or RESEND_API_KEY is not configured');
		return new Response('Not configured', { status: 500 });
	}
	if (!safeEqual(req.headers.get('x-webhook-secret') ?? '', secret)) {
		return new Response('Unauthorized', { status: 401 });
	}

	let payload: { type?: string; table?: string; record?: Record<string, unknown> };
	try {
		payload = await req.json();
	} catch {
		return new Response('Bad JSON', { status: 400 });
	}
	if (payload.type !== 'INSERT' || payload.table !== 'contact_messages' || !payload.record) {
		return new Response('Ignored', { status: 200 });
	}

	const name = oneLine(payload.record.name, 120);
	const email = oneLine(payload.record.email, 254);
	const subject = oneLine(payload.record.subject, 120) || 'General Inquiry';
	const message = String(payload.record.message ?? '').slice(0, 5000);
	const sentAt = oneLine(payload.record.created_at, 40);

	const text = `New message from the IEEE MIST website contact form\n\nFrom: ${name} <${email}>\nSubject: ${subject}\nReceived: ${sentAt}\n\n${message}\n\n— Reply to this email to answer ${name} directly.`;
	const html = `<p><strong>New message from the IEEE MIST website contact form</strong></p>
<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;<br>
<strong>Subject:</strong> ${escapeHtml(subject)}<br>
<strong>Received:</strong> ${escapeHtml(sentAt)}</p>
<blockquote style="margin:0;padding:0 0 0 12px;border-left:3px solid #00629b;white-space:pre-wrap">${escapeHtml(message)}</blockquote>
<p style="color:#717881">Reply to this email to answer ${escapeHtml(name)} directly.</p>`;

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			from: env('CONTACT_FROM_EMAIL') ?? 'IEEE MIST Website <onboarding@resend.dev>',
			to: [env('CONTACT_TO_EMAIL') ?? 'ieeemistsb@mist.ac.bd'],
			reply_to: email,
			subject: `[Contact] ${subject} — ${name}`,
			text,
			html,
		}),
	});

	if (!response.ok) {
		console.error('notify-contact: Resend rejected the email', response.status, await response.text());
		return new Response('Email failed', { status: 502 });
	}
	return new Response('Sent', { status: 200 });
}

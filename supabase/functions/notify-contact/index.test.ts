// Run with: deno test --allow-all supabase/functions/notify-contact
import { handle, buildEmail } from './index.ts';
import assertLib from 'node:assert/strict';
const assert = (c: unknown, m?: string) => assertLib.ok(c, m);
const assertEquals = (a: unknown, b: unknown) => assertLib.deepEqual(a, b);
const env = (m: Record<string,string>) => (k: string) => m[k];
const full = { WEBHOOK_SECRET: 's3cret', RESEND_API_KEY: 're_test', MAIL_FROM: 'Site <noreply@x.org>' };
const body = (record: unknown, extra = {}) => JSON.stringify({ type: 'INSERT', table: 'contact_messages', record, ...extra });
const hit = (h: Record<string,string>, b: string, method = 'POST') => new Request('http://f/', { method, headers: h, body: method === 'POST' ? b : undefined });
const good = { name: 'Ada <b>L</b>', email: 'ada@example.com', subject: 'Membership\r\nBcc: evil@x.com', message: '<script>alert(1)</script>\nhello', created_at: '2026-09-24T10:00:00Z' };

let sent: any[] = []; let resendStatus = 200;
globalThis.fetch = (async (url: string, init: any) => { sent.push({ url, init, body: JSON.parse(init.body) }); return new Response('{}', { status: resendStatus }); }) as any;

Deno.test('sends to the branch inbox with reply-to + escaped content', async () => {
  sent = [];
  const r = await handle(hit({ 'x-webhook-secret': 's3cret' }, body(good)), env(full));
  assertEquals(r.status, 200); assertEquals(sent.length, 1);
  const s = sent[0];
  assertEquals(s.url, 'https://api.resend.com/emails');
  assertEquals(s.init.headers.Authorization, 'Bearer re_test');
  assertEquals(s.body.to, ['ieeemistsb@mist.ac.bd']);
  assertEquals(s.body.reply_to, 'ada@example.com');
  assert(!/[\r\n]/.test(s.body.subject), 'no header injection');
  assert(!s.body.html.includes('<script>') && s.body.html.includes('&lt;script&gt;'), 'html escaped');
  assert(s.body.html.includes('Ada &lt;b&gt;L&lt;/b&gt;'));
});
Deno.test('MAIL_TO override works', async () => {
  sent = []; await handle(hit({ 'x-webhook-secret': 's3cret' }, body(good)), env({ ...full, MAIL_TO: 'other@mist.ac.bd' }));
  assertEquals(sent[0].body.to, ['other@mist.ac.bd']);
});
Deno.test('wrong/missing secret -> 401, no email', async () => {
  sent = [];
  assertEquals((await handle(hit({ 'x-webhook-secret': 'nope' }, body(good)), env(full))).status, 401);
  assertEquals((await handle(hit({}, body(good)), env(full))).status, 401);
  assertEquals(sent.length, 0);
});
Deno.test('non-INSERT / other table ignored, GET rejected, bad json 400, unconfigured 500', async () => {
  sent = []; const h = { 'x-webhook-secret': 's3cret' };
  assertEquals((await handle(hit(h, body(good, { type: 'UPDATE' })), env(full))).status, 200);
  assertEquals((await handle(hit(h, body(good, { table: 'events' })), env(full))).status, 200);
  assertEquals(sent.length, 0);
  assertEquals((await handle(hit(h, '', 'GET'), env(full))).status, 405);
  assertEquals((await handle(hit(h, '{oops'), env(full))).status, 400);
  assertEquals((await handle(hit(h, body(good)), env({}))).status, 500);
});
Deno.test('Resend failure -> 502 so the webhook shows the error', async () => {
  resendStatus = 403; const r = await handle(hit({ 'x-webhook-secret': 's3cret' }, body(good)), env(full)); resendStatus = 200;
  assertEquals(r.status, 502);
});

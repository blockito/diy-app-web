import { NextResponse } from 'next/server';

/**
 * Where an early-access address goes.
 *
 * Two providers, whichever is configured, and neither by default. The reply
 * carries `persisted` so the form can be honest: a landing page that says
 * "you're on the list" while dropping the address on the floor is the one
 * failure here that costs something real.
 *
 *   FORMSPREE_ENDPOINT   https://formspree.io/f/xxxxxxxx
 *   SUPABASE_URL + SUPABASE_SERVICE_KEY   inserts into a `waitlist` table
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function toFormspree(email: string, endpoint: string): Promise<boolean> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, source: 'diy-guide-landing' })
  });
  return response.ok;
}

async function toSupabase(email: string, url: string, key: string): Promise<boolean> {
  const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'resolution=ignore-duplicates'
    },
    body: JSON.stringify({ email })
  });
  return response.ok;
}

export async function POST(request: Request) {
  let email = '';
  try {
    const body = (await request.json()) as { email?: unknown };
    email = String(body.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: 'Send an email address.' }, { status: 400 });
  }

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'That does not look like an email address.' }, { status: 400 });
  }

  const formspree = process.env.FORMSPREE_ENDPOINT;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  try {
    if (formspree) {
      const stored = await toFormspree(email, formspree);
      return NextResponse.json({ ok: stored, persisted: stored, ...(stored ? {} : { error: 'Could not save that. Try again.' }) },
        { status: stored ? 200 : 502 });
    }

    if (supabaseUrl && supabaseKey) {
      const stored = await toSupabase(email, supabaseUrl, supabaseKey);
      return NextResponse.json({ ok: stored, persisted: stored, ...(stored ? {} : { error: 'Could not save that. Try again.' }) },
        { status: stored ? 200 : 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not save that. Try again.' }, { status: 502 });
  }

  // Nothing configured. Say so in the log rather than pretending, and tell the
  // client the truth so it can say so too.
  console.warn(`[waitlist] no provider configured; ${email} was not stored`);
  return NextResponse.json({ ok: true, persisted: false });
}

'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

type State = { kind: 'idle' | 'sending' } | { kind: 'done'; persisted: boolean } | { kind: 'error'; message: string };

/**
 * The waitlist.
 *
 * The one thing on this page that must not lie: if an address was not actually
 * stored anywhere, it does not say it was. `persisted` comes back from the API
 * route, which knows whether a provider is configured — see app/api/waitlist.
 */
export default function WaitlistForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  const dark = tone === 'dark';

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (state.kind === 'sending') return;
    setState({ kind: 'sending' });

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const body = (await response.json()) as { ok?: boolean; persisted?: boolean; error?: string };

      if (!response.ok || !body.ok) {
        setState({ kind: 'error', message: body.error ?? 'That did not go through. Try again.' });
        return;
      }
      setState({ kind: 'done', persisted: Boolean(body.persisted) });
      setEmail('');
    } catch {
      setState({ kind: 'error', message: 'No connection. Try again in a moment.' });
    }
  }

  if (state.kind === 'done') {
    return (
      <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 ${dark ? 'bg-cream/10 text-cream' : 'bg-sage-soft text-ink'}`}>
        <Check className="h-5 w-5 flex-none" aria-hidden />
        <p className="text-sm">
          You&rsquo;re on the list. We&rsquo;ll write once, when it opens.
          {!state.persisted && (
            <span className={`mt-1 block text-xs ${dark ? 'text-cream/60' : 'text-ink-faint'}`}>
              Developer note: no provider is configured, so this address was logged and not stored.
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={`flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center ${
          dark ? 'bg-cream/10' : 'border border-line bg-white shadow-card'
        }`}
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={`min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] outline-none ${
            dark ? 'text-cream placeholder:text-cream/45' : 'text-ink placeholder:text-ink-faint'
          }`}
        />
        <button
          type="submit"
          disabled={state.kind === 'sending'}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition-opacity disabled:opacity-60 ${
            dark ? 'bg-cream text-forest-deep' : 'bg-forest text-cream'
          }`}
        >
          {state.kind === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Joining
            </>
          ) : (
            <>
              Join early access <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>

      {state.kind === 'error' && (
        <p className={`mt-2 px-1 text-[13px] ${dark ? 'text-clay' : 'text-clay'}`} role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}

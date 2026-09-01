import { Apple, Play } from 'lucide-react';

/**
 * The store buttons.
 *
 * Marked as coming soon rather than linked to nothing: a dead App Store button
 * is the fastest way to lose someone who was otherwise ready to wait for you.
 */
export default function StoreButtons({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const base = dark
    ? 'border-cream/20 bg-cream/10 text-cream'
    : 'border-line bg-white text-ink shadow-card';

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {[
        { Icon: Apple, top: 'Coming soon to', bottom: 'the App Store' },
        { Icon: Play, top: 'Coming soon to', bottom: 'Google Play' }
      ].map(({ Icon, top, bottom }) => (
        <div
          key={bottom}
          className={`flex items-center gap-3 rounded-2xl border px-5 py-3 ${base}`}
        >
          <Icon className="h-6 w-6 flex-none" aria-hidden />
          <span className="leading-tight">
            <span className={`block text-[10.5px] ${dark ? 'text-cream/60' : 'text-ink-faint'}`}>{top}</span>
            <span className="block text-[14.5px] font-semibold">{bottom}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Logo from './Logo';
import StoreButtons from './StoreButtons';
import WaitlistForm from './WaitlistForm';
import { Reveal } from './motion';

/* ----------------------------------------------------------------------- faq */

const FAQ = [
  {
    q: 'Which videos does it work with?',
    a: 'YouTube links work best, since the app can read the subtitles, description and chapters. Written tutorials work too. Instagram and TikTok block automated reading, so for those, paste the text or upload the clip instead.'
  },
  {
    q: 'What if the video never says the measurements out loud?',
    a: 'Upload the clip rather than linking it. The app looks at the picture as well as listening, so a dimension shown on a tape measure but never spoken still reaches the guide.'
  },
  {
    q: 'Does it work in metric or imperial?',
    a: 'Both — you pick, and it converts. It rounds to something you would actually cut to, and gives hardware in the sizes your shops really stock.'
  },
  {
    q: 'Do I need a signal in the workshop?',
    a: 'No. Saved guides open offline and your progress is kept on the device, then synced when you are back on a connection.'
  },
  {
    q: 'What does it cost?',
    a: 'Nothing while it is being built. There will be a paid tier later, and the app will ask before it ever charges anything.'
  }
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line bg-parchment/60">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-forest">FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.9rem)] leading-[1.08] tracking-[-0.015em] text-ink">
            The questions people actually ask.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-title text-[17.5px] font-bold text-ink">{item.q}</span>
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-forest" aria-hidden />
                    ) : (
                      <Plus className="h-4 w-4 text-forest" aria-hidden />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ download */

function Download() {
  return (
    <section id="download" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-forest-deep px-7 py-14 text-cream sm:px-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.06] tracking-[-0.015em]">
              Be there when it opens.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-cream/70">
              It is in testing now. Leave an address and you will hear once — the day you can install it,
              and not before.
            </p>

            <div className="mx-auto mt-9 max-w-[30rem]">
              <WaitlistForm tone="dark" />
            </div>

            <div className="mt-8 flex justify-center">
              <StoreButtons tone="dark" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-[19px] text-ink">DIY Guide</span>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
            Turns a video you cannot build from into a guide you can.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '#features' },
                { label: 'How it works', href: '#how' },
                { label: 'FAQ', href: '#faq' }
              ]
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacy policy', href: 'https://diy-app-backend.onrender.com/privacy' },
                { label: 'Terms of service', href: '/terms' }
              ]
            },
            {
              title: 'Contact',
              links: [
                { label: 'support@diyguide.app', href: 'mailto:support@diyguide.app' },
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'YouTube', href: 'https://youtube.com' }
              ]
            }
          ].map(group => (
            <div key={group.title}>
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-ink-soft transition-colors hover:text-forest"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[12.5px] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} DIY Guide. Made for people with sawdust on their phone.</p>
          <p>Built with care in Slovakia.</p>
        </div>
      </div>
    </footer>
  );
}

export { Faq, Download, Footer };

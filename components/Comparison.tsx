'use client';

import { motion } from 'framer-motion';
import { Check, Pause, Play, RotateCcw, Volume2 } from 'lucide-react';
import { Reveal } from './motion';

/**
 * The before and after, side by side.
 *
 * The left panel is the honest version of watching a build video with your
 * hands full: a scrub bar you keep dragging, and the thing you needed said once
 * at 6:47. The right is what the app gives you instead. Nothing is exaggerated —
 * the numbers on the right are from a guide the app really produced.
 */

const SCRUBS = ['0:00', '6:47', '12:02', '19:41'];

const RESULT = [
  'Pine board, 80 × 25 cm — 1',
  'Wall brackets — 2',
  'Screws, 5 cm — 4',
  'Drill with an 8 mm bit',
  'Sandpaper, 150 grit'
];

export default function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-forest">The difference</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.015em] text-ink">
          Twenty minutes of video, or the four lines you needed.
        </h2>
      </Reveal>

      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
        {/* before */}
        <Reveal>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="relative aspect-video bg-forest-deep">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/15 backdrop-blur">
                  <Play className="ml-1 h-6 w-6 fill-cream text-cream" aria-hidden />
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <div className="h-1 rounded-full bg-cream/25">
                  <div className="h-1 w-[34%] rounded-full bg-cream/80" />
                </div>
                <div className="mt-2 flex items-center gap-3 text-cream/70">
                  <Pause className="h-3.5 w-3.5" aria-hidden />
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  <Volume2 className="h-3.5 w-3.5" aria-hidden />
                  <span className="ml-auto text-[11px]">6:47 / 19:41</span>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="font-title text-[17px] font-bold text-ink">Building a bookshelf — full build</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SCRUBS.map(t => (
                  <span key={t} className="rounded-full bg-parchment px-2.5 py-1 text-[11.5px] text-ink-faint">
                    scrub to {t}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-[14px] text-ink-soft">
                <li>Measurements said once, in passing.</li>
                <li>Two minutes of sponsor before anything is cut.</li>
                <li>Rewind with a wet brush in your hand.</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* arrow */}
        <div className="flex items-center justify-center lg:px-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream"
          >
            <span className="text-lg leading-none">→</span>
          </motion.div>
        </div>

        {/* after */}
        <Reveal delay={0.12}>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest/15 bg-forest p-6 text-cream shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cream/55">Your guide</p>
            <p className="mt-3 font-title text-[20px] font-bold">🪵 Knotty Pine Bookshelf</p>
            <div className="mt-2 flex gap-1.5 text-[11px] text-cream/70">
              <span className="rounded-full bg-cream/12 px-2 py-[3px]">Furniture</span>
              <span className="rounded-full bg-cream/12 px-2 py-[3px]">Easy</span>
              <span className="rounded-full bg-cream/12 px-2 py-[3px]">2h</span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {RESULT.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl bg-cream/8 px-3.5 py-2.5 text-[14px]"
                >
                  <span className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-md bg-cream/20">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  {line}
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 text-[13.5px] leading-relaxed text-cream/65">
              Four steps, each with the second of the video it came from. Read it once, then put the
              phone down.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Check, ChevronLeft, Clock, Play, Bookmark } from 'lucide-react';
import { useState } from 'react';

type Step = { title: string; detail: string; at: string };

/**
 * The guide screen, rebuilt in the browser rather than screenshotted.
 *
 * A picture of an app on a landing page is a promise; this one can be touched,
 * so the promise is testable in the first ten seconds. The content is a real
 * guide the app produces from a real video, not lorem — the measurements below
 * came out of the bookshelf build the app was tested against.
 */
const STEPS: Step[] = [
  { title: 'Cut the shelf boards', detail: 'Cut the pine to 80 cm, two pieces, then trim the ends square.', at: '1:24' },
  { title: 'Sand every face', detail: 'Work up to 150 grit, paying attention to the edges.', at: '4:02' },
  { title: 'Mark the bracket holes', detail: '140 cm from the floor, 60 cm apart, checked with a level.', at: '6:47' },
  { title: 'Drill and fix', detail: 'An 8 mm bit, then four 5 cm screws through the brackets.', at: '9:15' }
];

const MATERIALS = [
  { name: 'Knotty pine board', qty: '1' },
  { name: 'Wall brackets', qty: '2' },
  { name: 'Screws, 5 cm', qty: '4' },
  { name: 'Wall plugs', qty: '4' }
];

const TOOLS = [
  { name: 'Drill', qty: '' },
  { name: 'Spirit level', qty: '' },
  { name: 'Sandpaper, 150 grit', qty: '' }
];

export default function PhoneMockup() {
  const [tab, setTab] = useState<'steps' | 'supplies'>('steps');
  const [done, setDone] = useState<Set<number>>(new Set([0]));
  const [ticked, setTicked] = useState<Set<string>>(new Set(['m0']));

  const toggle = <T,>(set: Set<T>, value: T, update: (next: Set<T>) => void) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    update(next);
  };

  return (
    <div className="relative mx-auto w-[292px] sm:w-[320px]">
      {/* the device */}
      <div className="relative rounded-[2.75rem] bg-forest-deep p-[10px] shadow-device">
        <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-forest-deep" />
        <div className="relative h-[600px] overflow-hidden rounded-[2.25rem] bg-cream">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-4 text-[11px] font-medium text-ink-soft">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-ink-faint" />
              <span className="h-[7px] w-[7px] rounded-full bg-ink-faint" />
              <span className="h-[7px] w-[16px] rounded-sm bg-ink-soft" />
            </span>
          </div>

          {/* hero band */}
          <div className="mx-4 mt-2 rounded-2xl bg-forest px-4 pb-4 pt-3 text-cream">
            <div className="flex items-center justify-between">
              <ChevronLeft className="h-4 w-4 opacity-80" aria-hidden />
              <Bookmark className="h-4 w-4 opacity-80" aria-hidden />
            </div>
            <p className="mt-2 font-title text-[19px] leading-tight">🪵 Knotty Pine Bookshelf</p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-full bg-cream/15 px-2 py-[3px]">Furniture</span>
              <span className="rounded-full bg-cream/15 px-2 py-[3px]">Easy</span>
              <span className="flex items-center gap-1 rounded-full bg-cream/15 px-2 py-[3px]">
                <Clock className="h-[10px] w-[10px]" aria-hidden /> 2h
              </span>
            </div>
          </div>

          {/* tabs */}
          <div className="mx-4 mt-4 flex rounded-full bg-sage-soft p-1">
            {(['steps', 'supplies'] as const).map(key => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 rounded-full py-[7px] text-[12px] font-semibold capitalize transition-colors ${
                  tab === key ? 'bg-forest text-cream' : 'text-ink-soft'
                }`}
              >
                {key === 'supplies' ? 'Materials' : 'Steps'}
              </button>
            ))}
          </div>

          {/* content */}
          <div className="mt-3 h-[404px] space-y-2 overflow-hidden px-4">
            {tab === 'steps'
              ? STEPS.map((step, i) => (
                  <motion.button
                    key={step.title}
                    onClick={() => toggle(done, i, setDone)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className="flex w-full gap-3 rounded-2xl border border-line bg-white p-3 text-left"
                  >
                    <span
                      className={`mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                        done.has(i) ? 'bg-forest text-cream' : 'bg-sage-soft text-ink-soft'
                      }`}
                    >
                      {done.has(i) ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold leading-snug text-ink">{step.title}</span>
                      <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-soft">{step.detail}</span>
                      <span className="mt-1.5 flex items-center gap-1 text-[10.5px] font-medium text-forest">
                        <Play className="h-[9px] w-[9px] fill-current" aria-hidden /> Watch at {step.at}
                      </span>
                    </span>
                  </motion.button>
                ))
              : (
                <div className="space-y-4">
                  {[
                    { label: 'To buy', items: MATERIALS, prefix: 'm' },
                    { label: 'Tools you need', items: TOOLS, prefix: 't' }
                  ].map(group => (
                    <div key={group.label} className="space-y-1.5">
                      <p className="text-[10px] font-semibold tracking-[0.06em] text-ink-faint">
                        {group.label.toUpperCase()}
                      </p>
                      {group.items.map((item, i) => {
                        const key = `${group.prefix}${i}`;
                        const on = ticked.has(key);
                        return (
                          <button
                            key={item.name}
                            onClick={() => toggle(ticked, key, setTicked)}
                            className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-left"
                          >
                            <span
                              className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-md border transition-colors ${
                                on ? 'border-forest bg-forest' : 'border-sage-deep bg-transparent'
                              }`}
                            >
                              {on && <Check className="h-3 w-3 text-cream" aria-hidden />}
                            </span>
                            <span
                              className={`flex-1 text-[12.5px] ${on ? 'text-ink-faint line-through' : 'text-ink'}`}
                            >
                              {item.name}
                            </span>
                            <span className="text-[11.5px] font-medium text-ink-soft">{item.qty}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* bottom bar */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-center rounded-full bg-forest py-3 text-[13px] font-semibold text-cream">
            Start build mode
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[12.5px] text-ink-faint">
        Tap the steps and the checklist — it works.
      </p>
    </div>
  );
}

import {
  BookmarkCheck,
  Clapperboard,
  ClipboardList,
  Hammer,
  Link2,
  ListChecks,
  Timer,
  WifiOff
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './motion';

/* ------------------------------------------------------------------ heading */

function Heading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal>
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-forest">{eyebrow}</p>
      <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-soft">{lead}</p>}
    </Reveal>
  );
}

/* -------------------------------------------------------------- how it works */

const STEPS = [
  {
    Icon: Link2,
    title: 'Give it the source',
    body: 'A YouTube link, a written tutorial, a clip off your own phone, or the instructions pasted as text. Whatever you have.'
  },
  {
    Icon: ClipboardList,
    title: 'It reads the whole thing',
    body: 'Subtitles, description and chapters — and on an uploaded clip, the picture too, so a measurement shown on screen but never spoken still lands in the guide.'
  },
  {
    Icon: Hammer,
    title: 'You build',
    body: 'Tick materials off in the shop and steps off at the bench. Jump back to the exact second of the video whenever a step needs seeing rather than reading.'
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <Heading
        eyebrow="How it works"
        title="Three steps, and none of them are yours."
        lead="The work of turning a twenty-minute video into something you can follow at a workbench is the part the app does."
      />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {STEPS.map(({ Icon, title, body }, i) => (
          <StaggerItem key={title}>
            <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft">
                  <Icon className="h-5 w-5 text-forest" aria-hidden />
                </span>
                <span className="font-display text-[28px] leading-none text-sage-deep">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-title text-[20px] font-bold text-ink">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ------------------------------------------------------------------ features */

const FEATURES = [
  {
    Icon: ListChecks,
    title: 'Materials and tools, kept apart',
    body: 'What you need to buy and what you need to own are two different lists, because they are two different questions in a hardware shop.'
  },
  {
    Icon: Clapperboard,
    title: 'Every step knows its timestamp',
    body: 'A step you cannot picture is one tap from the exact second of the original video. Nothing is lost by reading instead of watching.'
  },
  {
    Icon: Timer,
    title: 'Timers for the waiting',
    body: 'Steps that say "leave it four hours" can say it to your phone instead. The alert arrives with the app shut.'
  },
  {
    Icon: WifiOff,
    title: 'Works in a garage with no signal',
    body: 'Saved guides open offline, and your ticked-off steps are still ticked when you come back to them.'
  },
  {
    Icon: BookmarkCheck,
    title: 'A library that remembers',
    body: 'Bookmark what you mean to build. The half-finished one is waiting on the home screen when you come back.'
  },
  {
    Icon: Hammer,
    title: 'A place that grows as you build',
    body: 'Every guide you finish repairs part of a cottage that is yours. Sixteen builds restore it; the garden keeps going after that.'
  }
];

export function Features() {
  return (
    <section id="features" className="border-y border-line bg-parchment/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Heading
          eyebrow="Features"
          title="Built for the bench, not the browser."
          lead="Every one of these exists because of something that goes wrong when you try to build from a video with a phone propped against a paint tin."
        />

        <Stagger className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {FEATURES.map(({ Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-forest">
                  <Icon className="h-[18px] w-[18px] text-cream" aria-hidden />
                </span>
                <div>
                  <h3 className="font-title text-[18px] font-bold text-ink">{title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import Cottage, { type Stages } from './Cottage';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * The part of the app that is not a feature.
 *
 * Every other section here describes something the app does for you. This one
 * is the reason to come back, and it only works if it is shown rather than
 * described — which is why the drawing is the app's own, at three states it can
 * genuinely reach, instead of an illustration of the idea.
 */

const STATES: Array<{ id: string; stages: Stages; caption: string; note: string }> = [
  {
    id: 'ruin',
    stages: { repair: 0, inside: 0, finish: 0, ground: 0 },
    caption: 'Nothing built yet',
    note: 'A roofless shell on bare dirt, with weeds coming out of the wall.'
  },
  {
    // Three repairs rather than two: the shelf the caption mentions is only
    // visible once the window is glazed, and a caption describing something
    // the drawing cannot show is the one mistake this section cannot make.
    id: 'part',
    stages: { repair: 3, inside: 1, finish: 0, ground: 1 },
    caption: 'Five builds in',
    note: 'Walls patched, roof on, windows glazed, a shelf behind them, grass where the dirt was.'
  },
  {
    id: 'done',
    stages: { repair: 4, inside: 4, finish: 4, ground: 4 },
    caption: 'Sixteen builds',
    note: 'Painted, shuttered, lit, planted — and smoke, because somebody lives there.'
  }
];

export default function Place() {
  return (
    <section id="place" className="border-y border-line bg-parchment/60">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-forest">Your place</p>
          <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.015em] text-ink">
            A ruin you put back together by building real things.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-soft">
            The four kinds of project are four parts of one property. Finish every step of a guide and
            the part it belongs to moves up a stage. Nothing here can be bought, skipped or tapped
            into existence: the scene is read from the builds you actually completed, so it can never
            show a repair nobody earned.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.1}>
          {STATES.map(({ id, stages, caption, note }) => (
            <StaggerItem key={id}>
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <Cottage id={id} stages={stages} title={caption} />
                <figcaption className="flex flex-1 flex-col border-t border-line px-6 py-5">
                  <span className="font-title text-[17px] font-bold text-ink">{caption}</span>
                  <span className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{note}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[58ch] text-[14.5px] leading-relaxed text-ink-faint">
            After the sixteenth it keeps going into the yard — birds, a bench, a barrel, a cat on the
            path — so there is always something the next build adds.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

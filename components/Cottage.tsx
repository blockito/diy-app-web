/**
 * The cottage, drawn the way the app draws it.
 *
 * A port of the app's own `src/components/Cottage.js` rather than an
 * illustration of it: the same projection, the same palette, the same rule that
 * every shape is a consequence of a stage number. A picture of the house that
 * the house could not actually reach would be the worst thing on this page.
 *
 * Built in three dimensions rather than drawn as a front elevation. Every point
 * is a real coordinate on the plot — u along the building, v across it, w up —
 * put through one projection, so the volumes stay consistent with each other
 * instead of being separately guessed rectangles.
 */

type Pt = [number, number];

const OX = 178;
const OY = 94;
const SX = 15.5;
const SY = 7.75;
const SZ = 18;

const P = (u: number, v: number, w = 0): Pt => [OX + SX * (u - v), OY + SY * (u + v) - SZ * w];
const r1 = (n: number) => Math.round(n * 10) / 10;
const pt = (p: Pt) => `${r1(p[0])},${r1(p[1])}`;
const poly = (ps: Pt[]) => ps.map(pt).join(' ');
const mix = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const drop = (p: Pt, d: number): Pt => [p[0], p[1] + d];

const C = {
  skyTop: '#eef1ed', skyLow: '#dfe6e0', hill: '#d2dcd2', farTree: '#bacaba',
  grass: '#97b18f', grassEdge: '#7f9b79', dirt: '#b49d82', dirtEdge: '#9c8469',
  soil: '#7d6850', soilDark: '#68563f',
  wallLit: '#f0e8da', wallShade: '#d6cab5', wallBareLit: '#c9c3b5', wallBareShade: '#ada697',
  roofLit: '#6f7c75', roofShade: '#4d5954', roofRidge: '#818e86', roofEdge: '#3d4843',
  stone: '#c3bdaf', stoneShade: '#a59e8f', stoneDark: '#8e877b',
  timber: '#906f4e', timberMid: '#755a3d', timberDark: '#57422c',
  teal: '#4c7972', tealDark: '#3a5f59',
  glass: '#9fbac2', glassPale: '#c3d6da', lamp: '#f5cf78', lampSoft: 'rgba(245,207,120,0.4)',
  leafLight: '#90af86', leafMid: '#6f9068', leafDark: '#587552',
  bloomA: '#d08a8a', bloomB: '#e0c36f', dark: '#39413d',
  contact: 'rgba(52,64,54,0.17)', cast: 'rgba(52,64,54,0.2)',
  smoke: 'rgba(216,222,214,0.95)', weed: '#6b8a5f'
};

const U0 = 0, U1 = 6, V0 = 0, V1 = 4, WALL = 2.2, EAVE = 0.45, RIDGE = 3.5;
const base = { e: P(U1, V0), s: P(U1, V1), w: P(U0, V1) };
const wallTop = { e: P(U1, V0, WALL), s: P(U1, V1, WALL), w: P(U0, V1, WALL) };
const eave = {
  e: P(U1 + EAVE, V0 - EAVE, WALL),
  s: P(U1 + EAVE, V1 + EAVE, WALL),
  w: P(U0 - EAVE, V1 + EAVE, WALL)
};
const ridgeA = P(1.5, (V0 + V1) / 2, RIDGE);
const ridgeB = P(4.5, (V0 + V1) / 2, RIDGE);
const COURSES = [0.1, 0.26, 0.43, 0.61, 0.8];
const PLOT: Pt[] = [P(-3, -3), P(8.2, -3), P(8.2, 8.2), P(-3, 8.2)];
const TUFTS: Array<[number, number]> = [
  [-2.2, 5.6], [-0.9, 6.6], [7.0, 4.8], [7.8, 6.0], [-2.6, 1.4], [7.6, 1.2], [1.4, 7.0], [4.6, 6.8]
];

const face = (u0: number, u1: number, w0: number, w1: number): Pt[] =>
  [P(u0, V1, w0), P(u1, V1, w0), P(u1, V1, w1), P(u0, V1, w1)];
const side = (v0: number, v1: number, w0: number, w1: number): Pt[] =>
  [P(U1, v0, w0), P(U1, v1, w0), P(U1, v1, w1), P(U1, v0, w1)];

const G = (points: Pt[], fill: string, opacity?: number) => ({ points: poly(points), fill, opacity });

export type Stages = { repair: number; inside: number; finish: number; ground: number };

export default function Cottage({ id, stages, title }: { id: string; stages: Stages; title: string }) {
  const { repair, inside, finish, ground } = stages;
  const wallLit = finish >= 1 ? C.wallLit : C.wallBareLit;
  const wallShade = finish >= 1 ? C.wallShade : C.wallBareShade;
  const lit = repair >= 3 && inside >= 3;
  const glow = `url(#glow-${id})`;
  const pane = `url(#pane-${id})`;
  const high = repair >= 2 ? RIDGE : repair >= 1 ? WALL : 1.4;
  const du = 0.5 * high;
  const dv = 0.13 * high;

  return (
    <svg viewBox="0 0 360 240" role="img" aria-label={title} className="h-auto w-full">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.skyTop} />
          <stop offset="1" stopColor={C.skyLow} />
        </linearGradient>
        <linearGradient id={`lawn-${id}`} x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor={ground >= 1 ? C.grass : C.dirt} />
          <stop offset="1" stopColor={ground >= 1 ? C.grassEdge : C.dirtEdge} />
        </linearGradient>
        <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffdc92" />
          <stop offset="1" stopColor="#dda347" />
        </linearGradient>
        <linearGradient id={`pane-${id}`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor={C.glassPale} />
          <stop offset="1" stopColor={C.glass} />
        </linearGradient>
        <linearGradient id={`roofL-${id}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#7a8880" />
          <stop offset="1" stopColor={C.roofLit} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="360" height="240" fill={`url(#sky-${id})`} />
      <path d="M0 148 Q86 110 178 130 Q266 148 360 120 L360 240 L0 240 Z" fill={C.hill} />
      <path
        d="M0 154 L0 140 Q14 120 28 140 Q42 116 56 138 Q68 124 80 142 L80 154 Z
           M290 148 L290 134 Q304 112 318 134 Q330 118 342 136 Q352 126 360 140 L360 148 Z"
        fill={C.farTree}
      />

      {/* the plot, given a visible thickness so it reads as ground you could
          walk onto rather than as a band behind the house */}
      <polygon {...G(PLOT, `url(#lawn-${id})`)} />
      <polygon {...G([PLOT[3], PLOT[2], drop(PLOT[2], 14), drop(PLOT[3], 14)], ground >= 1 ? C.soil : C.dirtEdge)} />
      <polygon {...G([PLOT[1], PLOT[2], drop(PLOT[2], 14), drop(PLOT[1], 14)], C.soilDark)} />
      <polygon {...G([PLOT[0], PLOT[3], drop(PLOT[3], 14), drop(PLOT[0], 14)], C.soilDark, 0.55)} />

      {ground >= 1 && (
        <g stroke={C.grassEdge} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85">
          {TUFTS.map(([u, v], i) => {
            const [x, y] = P(u, v);
            return (
              <g key={i}>
                <path d={`M${r1(x)} ${r1(y)} q-2.5 -6 -0.5 -9.5`} />
                <path d={`M${r1(x + 3.5)} ${r1(y)} q2.5 -6.5 5.5 -8`} />
              </g>
            );
          })}
        </g>
      )}

      {/* the building's own outline thrown along the light: a ruin casts a short
          shadow and a roofed cottage a long one */}
      <polygon
        {...G(
          [P(U0, V0), P(U1, V0), P(U1 + du, V0 + dv), P(U1 + du, V1 + dv), P(U0 + du, V1 + dv), P(U0, V1)],
          C.cast
        )}
      />

      {ground >= 2 &&
        [0, 1, 2, 3, 4].map(i => {
          const v = 4.7 + i * 0.62;
          return (
            <g key={i}>
              <polygon {...G([P(3.7, v), P(4.85, v), P(4.85, v + 0.42), P(3.7, v + 0.42)], C.stone)} />
              <polygon {...G([P(3.7, v + 0.42), P(4.85, v + 0.42), P(4.85, v + 0.46), P(3.7, v + 0.46)], C.stoneShade)} />
            </g>
          );
        })}

      {/* until there is a roof the far walls are seen from inside, which is what
          makes a roofless building read as a shell rather than a solid block */}
      {repair < 2 && (
        <g>
          <polygon {...G([P(U0, V0, 0.32), P(U1, V0, 0.32), P(U1, V1, 0.32), P(U0, V1, 0.32)], C.stoneShade)} />
          <polygon
            {...G(
              repair >= 1
                ? [P(U0, V0, 0.32), P(U1, V0, 0.32), P(U1, V0, WALL), P(U0, V0, WALL)]
                : [P(U0, V0, 0.32), P(U1, V0, 0.32), P(U1, V0, 1.3), P(4.6, V0, 1.62),
                   P(3.4, V0, 1.0), P(2.3, V0, 1.5), P(1.2, V0, 0.9), P(U0, V0, 1.4)],
              C.wallBareShade, 0.9
            )}
          />
          <polygon
            {...G(
              repair >= 1
                ? [P(U0, V0, 0.32), P(U0, V1, 0.32), P(U0, V1, WALL), P(U0, V0, WALL)]
                : [P(U0, V0, 0.32), P(U0, V1, 0.32), P(U0, V1, 1.26), P(U0, 2.6, 1.6),
                   P(U0, 1.4, 0.95), P(U0, V0, 1.4)],
              C.wallBareLit, 0.75
            )}
          />
        </g>
      )}

      <polygon {...G([base.w, base.s, wallTop.s, wallTop.w], C.stone)} />
      <polygon {...G([base.s, base.e, wallTop.e, wallTop.s], C.stoneShade)} />

      {repair >= 1 ? (
        <g>
          <polygon {...G([P(U0, V1, 0.32), P(U1, V1, 0.32), wallTop.s, wallTop.w], wallLit)} />
          <polygon {...G([P(U1, V1, 0.32), P(U1, V0, 0.32), wallTop.e, wallTop.s], wallShade)} />
          <polygon {...G([P(U1 - 0.12, V1, 0.32), P(U1, V1, 0.32), wallTop.s, P(U1 - 0.12, V1, WALL)], '#fff', 0.22)} />
        </g>
      ) : (
        <g>
          <polygon
            {...G([P(U0, V1, 0.32), P(U1, V1, 0.32), P(U1, V1, 1.15), P(5.1, V1, 1.52),
                   P(4.2, V1, 0.92), P(3.1, V1, 1.36), P(2.2, V1, 0.82), P(1.1, V1, 1.6), P(U0, V1, 1.26)],
                  C.wallBareLit)}
          />
          <polygon
            {...G([P(U1, V1, 0.32), P(U1, V0, 0.32), P(U1, V0, 1.48), P(U1, 1.2, 0.96),
                   P(U1, 2.4, 1.44), P(U1, 3.2, 0.86), P(U1, V1, 1.15)], C.wallBareShade)}
          />
          {[0.62, 0.88, 1.14].map(w => (
            <polygon key={w} {...G(face(U0, U1, w, w + 0.035), C.wallBareShade, 0.5)} />
          ))}
          <polygon
            {...G([P(U0, V1, 1.26), P(1.1, V1, 1.6), P(2.2, V1, 0.82), P(3.1, V1, 1.36),
                   P(4.2, V1, 0.92), P(5.1, V1, 1.52), P(U1, V1, 1.15),
                   P(U1, 3.82, 1.15), P(5.1, 3.82, 1.52), P(4.2, 3.82, 0.92), P(3.1, 3.82, 1.36),
                   P(2.2, 3.82, 0.82), P(1.1, 3.82, 1.6), P(U0, 3.82, 1.26)], C.stone)}
          />
          <polygon {...G(face(3.7, 4.8, 0.32, 1.06), C.dark, 0.82)} />
          <polygon {...G([P(0.7, 3.4, 0.32), P(1.2, 3.6, 0.32), P(4.9, 0.8, 1.15), P(4.5, 0.6, 1.15)], C.timberMid)} />
          <polygon {...G([P(0.7, 3.4, 0.32), P(1.2, 3.6, 0.32), P(4.9, 0.8, 1.05), P(4.5, 0.6, 1.05)], C.timberDark, 0.5)} />
          {([[7.5, 5.2], [-1.5, 4.5], [2.6, 6.2]] as Array<[number, number]>).map(([u, v], i) => {
            const [x, y] = P(u, v);
            return (
              <g key={i}>
                <polygon points={`${r1(x - 8)},${r1(y)} ${r1(x - 1)},${r1(y - 6)} ${r1(x + 8)},${r1(y - 1)} ${r1(x + 1)},${r1(y + 5)}`} fill={C.stone} />
                <polygon points={`${r1(x + 1)},${r1(y + 5)} ${r1(x + 8)},${r1(y - 1)} ${r1(x + 8)},${r1(y + 2)} ${r1(x + 1)},${r1(y + 8)}`} fill={C.stoneShade} />
                <polygon points={`${r1(x - 8)},${r1(y)} ${r1(x + 1)},${r1(y + 5)} ${r1(x + 1)},${r1(y + 8)} ${r1(x - 8)},${r1(y + 3)}`} fill={C.stoneDark} />
              </g>
            );
          })}
          {/* something growing out of the wall head says abandoned more cheaply
              than any amount of extra rubble */}
          <g stroke={C.weed} strokeWidth="1.2" fill="none" strokeLinecap="round">
            {([[1.1, 1.6], [2.2, 0.82], [3.1, 1.36], [5.1, 1.52]] as Array<[number, number]>).map(([u, w], i) => {
              const [x, y] = P(u, V1, w);
              return (
                <g key={u}>
                  <path d={`M${r1(x)} ${r1(y)} q${i % 2 ? -2.5 : 2.5} -5 ${i % 2 ? -0.5 : 0.5} -8.5`} />
                  <path d={`M${r1(x + 2)} ${r1(y + 1)} q2 -4 4 -5.5`} />
                </g>
              );
            })}
          </g>
        </g>
      )}

      {repair >= 1 && (
        <g>
          <polygon {...G(face(1.1, 2.7, 0.85, 1.75), C.dark)} />
          {/* the reveal: two thin faces of the wall's own thickness, which is
              what gives the opening depth instead of printing it on */}
          <polygon {...G([P(1.1, V1, 0.85), P(1.1, V1, 1.75), P(1.24, 3.86, 1.72), P(1.24, 3.86, 0.88)], wallShade)} />
          <polygon {...G([P(1.1, V1, 1.75), P(2.7, V1, 1.75), P(2.56, 3.86, 1.72), P(1.24, 3.86, 1.72)], C.stoneDark, 0.55)} />

          {repair >= 3 && (
            <g>
              <polygon points={poly([P(1.24, 3.86, 0.88), P(2.56, 3.86, 0.88), P(2.56, 3.86, 1.72), P(1.24, 3.86, 1.72)])} fill={lit ? glow : pane} />
              {inside >= 1 && <polygon {...G([P(1.35, 3.86, 1.3), P(1.95, 3.86, 1.3), P(1.95, 3.86, 1.38), P(1.35, 3.86, 1.38)], C.timberDark)} />}
              {inside >= 2 && <polygon {...G([P(2.05, 3.86, 1.04), P(2.45, 3.86, 1.04), P(2.45, 3.86, 1.12), P(2.05, 3.86, 1.12)], C.timberDark)} />}
              {inside >= 4 && <polygon {...G([P(1.5, 3.86, 1.04), P(1.74, 3.86, 1.04), P(1.74, 3.86, 1.26), P(1.5, 3.86, 1.26)], C.lamp)} />}
              <polygon {...G([P(1.86, 3.86, 0.88), P(1.94, 3.86, 0.88), P(1.94, 3.86, 1.72), P(1.86, 3.86, 1.72)], wallLit)} />
              <polygon {...G([P(1.24, 3.86, 1.26), P(2.56, 3.86, 1.26), P(2.56, 3.86, 1.32), P(1.24, 3.86, 1.32)], wallLit)} />
            </g>
          )}

          <polygon {...G(face(1.02, 2.78, 1.75, 1.87), C.timber)} />
          <polygon {...G(face(1.02, 1.1, 0.78, 1.87), C.timber)} />
          <polygon {...G(face(2.7, 2.78, 0.78, 1.87), C.timberMid)} />
          <polygon {...G([P(0.95, V1, 0.78), P(2.85, V1, 0.78), P(2.85, 4.3, 0.72), P(0.95, 4.3, 0.72)], C.timber)} />
          <polygon {...G([P(0.95, 4.3, 0.72), P(2.85, 4.3, 0.72), P(2.85, 4.3, 0.62), P(0.95, 4.3, 0.62)], C.timberMid)} />
        </g>
      )}

      {repair >= 3 && (
        <g>
          <polygon {...G(side(1.2, 2.5, 0.9, 1.7), C.dark)} />
          <polygon points={poly(side(1.32, 2.38, 0.96, 1.62))} fill={lit ? glow : C.glass} />
          <polygon {...G(side(1.81, 1.89, 0.96, 1.62), wallShade)} />
          <polygon {...G(side(1.14, 2.56, 1.7, 1.8), C.timberMid)} />
        </g>
      )}

      {repair >= 1 && (
        <g>
          <polygon {...G(face(3.7, 4.8, 0, 1.5), C.dark)} />
          <polygon {...G([P(3.7, V1, 0), P(3.7, V1, 1.5), P(3.82, 3.88, 1.47), P(3.82, 3.88, 0)], wallShade)} />
          {repair >= 4 && (
            <g>
              <polygon {...G([P(3.82, 3.88, 0), P(4.7, 3.88, 0), P(4.7, 3.88, 1.44), P(3.82, 3.88, 1.44)], C.timberMid)} />
              {[4.02, 4.2, 4.38, 4.56].map(u => (
                <polygon key={u} {...G([P(u, 3.88, 0.04), P(u + 0.035, 3.88, 0.04), P(u + 0.035, 3.88, 1.42), P(u, 3.88, 1.42)], C.timberDark, 0.5)} />
              ))}
              <polygon {...G([P(3.94, 3.88, 0.74), P(4.58, 3.88, 0.74), P(4.58, 3.88, 0.82), P(3.94, 3.88, 0.82)], C.timberDark, 0.45)} />
              <circle cx={r1(P(4.54, 3.88, 0.66)[0])} cy={r1(P(4.54, 3.88, 0.66)[1])} r="2.4" fill={C.lamp} />
            </g>
          )}
          <polygon {...G(face(3.6, 4.9, 1.5, 1.62), C.timber)} />
          <polygon {...G([P(3.58, V1, 0.2), P(4.92, V1, 0.2), P(4.92, 4.6, 0.2), P(3.58, 4.6, 0.2)], C.stone)} />
          <polygon {...G([P(3.58, 4.6, 0.2), P(4.92, 4.6, 0.2), P(4.92, 4.6, 0), P(3.58, 4.6, 0)], C.stoneShade)} />
        </g>
      )}

      {repair >= 2 && (
        <g>
          <polygon {...G([eave.w, eave.s, drop(eave.s, 4.5), drop(eave.w, 4.5)], C.roofEdge)} />
          <polygon {...G([eave.s, eave.e, drop(eave.e, 4.5), drop(eave.s, 4.5)], '#333d38')} />
          <polygon points={poly([eave.w, eave.s, ridgeB, ridgeA])} fill={`url(#roofL-${id})`} />
          <polygon {...G([eave.s, eave.e, ridgeB], C.roofShade)} />
          {COURSES.map(t => (
            <polygon key={t} {...G([mix(eave.w, ridgeA, t), mix(eave.s, ridgeB, t), mix(eave.s, ridgeB, t + 0.028), mix(eave.w, ridgeA, t + 0.028)], C.roofShade, 0.32)} />
          ))}
          {COURSES.map(t => (
            <polygon key={`h${t}`} {...G([mix(eave.s, ridgeB, t), mix(eave.e, ridgeB, t), mix(eave.e, ridgeB, t + 0.028), mix(eave.s, ridgeB, t + 0.028)], C.roofEdge, 0.34)} />
          ))}
          <polygon {...G([ridgeA, ridgeB, drop(ridgeB, 3.6), drop(ridgeA, 3.6)], C.roofRidge)} />

          <polygon {...G([P(1.5, 1.0, 2.7), P(2.2, 1.0, 2.7), P(2.2, 1.0, 4.15), P(1.5, 1.0, 4.15)], C.stone)} />
          <polygon {...G([P(2.2, 1.0, 2.7), P(2.2, 1.8, 2.7), P(2.2, 1.8, 4.15), P(2.2, 1.0, 4.15)], C.stoneShade)} />
          <polygon {...G([P(1.42, 0.92, 4.15), P(2.28, 0.92, 4.15), P(2.28, 1.88, 4.15), P(1.42, 1.88, 4.15)], C.stoneDark)} />

          {/* smoke is the one mark that says somebody is in there */}
          {lit &&
            ([[0, -6, 4.5, 0.5], [5, -16, 6.5, 0.38], [13, -27, 8.5, 0.26], [24, -37, 10.5, 0.15]] as Array<
              [number, number, number, number]
            >).map(([dx, dy, r, o]) => {
              const [x, y] = P(1.85, 1.4, 4.15);
              return <circle key={dx} cx={r1(x + dx)} cy={r1(y + dy)} r={r} fill={C.smoke} opacity={o} />;
            })}
        </g>
      )}

      {finish >= 2 && (
        <g>
          <polygon {...G(face(0.76, 1.02, 0.82, 1.8), C.teal)} />
          <polygon {...G(face(2.78, 3.04, 0.82, 1.8), C.tealDark)} />
          {[0.98, 1.18, 1.38, 1.58].map(w => (
            <g key={w}>
              <polygon {...G(face(0.78, 1.0, w, w + 0.05), C.tealDark, 0.55)} />
              <polygon {...G(face(2.8, 3.02, w, w + 0.05), C.teal, 0.45)} />
            </g>
          ))}
        </g>
      )}

      {finish >= 3 && (
        <g>
          <polygon {...G([P(1.1, V1, 0.56), P(2.7, V1, 0.56), P(2.7, 4.55, 0.5), P(1.1, 4.55, 0.5)], C.timber)} />
          <polygon {...G([P(1.1, 4.55, 0.5), P(2.7, 4.55, 0.5), P(2.7, 4.55, 0.76), P(1.1, 4.55, 0.76)], C.timberMid)} />
          {[1.25, 1.6, 1.95, 2.3, 2.58].map((u, i) => {
            const [x, y] = P(u, 4.5, 0.78);
            return (
              <g key={u}>
                <path d={`M${r1(x)} ${r1(y)} q-1 -5 1 -7`} stroke={C.leafDark} strokeWidth="1.3" fill="none" />
                <circle cx={r1(x + 1)} cy={r1(y - 8)} r="3.4" fill={i % 2 ? C.bloomA : C.bloomB} />
              </g>
            );
          })}
        </g>
      )}

      {finish >= 4 && (
        <g>
          <path d={`M${pt(eave.w)} Q${pt(drop(mix(eave.w, eave.s, 0.5), 17))} ${pt(eave.s)}`} stroke={C.timberDark} strokeWidth="1.2" fill="none" />
          {[0.16, 0.37, 0.6, 0.82].map(t => {
            const [x, y] = mix(eave.w, eave.s, t);
            const sag = 17 * Math.sin(Math.PI * t);
            return (
              <g key={t}>
                <circle cx={r1(x)} cy={r1(y + sag + 6)} r="6" fill={C.lampSoft} />
                <circle cx={r1(x)} cy={r1(y + sag + 6)} r="3.2" fill={C.lamp} />
              </g>
            );
          })}
        </g>
      )}

      {ground >= 3 &&
        ([[-2.0, 5.8], [-0.8, 6.6], [0.4, 7.2], [7.2, 4.6], [7.8, 5.6], [6.6, 6.4]] as Array<[number, number]>).map(
          ([u, v], i) => {
            const [x, y] = P(u, v);
            return (
              <g key={i}>
                <path d={`M${r1(x)} ${r1(y)} q-1.5 -7 0.5 -10`} stroke={C.leafDark} strokeWidth="1.4" fill="none" />
                <circle cx={r1(x + 0.5)} cy={r1(y - 11)} r="4" fill={i % 2 ? C.bloomA : C.bloomB} />
                <circle cx={r1(x + 0.5)} cy={r1(y - 11)} r="1.6" fill={C.timberMid} />
              </g>
            );
          }
        )}

      {ground >= 4 && (() => {
        const [x, y] = P(7.2, 1.4);
        return (
          <g>
            <ellipse cx={r1(x)} cy={r1(y + 2)} rx="24" ry="8" fill={C.contact} />
            <polygon points={`${r1(x - 4)},${r1(y)} ${r1(x + 4)},${r1(y)} ${r1(x + 3)},${r1(y - 42)} ${r1(x - 3)},${r1(y - 42)}`} fill={C.timberMid} />
            <polygon points={`${r1(x + 1)},${r1(y)} ${r1(x + 4)},${r1(y)} ${r1(x + 3)},${r1(y - 42)} ${r1(x + 1)},${r1(y - 42)}`} fill={C.timberDark} />
            <path d={`M${r1(x + 2)} ${r1(y - 28)} l14 -11 l2 3 l-15 12 Z`} fill={C.timberMid} />
            <path d={`M${r1(x)} ${r1(y - 36)} q-31 -2 -31 -27 q0 -23 25 -26 q10 -19 33 -9 q25 -6 28 19 q11 15 -7 32 q-19 17 -48 11 Z`} fill={C.leafMid} />
            <path d={`M${r1(x + 15)} ${r1(y - 47)} q25 -6 28 19 q-2 15 -15 22 q11 -21 -13 -41 Z`} fill={C.leafDark} />
            <path d={`M${r1(x - 19)} ${r1(y - 69)} q11 -17 29 -14 q-17 5 -22 19 Z`} fill={C.leafLight} />
            <path d={`M${r1(x - 27)} ${r1(y - 48)} q-6 -15 6 -23 q-4 13 2 22 Z`} fill={C.leafLight} opacity="0.75" />
          </g>
        );
      })()}
    </svg>
  );
}

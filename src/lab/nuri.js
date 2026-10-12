/* Nuri — a melted blob with cat ears, a tail and two tall oval eyes.

   Drawn in a 200×200 box as one-colour paths. To change her, replace
   FILL / CUT below; nothing else needs to change. Eyes are cut-outs: the
   dots avoid them, which is what makes the face readable at ~300 dots. */

export const FILL = [
  // body + ears
  "M26 176 C6 176 2 158 14 148 C28 138 30 122 32 104 C34 86 40 68 50 56 C47 42 50 29 57 28 C64 28 72 38 78 45 C90 41 102 41 114 45 C120 37 128 28 135 28 C142 29 143 43 140 56 C152 68 158 88 160 106 C162 124 166 138 178 148 C188 158 184 176 166 176 C120 181 66 181 26 176 Z",
  // tail
  "M154 130 C170 128 179 114 177 96 C176 86 191 84 191 95 C193 120 178 140 158 142 Z",
];

// eyes — tall ovals, like a zero
export const EYES = [
  { cx: 78, cy: 114, rx: 6.5, ry: 11 },
  { cx: 118, cy: 114, rx: 6.5, ry: 11 },
];

const CUT = EYES.map((e) => `M${e.cx} ${e.cy} m-${e.rx} 0 a${e.rx} ${e.ry} 0 1 0 ${e.rx * 2} 0 a${e.rx} ${e.ry} 0 1 0 -${e.rx * 2} 0`);

const BOX = 200;
const AXIS = 98; // x half-way between her eyes, in the box: the dots mirror about it
const RES = 384;
const RELAX = 80;

function mask() {
  const c = document.createElement("canvas");
  c.width = c.height = RES;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.scale(RES / BOX, RES / BOX);
  g.fillStyle = "#000";
  FILL.forEach((d) => g.fill(new Path2D(d)));
  g.globalCompositeOperation = "destination-out";
  CUT.forEach((d) => g.fill(new Path2D(d)));
  const data = g.getImageData(0, 0, RES, RES).data;
  const m = new Uint8Array(RES * RES);
  for (let i = 0; i < m.length; i++) m[i] = data[i * 4 + 3] > 128 ? 1 : 0;
  return m;
}

/* Dots start on a hex grid and are then relaxed (Lloyd): each one moves to
   the centre of the patch of silhouette it is closest to. That evens the
   spacing out and makes the outer rows follow the outline, so the edge reads
   as a smooth curve instead of a staircase with strays. */
function relax(count) {
  const m = mask();
  const inside = (x, y) => x >= 0 && y >= 0 && x < RES && y < RES && m[(y | 0) * RES + (x | 0)] === 1;

  let area = 0;
  for (let i = 0; i < m.length; i++) area += m[i];
  const step = Math.sqrt(area / count);

  // an exact hex lattice, mirrored about her middle so both halves match;
  // relaxing then only has to bend the rows near the outline and the eyes
  const px = [];
  const py = [];
  const row = step * 0.93;
  const col = step * 1.075;
  const mid = (AXIS / BOX) * RES;
  for (let y = row / 2, r = 0; y < RES; y += row, r++) {
    const shift = r % 2 ? col / 2 : 0;
    for (let x = mid + shift - Math.ceil(mid / col) * col; x < RES; x += col) {
      if (inside(x, y)) px.push(x), py.push(y);
    }
  }

  const n = px.length;
  const best = new Float32Array(RES * RES);
  const sx = new Float64Array(n);
  const sy = new Float64Array(n);
  const sw = new Uint32Array(n);
  const owner = new Int32Array(RES * RES);
  const reach = Math.ceil(step * 1.8);

  for (let it = 0; it < RELAX; it++) {
    best.fill(Infinity);
    owner.fill(-1);
    for (let i = 0; i < n; i++) {
      const x0 = Math.max(0, (px[i] | 0) - reach);
      const x1 = Math.min(RES - 1, (px[i] | 0) + reach);
      const y0 = Math.max(0, (py[i] | 0) - reach);
      const y1 = Math.min(RES - 1, (py[i] | 0) + reach);
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const k = y * RES + x;
          if (!m[k]) continue;
          const d = (x + 0.5 - px[i]) ** 2 + (y + 0.5 - py[i]) ** 2;
          if (d < best[k]) (best[k] = d), (owner[k] = i);
        }
      }
    }
    sx.fill(0), sy.fill(0), sw.fill(0);
    for (let k = 0; k < owner.length; k++) {
      const i = owner[k];
      if (i < 0) continue;
      sx[i] += (k % RES) + 0.5;
      sy[i] += ((k / RES) | 0) + 0.5;
      sw[i]++;
    }
    for (let i = 0; i < n; i++) {
      if (!sw[i]) continue;
      let cx = sx[i] / sw[i];
      let cy = sy[i] / sw[i];
      // a centroid can land in an eye or outside a thin tail: walk it back
      for (let t = 0; t < 8 && !inside(cx, cy); t++) {
        cx = (cx + px[i]) / 2;
        cy = (cy + py[i]) / 2;
      }
      if (inside(cx, cy)) (px[i] = cx), (py[i] = cy);
    }
  }

  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    out[i * 2] = px[i] / RES - 0.5;
    out[i * 2 + 1] = 0.5 - py[i] / RES;
  }
  return { pts: out, spacing: step / RES };
}

const cache = new Map();

/* Returns Float32Array [x0, y0, x1, y1, …] of ~count points inside the
   silhouette, centred on 0,0, `size` px across, y up. */
export function sampleShape(count, size) {
  if (!cache.has(count)) cache.set(count, relax(count));
  return cache.get(count).pts.map((v) => v * size);
}

/* Distance between neighbouring dots for the same call to sampleShape, so
   the dots can be sized to read as one solid figure at any count. */
export function shapeSpacing(count, size) {
  if (!cache.has(count)) cache.set(count, relax(count));
  return cache.get(count).spacing * size;
}

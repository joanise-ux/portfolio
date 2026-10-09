/* Nuri — PLACEHOLDER silhouette.

   A rough blob with ears, a tail and two eyes, drawn in a 200×200 box. When
   the real Nuri is drawn, export her as one-colour SVG paths and replace
   FILL / CUT below; nothing else needs to change. Eyes are cut-outs: the
   dots avoid them, which is what makes the face readable at ~300 dots. */

const FILL = [
  // body
  "M100 44 C152 44 176 82 174 122 C172 166 138 188 100 188 C60 188 26 166 26 122 C26 82 50 44 100 44 Z",
  // ears
  "M48 64 C40 40 56 22 76 30 C86 34 88 44 84 52 Z",
  "M152 64 C160 40 144 22 124 30 C114 34 112 44 116 52 Z",
  // tail
  "M160 150 C178 156 194 146 192 128 C200 136 204 160 186 170 C176 176 164 172 156 166 Z",
];

const CUT = [
  // eyes
  "M80 112 m-10 0 a10 12 0 1 0 20 0 a10 12 0 1 0 -20 0",
  "M120 112 m-10 0 a10 12 0 1 0 20 0 a10 12 0 1 0 -20 0",
];

const BOX = 200;

/* Returns Float32Array [x0, y0, x1, y1, …] of ~count points inside the
   silhouette, centred on 0,0, `size` px across, y up. Points sit on a
   jittered grid so even a small count covers the shape evenly. */
export function sampleShape(count, size) {
  const res = 256;
  const c = document.createElement("canvas");
  c.width = c.height = res;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.scale(res / BOX, res / BOX);
  g.fillStyle = "#000";
  FILL.forEach((d) => g.fill(new Path2D(d)));
  g.globalCompositeOperation = "destination-out";
  CUT.forEach((d) => g.fill(new Path2D(d)));

  const data = g.getImageData(0, 0, res, res).data;
  const inside = (x, y) => {
    const xi = Math.min(res - 1, Math.max(0, Math.round(x)));
    const yi = Math.min(res - 1, Math.max(0, Math.round(y)));
    return data[(yi * res + xi) * 4 + 3] > 128;
  };

  let area = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) area++;

  const step = Math.sqrt(area / count);
  const pts = [];
  for (let y = step / 2; y < res; y += step) {
    for (let x = step / 2; x < res; x += step) {
      const jx = x + (Math.random() - 0.5) * step * 0.5;
      const jy = y + (Math.random() - 0.5) * step * 0.5;
      if (inside(jx, jy)) pts.push(jx, jy);
    }
  }

  const k = size / res;
  const out = new Float32Array(pts.length);
  for (let i = 0; i < pts.length; i += 2) {
    out[i] = (pts[i] - res / 2) * k;
    out[i + 1] = -(pts[i + 1] - res / 2) * k;
  }
  return out;
}

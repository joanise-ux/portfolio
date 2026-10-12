/* Placeholder content for the project wall: flat-colour cards standing in for
   the five planned projects, as drawn in design/v2/Strona główna.dc.html.
   Real shots replace `makeTexture` later — the layouts only care about
   `aspect` and a texture. */

import * as THREE from "three";
import { tr } from "./i18n.js";

export const PROJECTS = [
  { key: "nf", name: "Nature Future", cat: "web", year: 2026, bg: "#3a4034" },
  { key: "nr", name: tr({ pl: "Nieruchomości", en: "Real Estate" }), cat: "web", year: 2026, bg: "#3b3833" },
  { key: "ka", name: tr({ pl: "Kancelaria", en: "Law Firm" }), cat: "branding", year: 2024, bg: "#32363a" },
  { key: "kw", name: tr({ pl: "Kawiarnia", en: "Café" }), cat: "rebranding", year: 2024, bg: "#46372b" },
  { key: "tr", name: tr({ pl: "Tracker seriali", en: "Series Tracker" }), cat: tr({ pl: "aplikacja mobilna", en: "mobile app" }), year: 2026, bg: "#3a3532" },
];

/* Card formats from the design, in px on the 1440×900 frame. */
export const SHAPES = { H: [600, 400], S: [440, 440], V: [340, 450] };

/* Per project: [shape, x and y of the soft shape inside the card]. The first
   two of each are the ten cards on the orbit; the rest only fill the wall. */
const SHOTS = {
  nf: [["H", 0.62, 0.45], ["S", 0.38, 0.42], ["V", 0.5, 0.55], ["H", 0.4, 0.5]],
  nr: [["V", 0.45, 0.36], ["H", 0.6, 0.5], ["S", 0.55, 0.5], ["V", 0.5, 0.6]],
  ka: [["S", 0.5, 0.5], ["V", 0.5, 0.4], ["H", 0.45, 0.5], ["S", 0.4, 0.55]],
  kw: [["V", 0.5, 0.6], ["H", 0.42, 0.5], ["S", 0.6, 0.45], ["V", 0.45, 0.4]],
  tr: [["V", 0.5, 0.46], ["S", 0.5, 0.48], ["V", 0.5, 0.5], ["H", 0.55, 0.5]],
};

const INK = "243,235,221";

function makeTexture(project, index, [shape, ox, oy]) {
  const k = 2; // texture px per design px
  const [dw, dh] = SHAPES[shape];
  const w = dw * k;
  const h = dh * k;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");

  g.fillStyle = project.bg;
  g.fillRect(0, 0, w, h);

  // a soft shape so motion and blur are readable on a flat card
  g.fillStyle = `rgba(${INK},0.08)`;
  const m = Math.min(w, h);
  g.beginPath();
  if (project.key === "tr") {
    const pw = m * 0.32;
    const ph = Math.min(pw * 1.9, h * 0.72);
    g.roundRect(ox * w - pw / 2, oy * h - ph / 2, pw, ph, 14 * k);
  } else {
    g.arc(ox * w, oy * h, m * 0.25, 0, Math.PI * 2);
  }
  g.fill();

  g.fillStyle = `rgb(${INK})`;
  g.font = `500 ${14 * k}px Outfit, system-ui, sans-serif`;
  g.fillText(`${project.name.toLowerCase()} · 0${index + 1}`, 20 * k, h - 20 * k);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* One entry per shot: { project, shape, spot, aspect, texture }, grouped by
   project in the order above. `spot` is where the soft shape sits, so the
   case study hero can draw the same card in CSS. */
export function buildShots() {
  const shots = [];
  PROJECTS.forEach((p) => {
    SHOTS[p.key].forEach((spec, i) => {
      const [dw, dh] = SHAPES[spec[0]];
      shots.push({ project: p, shape: spec[0], spot: [spec[1], spec[2]], aspect: dw / dh, texture: makeTexture(p, i, spec) });
    });
  });
  return shots;
}

/* The same card drawn in the DOM (case study hero, list thumbnail): the
   style goes on a box with `container-type: size`, the spot inside it. */
export const cardStyle = (s) => `style="--card:${s.project.bg};--spot-x:${s.spot[0] * 100}%;--spot-y:${s.spot[1] * 100}%"`;
export const cardSpot = (s) => `<i class="card-spot${s.project.key === "tr" ? " card-spot--phone" : ""}"></i>`;

/* Deterministic shuffle, so the wall never puts a project's shots side by
   side and still looks the same on every load. */
export function shuffled(list, seed = 7) {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

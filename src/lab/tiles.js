/* Placeholder content for the motion lab: grey tiles standing in for the
   five planned projects. Real shots replace `makeTexture` later — the canvas
   only cares about `aspect` and a texture. */

import * as THREE from "three";

export const PROJECTS = [
  { key: "nf", name: "Nature Future", cat: "web" },
  { key: "estate", name: "Nieruchomości", cat: "web" },
  { key: "law", name: "Kancelaria", cat: "branding" },
  { key: "cafe", name: "Kawiarnia", cat: "branding" },
  { key: "series", name: "Tracker seriali", cat: "aplikacja mobilna" },
];

const ASPECTS = [3 / 4, 4 / 5, 1, 4 / 3, 16 / 10, 9 / 14];
const SHOTS_PER_PROJECT = 4;

/* Deterministic pseudo-random so the layout is the same on every load. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTexture(project, index, aspect, rand) {
  const long = 640;
  const w = aspect >= 1 ? long : Math.round(long * aspect);
  const h = aspect >= 1 ? Math.round(long / aspect) : long;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");

  const tone = 38 + Math.floor(rand() * 34);
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, `rgb(${tone + 10},${tone + 7},${tone + 4})`);
  grad.addColorStop(1, `rgb(${tone - 8},${tone - 9},${tone - 10})`);
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);

  // a soft shape so motion and distortion are readable on a grey tile
  g.globalAlpha = 0.16;
  g.fillStyle = "#f1eadf";
  const r = Math.min(w, h) * (0.18 + rand() * 0.22);
  g.beginPath();
  g.arc(w * (0.3 + rand() * 0.4), h * (0.3 + rand() * 0.4), r, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;

  g.fillStyle = "rgba(241,234,223,0.7)";
  g.font = `500 ${Math.round(long * 0.034)}px Outfit, system-ui, sans-serif`;
  g.fillText(`${project.key} · 0${index + 1}`, w * 0.06, h - w * 0.06);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* One entry per shot: { project, aspect, texture }. Order is shuffled so the
   same project's shots don't sit next to each other on the canvas. */
export function buildShots() {
  const rand = rng(7);
  const shots = [];
  PROJECTS.forEach((p) => {
    for (let i = 0; i < SHOTS_PER_PROJECT; i++) {
      const aspect = ASPECTS[Math.floor(rand() * ASPECTS.length)];
      shots.push({ project: p, aspect, texture: makeTexture(p, i, aspect, rand) });
    }
  });
  for (let i = shots.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shots[i], shots[j]] = [shots[j], shots[i]];
  }
  return shots;
}

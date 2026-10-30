/* Walker — Nuri in dots on the About page, where the portrait used to be.

   Each section has a perch (an empty .about__perch box the CSS places). She
   sits on the perch of the section in the middle of the screen; scroll on
   and she hops over to the next one, her dots trailing apart while she
   moves and settling back into her shape when she lands. Opening the page
   she gathers out of loose dots, like the intro.

   Positions are in the page's content, not the screen: while you read a
   section she stays put on it and only travels when the section changes. */

import { sampleShape, shapeSpacing } from "./nuri.js";

const NS = "http://www.w3.org/2000/svg";
const COUNT = 320; // the same Nuri as the phone intro
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export class Walker {
  /* `about` is the .about column that holds the perches; she is put in it. */
  constructor({ about, label, reducedMotion }) {
    this.about = about;
    this.scroller = about.closest(".page");
    this.reduced = reducedMotion;
    this.perches = [...about.querySelectorAll(".about__perch")];
    this.pos = null; // { x, y, size } of her box, base at the bottom
    this.perch = null;
    this.from = null;
    this.spread = 0;
    this.time = 0;
    this.raf = 0;

    // dot positions with the base at y = 0 and the box 1 wide, so the CSS
    // box can scale her to any perch
    const pts = sampleShape(COUNT, 1);
    const r = shapeSpacing(COUNT, 1) * 0.45;
    let low = -Infinity;
    for (let i = 1; i < pts.length; i += 2) low = Math.max(low, -pts[i]);
    this.dots = [];
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "-0.5 -1 1 1");
    for (let i = 0; i < pts.length; i += 2) {
      const c = document.createElementNS(NS, "circle");
      const x = pts[i];
      const y = -pts[i + 1] - low - r;
      const a = Math.random() * Math.PI * 2;
      const d = 0.25 + Math.random() * 0.75;
      c.setAttribute("r", r.toFixed(4));
      svg.appendChild(c);
      this.dots.push({ c, x, y, dx: Math.cos(a) * d, dy: Math.sin(a) * d * 0.6 });
    }
    this.el = document.createElement("div");
    this.el.className = "about__nuri";
    this.el.setAttribute("role", "img");
    this.el.setAttribute("aria-label", label);
    this.el.appendChild(svg);
    about.appendChild(this.el);
    this.paint(1);

    this.frame = this.frame.bind(this);
  }

  /* The perch box relative to the column. */
  boxOf(perch) {
    const a = this.about.getBoundingClientRect();
    const r = perch.getBoundingClientRect();
    return { x: r.left - a.left + r.width / 2, y: r.bottom - a.top, size: r.width };
  }

  /* The perch whose section crosses the line a little under mid-screen. */
  activePerch() {
    const line = window.innerHeight * 0.55;
    let best = this.perches[0];
    let bestD = Infinity;
    for (const p of this.perches) {
      const r = p.closest("section").getBoundingClientRect();
      const d = line < r.top ? r.top - line : line > r.bottom ? line - r.bottom : 0;
      if (d < bestD) (bestD = d), (best = p);
    }
    return best;
  }

  start() {
    this.perch = this.activePerch();
    this.pos = this.boxOf(this.perch);
    this.from = null;
    this.spread = this.reduced ? 0 : 1; // she gathers out of loose dots
    this.paint(this.spread);
    this.place(this.pos, 0);
    cancelAnimationFrame(this.raf);
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  paint(spread) {
    const s = spread * spread;
    for (const d of this.dots) {
      d.c.setAttribute("cx", (d.x + d.dx * s).toFixed(4));
      d.c.setAttribute("cy", (d.y + d.dy * s).toFixed(4));
    }
    this.painted = spread;
  }

  place({ x, y, size }, lift, breathe = 1) {
    this.el.style.width = this.el.style.height = `${size}px`;
    this.el.style.transform = `translate(${x - size / 2}px, ${y - size - lift}px) scaleY(${breathe})`;
  }

  frame(now) {
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.time += dt;
    this.raf = requestAnimationFrame(this.frame);

    const next = this.activePerch();
    if (next !== this.perch) {
      this.perch = next;
      this.from = { ...this.pos };
    }
    const target = this.boxOf(this.perch);

    if (this.reduced) {
      this.pos = target;
      this.place(target, 0);
      return;
    }

    const k = 1 - Math.pow(1 - 0.07, dt * 60);
    const p = this.pos;
    const px = p.x;
    const py = p.y;
    p.x = lerp(p.x, target.x, k);
    p.y = lerp(p.y, target.y, k);
    p.size = lerp(p.size, target.size, k);
    const speed = Math.hypot(p.x - px, p.y - py) / Math.max(dt * 60, 0.5);

    // a hop on the way: highest half-way between the two perches
    let lift = 0;
    if (this.from) {
      const all = Math.hypot(target.x - this.from.x, target.y - this.from.y);
      const left = Math.hypot(target.x - p.x, target.y - p.y);
      const t = all ? clamp(1 - left / all, 0, 1) : 1;
      lift = Math.sin(t * Math.PI) * Math.min(140, all * 0.2);
      if (left < 0.5) this.from = null;
    }

    // moving pulls her dots apart; standing still they settle and she breathes
    const want = clamp(speed / 40, 0, 0.6);
    this.spread = lerp(this.spread, want, want > this.spread ? 0.25 : 0.06);
    if (Math.abs(this.spread - this.painted) > 0.002) this.paint(this.spread);
    const breathe = 1 + Math.sin(this.time * 2.2) * 0.018 * (1 - this.spread);
    this.place(p, lift, breathe);
  }
}

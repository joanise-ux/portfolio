/* Buddy — little Nuri living on the page after the intro.

   She wanders between perches on her own: sits on the front card, rides a
   side card round the ring, peeks out from behind a card or the navbar. She
   watches the cursor and blinks. Click her and she breaks into dots and
   re-forms somewhere else. Pick her up and she comes along, surprised; let
   go next to a card and she hides behind it, let go in mid-air and she
   panics, falls and comes back somewhere safe.

   It is the same idea as the intro (Nuri is made of dots) at toy size, so it
   stays inside the second signature effect rather than adding a third. */

import gsap from "gsap";
import { UI } from "./i18n.js";
import { FILL, EYES, sampleShape } from "./nuri.js";

const NS = "http://www.w3.org/2000/svg";
const DOTS = 90;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pick = (list) => list[Math.floor(Math.random() * list.length)];

/* Peeking: she shows down to just under the eyes and the rest stays behind
   the edge. Her base sits at 88% of her box and that line is 0.2 of her size
   above it, so a perch that sinks her base by BASE_TO_CUT hides the right amount. */
const BASE_TO_CUT = 0.2;
/* From her base up to the middle of her body, as a share of her size. */
const BASE_TO_MIDDLE = 0.38;

export class Buddy {
  constructor({ settings, dock }) {
    this.s = settings;
    this.dock = dock;
    this.perch = { type: "front" };
    this.pos = { x: -200, y: -200, scale: 1 };
    this.look = { x: 0, y: 0 };
    this.visible = false;
    this.mode = "idle"; // idle | dots
    this.cloud = { k: 0, x: 0, y: 0 };
    this.parts = [];
    this.frontTile = null;
    this.hop = { y: 0 };
    this.nextBlink = 2;
    this.wanderIn = 6;

    const el = document.createElement("button");
    el.type = "button";
    el.className = "buddy";
    el.setAttribute("aria-label", UI.aria.buddy);
    el.innerHTML = `
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <path class="buddy__body buddy__tail" d="${FILL[1]}"/>
        <path class="buddy__body" d="${FILL[0]}"/>
        <g class="buddy__blush"><ellipse cx="60" cy="130" rx="8" ry="4.5"/><ellipse cx="136" cy="130" rx="8" ry="4.5"/></g>
        <g class="buddy__eyes">${EYES.map((e) => `<ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/>`).join("")}</g>
        <path class="buddy__mouth buddy__mouth--calm" d="M91 121 q3.5 5 7 0 q3.5 5 7 0"/>
        <ellipse class="buddy__mouth buddy__mouth--surprised" cx="98" cy="128" rx="5" ry="6.5"/>
        <path class="buddy__mouth buddy__mouth--panic" d="M86 129 q4 -7 8 0 q4 7 8 0 q4 -7 8 0"/>
        <path class="buddy__sweat" d="M150 62 q7 11 0 15 q-7 -4 0 -15 Z"/>
      </svg>`;
    document.body.appendChild(el);
    this.el = el;
    this.svg = el.querySelector("svg");
    this.eyes = el.querySelector(".buddy__eyes");
    this.tail = el.querySelector(".buddy__tail");
    this.setMood("calm");

    // the dots she breaks into live in their own layer so they can fly anywhere
    const layer = document.createElementNS(NS, "svg");
    layer.setAttribute("class", "buddy-burst");
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
    this.layer = layer;

    this.bindPointer();
  }

  get size() {
    return window.innerWidth < 640 ? 54 : 76;
  }

  show() {
    this.visible = true;
    this.el.classList.add("is-visible");
  }

  hide() {
    this.visible = false;
    this.el.classList.remove("is-visible");
    this.endDots();
  }

  /* ── face ──────────────────────────────────────────
     calm       the usual ":3"
     surprised  picked up: round eyes, "o" mouth
     panic      dropped in mid-air with nothing to hold: wide eyes, wobbly
                mouth, a drop of sweat, and she shakes */
  setMood(mood) {
    if (this.mood === mood) return;
    this.mood = mood;
    this.el.dataset.mood = mood;
    const grow = mood === "surprised" ? [1.35, 1.12] : mood === "panic" ? [1.25, 0.95] : [1, 1];
    [...this.eyes.children].forEach((eye, i) => {
      eye.setAttribute("rx", EYES[i].rx * grow[0]);
      eye.setAttribute("ry", EYES[i].ry * grow[1]);
    });
  }

  /* ── pointer: click scatters her, drag carries her ─── */
  bindPointer() {
    const el = this.el;
    let down = null;
    el.addEventListener("pointerdown", (e) => {
      if (this.mode !== "idle") return;
      el.setPointerCapture(e.pointerId);
      down = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: false, since: 0 };
      this.setMood("surprised");
      this.wanderIn = 30; // she does not walk off while being held
    });
    el.addEventListener("pointermove", (e) => {
      if (!down || e.pointerId !== down.id) return;
      if (!down.dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
        down.dragging = true;
        down.since = performance.now();
        this.frontTile = null;
      }
      if (down.dragging) {
        // held, she comes along whole and surprised; the dots wait until she is let go
        this.perch = { type: "free", x: e.clientX, y: e.clientY + this.size * BASE_TO_MIDDLE };
        this.fall = null;
        this.snap = true;
      }
    });
    const up = (e) => {
      if (!down || e.pointerId !== down.id) return;
      const wasDrag = down.dragging;
      down = null;
      if (wasDrag) this.drop(e.clientX, e.clientY);
      else this.wander();
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    // keyboard: Enter / Space arrive as a click with no pointer behind it
    el.addEventListener("click", (e) => {
      if (e.detail === 0) this.wander();
    });
  }

  /* ── perches ────────────────────────────────────────
     front     sits on the front card, whichever that is right now
     ride      sits on a side card and goes round with it
     peekTop   behind a card, eyes over its top edge
     hang      behind a card, upside down under its bottom edge
     peekSide  behind a card, half of her round its side edge
     dock      behind the navbar          floor  behind the bottom of the screen
     edge      sideways out of the left or right side of the screen
     free      where she was dropped */
  choosePerch(wall) {
    const current = this.perch.type;
    const flip = Math.random() < 0.5 ? -1 : 1;
    const options = ["dock", "floor", "edge"];
    let side = [];
    if (wall.step) {
      // cards that are off to the side but still clearly visible
      side = wall.tiles.filter((t) => t !== wall.front && t.t > 0.62 && t.alpha > 0.9);
      options.push("front", "front", "peekSide");
      if (side.length) options.push("ride", "ride", "peekTop", "peekTop", "hang");
    }
    const type = pick(options.filter((o) => o !== current));
    const onSide = type === "ride" || type === "peekTop" || type === "hang";
    return { type, tile: onSide ? pick(side) : null, u: type === "front" ? 0.26 : 0.2 * flip, flip, at: Math.random() };
  }

  /* Where she lands when dropped at x, y: behind whatever is there, or just
     there if nothing is. */
  perchAt(x, y, wall, vw, vh) {
    const size = this.size;
    const reach = size * 0.55;

    if (wall.step) {
      // the nearest card she was dropped on or right next to, front-most first
      const near = wall.tiles
        .filter((t) => t.alpha > 0.5)
        .sort((a, b) => b.t - a.t)
        .find((t) => Math.abs(x - (vw / 2 + t.x)) < t.sw / 2 + reach && Math.abs(y - (vh / 2 - t.y)) < t.sh / 2 + reach);
      if (near) {
        const dx = x - (vw / 2 + near.x);
        const dy = y - (vh / 2 - near.y);
        const u = clamp(dx / near.sw, -0.36, 0.36);
        const tile = near === wall.front ? null : near; // null follows the front card
        // which edge is she closest to?
        const toSide = near.sw / 2 - Math.abs(dx);
        const toTopBottom = near.sh / 2 - Math.abs(dy);
        if (toSide < toTopBottom) return { type: "peekSide", tile, flip: Math.sign(dx) || 1, v: clamp(dy / near.sh, -0.3, 0.3) };
        return { type: dy < 0 ? "peekTop" : "hang", tile, u };
      }
    }
    if (x < size) return { type: "edge", flip: -1, y };
    if (x > vw - size) return { type: "edge", flip: 1, y };
    const r = this.dock.getBoundingClientRect();
    if (x > r.left && x < r.right && y > r.top - size && y < r.bottom) return { type: "dock", at: clamp((x - r.left) / r.width, 0.1, 0.9) };
    if (y > vh - size) return { type: "floor", x };
    return { type: "free", x, y: y + size * BASE_TO_MIDDLE };
  }

  /* Where the perch is on screen: the point her base rests on, how big she
     is there, which way up, and the line she is hidden behind. */
  anchor(wall, vw, vh) {
    const p = this.perch;
    const size = this.size;

    if (p.type === "free") return { x: p.x, y: p.y, scale: 1 };

    const t = wall.step ? p.tile || wall.front : null;
    const onCard = ["front", "ride", "peekTop", "hang", "peekSide"].includes(p.type);
    if (onCard && t) {
      const isFront = t === wall.front;
      const scale = isFront ? 1 : clamp(t.sw / t.w + 0.25, 0.55, 1);
      const sunk = size * scale * BASE_TO_CUT;
      const cx = vw / 2 + t.x;
      const cy = vh / 2 - t.y;
      const top = cy - t.sh / 2;
      const bottom = cy + t.sh / 2;
      const x = cx + t.sw * (p.u ?? 0.2);

      if (p.type === "front" || p.type === "ride") {
        if (p.type === "front") {
          if (this.frontTile && this.frontTile !== t && this.mode === "idle" && !this.s.reducedMotion) {
            // the ring moved on: hop over to the new front card
            gsap.fromTo(this.hop, { y: 0 }, { y: -size * 0.45, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 });
          }
          this.frontTile = t;
        }
        return { x, y: top, scale };
      }
      if (p.type === "peekTop") return { x, y: top + sunk, scale, clip: { below: top } };
      if (p.type === "hang") return { x, y: bottom - sunk, scale, rot: 180, clip: { above: bottom } };
      const edge = cx + (p.flip * t.sw) / 2;
      return { x: edge, y: cy + t.sh * (p.v ?? 0) + size * scale * 0.3, scale, tilt: p.flip * 10, clip: p.flip > 0 ? { leftOf: edge } : { rightOf: edge } };
    }

    const sunk = size * BASE_TO_CUT;
    if (p.type === "edge") {
      // lying on her side, head poking in from the side of the screen
      const y = clamp(p.y ?? vh * (0.25 + 0.45 * (p.at ?? 0.5)), size, vh - size * 2);
      return p.flip < 0 ? { x: -sunk, y, scale: 1, rot: 90 } : { x: vw + sunk, y, scale: 1, rot: -90 };
    }
    if (p.type === "floor") {
      const x = clamp(p.x ?? (p.flip > 0 ? vw - size * 0.8 : size * 0.8), size * 0.6, vw - size * 0.6);
      return { x, y: vh + sunk, scale: 1 };
    }
    // behind the navbar, eyes above it (the dock is drawn over her)
    const r = this.dock.getBoundingClientRect();
    return { x: lerp(r.left + size * 0.7, r.right - size * 0.7, p.at ?? 0.85), y: r.top + sunk, scale: 1 };
  }

  /* ── the dot cloud ─────────────────────────────────── */
  startDots(spread) {
    if (this.mode === "dots") return;
    this.mode = "dots";
    const size = this.size * this.pos.scale;
    const pts = sampleShape(DOTS, size * 0.9);
    const ox = this.pos.x;
    const oy = this.pos.y - size * 0.38;
    this.cloud.x = ox;
    this.cloud.y = oy;
    this.cloud.k = 0;
    for (let i = 0; i < pts.length; i += 2) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", size * 0.034);
      this.layer.appendChild(c);
      const a = Math.random() * Math.PI * 2;
      const far = size * (0.5 + Math.random() * 1.3);
      this.parts.push({
        c,
        hx: pts[i],
        hy: -pts[i + 1],
        sx: Math.cos(a) * far,
        sy: Math.sin(a) * far,
        x: ox + pts[i],
        y: oy - pts[i + 1],
        lag: 0.06 + Math.random() * 0.2, // each dot chases at its own pace, which makes the trail
      });
    }
    this.el.classList.add("is-dots");
    gsap.killTweensOf(this.cloud);
    gsap.to(this.cloud, { k: spread, duration: 0.45, ease: "power3.out" });
  }

  /* Pull the dots back into her shape, then swap the drawing back in. */
  gather(delay = 0) {
    gsap.killTweensOf(this.cloud);
    gsap.to(this.cloud, { k: 0, duration: 0.6, delay, ease: "power3.inOut", onStart: () => (this.gathering = true) });
    gsap.delayedCall(delay + 0.85, () => this.endDots());
  }

  endDots() {
    gsap.killTweensOf(this.cloud);
    this.parts.forEach((p) => p.c.remove());
    this.parts = [];
    this.mode = "idle";
    this.gathering = false;
    this.snap = true;
    this.el.classList.remove("is-dots");
  }

  /* Go somewhere else: scatter, fly, re-form. */
  wander() {
    if (this.mode !== "idle" || !this.visible) return;
    this.setMood("calm");
    this.wanderIn = 5 + Math.random() * 5;
    this.pendingPerch = true;
    this.frontTile = null;
    if (this.s.reducedMotion) {
      this.snap = true;
      return;
    }
    this.startDots(1);
    this.gather(0.55);
  }

  /* Let go after a drag. Next to something to hide behind, she bursts into
     dots and re-forms tucked behind it. In mid-air there is nothing to hold:
     she panics, hangs for a beat, drops off the bottom of the screen and
     comes back somewhere safe. */
  drop(x, y) {
    const w = this.last;
    this.perch = w ? this.perchAt(x, y, w.wall, w.vw, w.vh) : { type: "free", x, y };
    this.frontTile = null;
    if (this.perch.type === "free") {
      this.setMood("panic");
      this.wanderIn = 2.5; // only used when motion is reduced and she does not fall
      this.fall = this.s.reducedMotion ? null : { wait: 0.75, v: 0 };
      this.snap = true;
      return;
    }
    this.setMood("calm");
    this.wanderIn = 4.5;
    if (this.s.reducedMotion) {
      this.snap = true;
      return;
    }
    this.startDots(1);
    this.gather(0.3);
  }

  update(dt, { wall, vw, vh, mouse, t }) {
    this.last = { wall, vw, vh };
    if (this.pendingPerch) {
      this.perch = this.choosePerch(wall);
      this.pendingPerch = false;
    }
    // the card she was on has gone round the back, or the cards are gone: find somewhere new
    const p = this.perch;
    const onCard = ["front", "ride", "peekTop", "hang", "peekSide"].includes(p.type);
    if (onCard && !wall.step) this.perch = { type: "dock" };
    else if (p.tile && p.tile.t < 0.45 && this.mode === "idle") this.wander();

    // dropped in mid-air: a beat of panic, then gravity, then back in from below
    if (this.fall && this.perch.type === "free" && this.mode === "idle") {
      const f = this.fall;
      f.wait -= dt;
      if (f.wait < 0) {
        f.v += 3200 * dt;
        this.perch.y += f.v * dt;
        this.snap = true;
        if (this.perch.y > vh + this.size * 1.4) {
          this.fall = null;
          this.wander();
        }
      }
    } else if (this.visible && this.mode === "idle" && !this.s.reducedMotion && !wall.opened) {
      this.wanderIn -= dt;
      if (this.wanderIn <= 0) this.wander();
    }

    const a = this.anchor(wall, vw, vh);
    const size = this.size;
    const k = this.snap ? 1 : 1 - Math.pow(0.0015, dt);
    this.snap = false;
    this.pos.x = lerp(this.pos.x, a.x, k);
    this.pos.y = lerp(this.pos.y, a.y, k);
    this.pos.scale = lerp(this.pos.scale, a.scale, k);
    const px = size * this.pos.scale;
    const rot = a.rot || 0;
    const sin = Math.sin((rot * Math.PI) / 180);
    const cos = Math.cos((rot * Math.PI) / 180);

    if (this.mode === "dots") {
      const c = this.cloud;
      // head for the middle of where she will re-form
      c.x = a.x + sin * size * a.scale * BASE_TO_MIDDLE;
      c.y = a.y - cos * size * a.scale * BASE_TO_MIDDLE;
      this.pos.x = a.x;
      this.pos.y = a.y;
      this.pos.scale = a.scale;
      for (const d of this.parts) {
        const f = 1 - Math.pow(1 - d.lag, dt * 60);
        // her shape, turned the way she will be facing, loosened by the spread
        const hx = d.hx * cos - d.hy * sin;
        const hy = d.hx * sin + d.hy * cos;
        d.x = lerp(d.x, c.x + lerp(hx, d.sx, c.k), f);
        d.y = lerp(d.y, c.y + lerp(hy, d.sy, c.k), f);
        d.c.setAttribute("cx", d.x);
        d.c.setAttribute("cy", d.y);
        // as she re-forms behind an edge, the dots that end up past it fade
        // out, so she never shows whole before the drawing takes over
        const cl = a.clip;
        const past = cl && (cl.below !== undefined ? d.y > cl.below : cl.above !== undefined ? d.y < cl.above : cl.leftOf !== undefined ? d.x < cl.leftOf : d.x > cl.rightOf);
        d.c.style.opacity = past && this.gathering ? clamp(c.k * 1.4, 0, 1) : 1;
      }
    }

    // she leans into the turn, and looks where things are going or at the cursor
    const speed = clamp(wall.vel.x / 30, -1, 1);
    const moving = Math.abs(speed) > 0.06;
    let lx = 0;
    let ly = 0;
    if (moving) {
      lx = Math.sign(speed);
    } else if (mouse.inside) {
      const dx = mouse.x - this.pos.x;
      const dy = mouse.y - (this.pos.y - px * 0.4);
      const d = Math.hypot(dx, dy) || 1;
      lx = dx / d;
      ly = dy / d;
    }
    const ek = 1 - Math.pow(0.002, dt);
    this.look.x = lerp(this.look.x, lx, ek);
    this.look.y = lerp(this.look.y, ly, ek);

    this.nextBlink -= dt;
    let lid = 1;
    if (this.nextBlink < 0.14 && this.mood === "calm") lid = 0.12;
    if (this.nextBlink < 0) this.nextBlink = 2.5 + Math.random() * 4;

    const still = this.s.reducedMotion;
    const bob = still ? 0 : Math.sin(t * 1.6) * 1.5;
    const shake = this.mood === "panic" && !still ? Math.sin(t * 34) * 5 : 0;
    const tilt = rot + (a.tilt || 0) + shake + (still ? 0 : -speed * 9);
    const el = this.el;
    const left = this.pos.x - px / 2;
    const top = this.pos.y - px * 0.88 + this.hop.y + bob;
    el.style.width = el.style.height = `${px}px`;
    el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    // whatever is past the edge she hides behind is clipped off the button;
    // the turn is on the drawing inside it, so the cut stays straight
    const c = a.clip;
    const far = "-300%";
    el.style.clipPath = !c
      ? ""
      : c.below !== undefined
        ? `inset(${far} ${far} ${top + px - c.below}px ${far})`
        : c.above !== undefined
          ? `inset(${c.above - top}px ${far} ${far} ${far})`
          : c.leftOf !== undefined
            ? `inset(${far} ${far} ${far} ${c.leftOf - left}px)`
            : `inset(${far} ${left + px - c.rightOf}px ${far} ${far})`;
    this.svg.style.transform = `rotate(${tilt}deg)`;

    // tail: a lazy sway when she sits, a proper wag when she is peeking out
    // from behind something, stiff when picked up, frantic in a panic
    const hiding = !!a.clip || ["dock", "floor", "edge"].includes(this.perch.type);
    const wag = still
      ? 0
      : this.mood === "panic"
        ? Math.sin(t * 26) * 26
        : this.mood === "surprised"
          ? -14
          : hiding
            ? Math.sin(t * 9) * 18
            : Math.sin(t * 2.4) * 7;
    this.wag = lerp(this.wag || 0, wag, 1 - Math.pow(0.0001, dt));
    this.tail.setAttribute("transform", `rotate(${this.wag} 156 136)`);
    this.eyes.setAttribute("transform", `translate(${this.look.x * 4.5} ${this.look.y * 3.5}) translate(0 ${114 * (1 - lid)}) scale(1 ${lid})`);
  }
}

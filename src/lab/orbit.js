/* Orbit — the project wall for a small portfolio.

   A handful of cards ride a ring that turns around the screen centre: the
   one in front is big and sharp, the rest shrink, dim and blur as they go
   round the back. Unlike the infinite wall it never has to repeat itself, so
   five projects look like a full set instead of a loop.

   Numbers follow design/v2/Strona główna.dc.html, which is drawn on a
   1440×900 desktop frame and a 375×812 phone frame.

   Same world as the wall (CSS pixels, origin at the centre, y up) and the
   same interface, so main.js can swap one for the other. */

import * as THREE from "three";
import gsap from "gsap";
import { vertex, fragment } from "./canvas.js";
import { SHAPES } from "./tiles.js";

const lerp = (a, b, t) => a + (b - a) * t;
const TAU = Math.PI * 2;

export class Orbit {
  constructor({ scene, shots, settings }) {
    this.scene = scene;
    this.shots = shots;
    this.s = settings;
    this.group = new THREE.Group();
    scene.add(this.group);

    this.geometry = new THREE.PlaneGeometry(1, 1, 24, 24);
    this.shared = {
      uVel: { value: new THREE.Vector2() },
      uBend: { value: settings.bend },
      uViewport: { value: new THREE.Vector2(1, 1) },
      uRgb: { value: settings.rgb },
    };

    // offset.x is the turn, in px of drag; one card = this.pitch px
    this.offset = new THREE.Vector2();
    this.target = new THREE.Vector2();
    this.prev = new THREE.Vector2();
    this.vel = new THREE.Vector2();

    this.tiles = [];
    this.hovered = null;
    this.opened = null;
    this.locked = false;
    this.reveal = 0;
    this.idle = 0;
    this.snapped = true;
  }

  /* `perProject` shots from each project, dealt round-robin so two cards of
     the same project never sit side by side. */
  pickShots() {
    const byProject = new Map();
    for (const shot of this.shots) {
      const list = byProject.get(shot.project.key) || [];
      if (list.length < this.s.orbitPerProject) list.push(shot);
      byProject.set(shot.project.key, list);
    }
    const out = [];
    for (let i = 0; i < this.s.orbitPerProject; i++) {
      for (const list of byProject.values()) if (list[i]) out.push(list[i]);
    }
    return out;
  }

  layout(vw, vh) {
    this.vw = vw;
    this.vh = vh;
    this.shared.uViewport.value.set(vw, vh);

    this.tiles.forEach((t) => {
      this.group.remove(t.mesh);
      t.mesh.material.dispose();
    });
    this.tiles = [];
    this.hovered = null;
    this.opened = null;

    const phone = vw < 640;
    this.phone = phone;
    const shots = this.pickShots();
    this.step = TAU / shots.length;
    // the design frame scaled to fit; on a phone every card is 70% of the width
    const k = phone ? vw / 375 : Math.min(vw / 1440, vh / 900);
    this.unit = k;
    this.pitch = phone ? vw * 0.5 : 180 * k; // px of drag per card
    this.radius = phone ? 405 * k : Math.min(680 * k, vw * 0.48);
    this.jitter = (phone ? 140 : 260) * k;
    this.lift0 = (phone ? 34 : 40) * k; // the ring sits a little above the middle
    this.cardRadius = (phone ? 12 : 14) * k;

    shots.forEach((shot, i) => {
      const [dw, dh] = SHAPES[shot.shape];
      const w = phone ? 262 * k : dw * k;
      const h = phone ? (262 * k * dh) / dw : dh * k;
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        uniforms: {
          ...this.shared,
          uMap: { value: shot.texture },
          uPlane: { value: new THREE.Vector2(w, h) },
          uImgAspect: { value: shot.aspect },
          uDim: { value: 1 },
          uAlpha: { value: 0 },
          uRadius: { value: this.cardRadius },
          uBlur: { value: 0 },
        },
      });
      const mesh = new THREE.Mesh(this.geometry, material);
      this.group.add(mesh);
      const tile = {
        mesh,
        shot,
        w,
        h,
        index: i,
        // cards off to the side sit alternately above and below the middle line
        side: i % 2 ? 1 : -1,
        delay: i / shots.length,
        front: 0,
        t: 0,
        alpha: 0,
        hover: 0,
        dim: 1,
        open: 0,
        x: 0,
        y: 0,
      };
      mesh.userData.tile = tile;
      this.tiles.push(tile);
    });
  }

  /* ── input ─────────────────────────────────────────── */
  pan(dx, dy) {
    if (this.locked) return;
    this.target.x += dx - dy;
    this.idle = 0;
    this.snapped = false;
  }

  fling(vx, vy) {
    if (this.locked) return;
    this.target.x += (vx - vy) * this.s.momentum;
    this.idle = 0;
    this.snapped = false;
  }

  setHovered(tile) {
    this.hovered = this.locked ? null : tile;
  }

  pick(raycaster) {
    const hits = raycaster.intersectObjects(this.group.children, false);
    // the raycaster sorts by distance; on the ring "nearest" is "most in front"
    let best = null;
    for (const hit of hits) {
      const t = hit.object.userData.tile;
      if (!best || t.front > best.front) best = t;
    }
    return best;
  }

  /* A click on a card that is round the side turns it to the front instead
     of opening it. Returns true when it did that. */
  bringToFront(tile) {
    if (tile.front > 0.9) return false;
    let turn = -(tile.index * this.step + (this.target.x / this.pitch) * this.step);
    turn = ((((turn + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
    this.target.x += (turn / this.step) * this.pitch;
    this.idle = 0;
    return true;
  }

  open(tile, onDone) {
    if (this.opened) return;
    this.opened = tile;
    this.locked = true;
    this.hovered = null;
    gsap.to(tile, { open: 1, duration: 0.9, ease: "expo.inOut", onComplete: onDone });
  }

  close(onDone) {
    const tile = this.opened;
    if (!tile) return;
    gsap.to(tile, {
      open: 0,
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => {
        this.opened = null;
        this.locked = false;
        onDone && onDone();
      },
    });
  }

  /* ── frame ─────────────────────────────────────────── */
  update(dt) {
    const s = this.s;

    // let go, the ring settles on the nearest card; left alone, it keeps turning slowly
    this.idle += dt;
    if (!this.snapped && this.idle > 0.3) {
      this.target.x = Math.round(this.target.x / this.pitch) * this.pitch;
      this.snapped = true;
    }
    if (!this.locked && !this.hovered && !s.reducedMotion && this.idle > 1.2) {
      this.target.x -= s.orbitSpin * dt;
    }

    const k = 1 - Math.pow(1 - s.ease, dt * 60);
    this.offset.x = lerp(this.offset.x, this.target.x, k);

    const vx = (this.offset.x - this.prev.x) / Math.max(dt * 60, 0.5);
    this.prev.copy(this.offset);
    this.vel.x = lerp(this.vel.x, THREE.MathUtils.clamp(vx, -60, 60), 0.2);
    this.shared.uVel.value.copy(this.vel);
    this.shared.uBend.value = s.reducedMotion ? 0 : s.bend;
    this.shared.uRgb.value = s.reducedMotion ? 0 : s.rgb;

    const anyHover = !!this.hovered && !this.opened;
    const hk = 1 - Math.pow(0.86, dt * 60);
    const turn = (this.offset.x / this.pitch) * this.step;

    this.front = null;
    for (const t of this.tiles) {
      const a = t.index * this.step + turn;
      const depth = Math.cos(a); // 1 = front, -1 = back
      const tt = (depth + 1) / 2;
      const front = Math.pow(tt, 4);
      t.t = tt;
      t.front = front;
      if (!this.front || tt > this.front.t) this.front = t;

      t.hover = lerp(t.hover, this.hovered === t ? 1 : 0, hk);
      const base = 0.42 + 0.58 * Math.pow(tt, 3);
      const dimTarget = this.opened ? (this.opened === t ? 1 : 0) : anyHover && this.hovered !== t ? base * s.dim : base;
      t.dim = lerp(t.dim, Math.min(dimTarget, 1), hk);

      const rv = THREE.MathUtils.clamp(this.reveal * 1.6 - t.delay * 0.6, 0, 1);
      const rvE = 1 - Math.pow(1 - rv, 3);

      const o = t.open;
      const scale = lerp(0.22, 1, front) * (1 + t.hover * (s.hoverScale - 1));
      const w = lerp(t.w * scale, this.vw, o);
      const h = lerp(t.h * scale, this.vh, o);
      const x = lerp(Math.sin(a) * this.radius, 0, o);
      const y = lerp(this.lift0 - t.side * this.jitter * (1 - tt) * Math.abs(Math.sin(a)) - (1 - rvE) * 40, 0, o);

      t.mesh.position.set(x, y, this.opened === t ? 2 : depth);
      t.mesh.renderOrder = this.opened === t ? 2 : depth;
      t.mesh.scale.set(w, h, 1);

      const u = t.mesh.material.uniforms;
      u.uPlane.value.set(w, h);
      u.uDim.value = t.dim;
      u.uBlur.value = (1 - tt) * s.orbitBlur * (1 - o);
      u.uRadius.value = lerp(this.cardRadius * scale, 0, o);
      const fadeOthers = this.opened && this.opened !== t ? 1 - this.opened.open : 1;
      // cards right at the back fade out instead of piling up behind the front one
      t.alpha = rvE * fadeOthers * THREE.MathUtils.clamp((tt - 0.05) / 0.12, 0, 1);
      u.uAlpha.value = this.opened === t ? 1 : t.alpha;
      t.x = x;
      t.y = y;
      t.sw = w;
      t.sh = h;
    }
  }
}

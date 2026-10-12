/* InfiniteCanvas — the Phantom-style project wall.

   World units are CSS pixels, origin at the screen centre, y up. A block of
   cols×rows tiles, a little larger than the viewport, wraps around in both
   axes, so panning never reaches an edge. Each tile is a subdivided plane
   so the vertex shader can bow the whole wall in the direction of travel. */

import * as THREE from "three";
import gsap from "gsap";

export const vertex = /* glsl */ `
  uniform vec2 uVel;        // px per frame, smoothed
  uniform float uBend;      // how far the wall bows at full speed
  uniform vec2 uViewport;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec2 n = clamp(world.xy / (uViewport * 0.5), -1.5, 1.5);
    // the middle of the screen leads, the edges trail: a soft lens bow
    world.x -= uVel.x * uBend * cos(n.y * 1.5707963);
    world.y -= uVel.y * uBend * cos(n.x * 1.5707963);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uPlane;      // on-screen size in px
  uniform float uImgAspect;
  uniform vec2 uVel;
  uniform float uRgb;
  uniform float uDim;       // 1 = full brightness
  uniform float uAlpha;
  uniform float uRadius;
  uniform float uBlur;      // mip levels of softness, 0 = sharp
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    // object-fit: cover, so the image survives being stretched to full screen
    float planeAspect = uPlane.x / uPlane.y;
    vec2 ratio = vec2(
      min(planeAspect / uImgAspect, 1.0),
      min(uImgAspect / planeAspect, 1.0)
    );
    vec2 uv = vUv * ratio + (1.0 - ratio) * 0.5;

    vec2 shift = uVel * uRgb * 0.0004;
    vec4 base = texture2D(uMap, uv, uBlur);
    float r = texture2D(uMap, uv + shift, uBlur).r;
    float b = texture2D(uMap, uv - shift, uBlur).b;
    vec3 col = vec3(r, base.g, b) * uDim;

    float d = roundedBox((vUv - 0.5) * uPlane, uPlane * 0.5, uRadius);
    float mask = 1.0 - smoothstep(-1.0, 0.5, d);

    gl_FragColor = vec4(col, uAlpha * mask);
    #include <colorspace_fragment>
  }
`;

const wrap = (v, m) => ((v % m) + m) % m;
const lerp = (a, b, t) => a + (b - a) * t;

export class InfiniteCanvas {
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

    this.offset = new THREE.Vector2();
    this.target = new THREE.Vector2();
    this.prev = new THREE.Vector2();
    this.vel = new THREE.Vector2();

    this.tiles = [];
    this.hovered = null;
    this.opened = null;
    this.locked = false;
    this.reveal = 0; // 0 → tiles hidden (intro), 1 → visible
  }

  layout(vw, vh) {
    this.vw = vw;
    this.vh = vh;
    this.shared.uViewport.value.set(vw, vh);

    const perRow = vw < 640 ? 2.15 : vw < 1024 ? 3.3 : vw < 1600 ? 4.6 : 5.4;
    this.cellW = vw / perRow;
    this.cellH = this.cellW * 1.22;
    this.cols = Math.ceil(vw / this.cellW) + 2;
    this.rows = Math.ceil(vh / this.cellH) + 2;
    this.blockW = this.cols * this.cellW;
    this.blockH = this.rows * this.cellH;

    this.tiles.forEach((t) => {
      this.group.remove(t.mesh);
      t.mesh.material.dispose();
    });
    this.tiles = [];
    this.hovered = null;
    this.opened = null;

    const pad = this.cellW * 0.09;
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const shot = this.shots[(r * this.cols + c * 3) % this.shots.length];
        const boxW = this.cellW - pad * 2;
        const boxH = this.cellH - pad * 2;
        const w = shot.aspect >= boxW / boxH ? boxW : boxH * shot.aspect;
        const h = w / shot.aspect;

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
            uRadius: { value: Math.max(6, w * 0.035) },
            uBlur: { value: 0 },
          },
        });
        const mesh = new THREE.Mesh(this.geometry, material);
        mesh.scale.set(w, h, 1);
        this.group.add(mesh);

        const tile = {
          mesh,
          shot,
          w,
          h,
          // small jitter inside the cell so the grid doesn't read as a table
          baseX: c * this.cellW + (((c * 7 + r * 3) % 5) - 2) * pad * 0.35,
          baseY: -(r * this.cellH) - (c % 2) * this.cellH * 0.5,
          // per-tile stagger for the intro reveal
          delay: ((c * 5 + r * 11) % 17) / 17,
          hover: 0,
          dim: 1,
          open: 0,
          x: 0,
          y: 0,
        };
        mesh.userData.tile = tile;
        this.tiles.push(tile);
      }
    }
  }

  /* ── input ─────────────────────────────────────────── */
  pan(dx, dy) {
    if (this.locked) return;
    this.target.x += dx;
    this.target.y += dy;
  }

  fling(vx, vy) {
    if (this.locked) return;
    this.target.x += vx * this.s.momentum;
    this.target.y += vy * this.s.momentum;
  }

  setHovered(tile) {
    this.hovered = this.locked ? null : tile;
  }

  pick(raycaster) {
    const hit = raycaster.intersectObjects(this.group.children, false)[0];
    return hit ? hit.object.userData.tile : null;
  }

  open(tile, onDone) {
    if (this.opened) return;
    this.opened = tile;
    this.locked = true;
    this.hovered = null;
    tile.mesh.position.z = 2;
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
        tile.mesh.position.z = 0;
        this.opened = null;
        this.locked = false;
        onDone && onDone();
      },
    });
  }

  /* ── frame ─────────────────────────────────────────── */
  update(dt) {
    const s = this.s;
    const k = 1 - Math.pow(1 - s.ease, dt * 60); // frame-rate independent lerp
    this.offset.x = lerp(this.offset.x, this.target.x, k);
    this.offset.y = lerp(this.offset.y, this.target.y, k);

    // smoothed velocity drives the bend + rgb split
    const vx = (this.offset.x - this.prev.x) / Math.max(dt * 60, 0.5);
    const vy = (this.offset.y - this.prev.y) / Math.max(dt * 60, 0.5);
    this.prev.copy(this.offset);
    const max = 60;
    this.vel.x = lerp(this.vel.x, THREE.MathUtils.clamp(vx, -max, max), 0.2);
    this.vel.y = lerp(this.vel.y, THREE.MathUtils.clamp(vy, -max, max), 0.2);
    this.shared.uVel.value.copy(this.vel);
    this.shared.uBend.value = s.reducedMotion ? 0 : s.bend;
    this.shared.uRgb.value = s.reducedMotion ? 0 : s.rgb;

    const anyHover = !!this.hovered && !this.opened;
    const hk = 1 - Math.pow(0.86, dt * 60);

    for (const t of this.tiles) {
      // wrapped grid position
      const gx = wrap(t.baseX + this.offset.x + this.blockW / 2, this.blockW) - this.blockW / 2;
      const gy = wrap(t.baseY + this.offset.y + this.blockH / 2, this.blockH) - this.blockH / 2;

      t.hover = lerp(t.hover, this.hovered === t ? 1 : 0, hk);
      const dimTarget = this.opened ? (this.opened === t ? 1 : 0) : anyHover && this.hovered !== t ? s.dim : 1;
      t.dim = lerp(t.dim, dimTarget, hk);

      // intro: each tile fades + rises in with its own delay
      const rv = THREE.MathUtils.clamp((this.reveal * 1.6 - t.delay * 0.6), 0, 1);
      const rvE = 1 - Math.pow(1 - rv, 3);

      // expanded tile goes to the centre and covers the viewport
      const o = t.open;
      const coverW = this.vw;
      const coverH = this.vh;
      const scale = 1 + t.hover * (s.hoverScale - 1);
      const w = lerp(t.w * scale, coverW, o);
      const h = lerp(t.h * scale, coverH, o);
      const x = lerp(gx, 0, o);
      const y = lerp(gy - (1 - rvE) * 40, 0, o);

      t.mesh.position.x = x;
      t.mesh.position.y = y;
      t.mesh.scale.set(w, h, 1);

      const u = t.mesh.material.uniforms;
      u.uPlane.value.set(w, h);
      u.uDim.value = t.dim;
      u.uRadius.value = lerp(Math.max(6, t.w * 0.035), 0, o);
      const fadeOthers = this.opened && this.opened !== t ? 1 - this.opened.open : 1;
      u.uAlpha.value = rvE * Math.min(fadeOthers, 1);
      t.x = x;
      t.y = y;
    }
  }
}

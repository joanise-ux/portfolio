/* v2 motion lab — the two signature effects on placeholder content:
   1. the infinite project wall (canvas.js)
   2. the dot field that forms Nuri in the intro (dots.js)
   Open /lab/ and tune the feel with the panel in the corner. */

import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { InfiniteCanvas } from "./canvas.js";
import { Dots } from "./dots.js";
import { buildShots } from "./tiles.js";

const $ = (s) => document.querySelector(s);
const stage = $("#stage");
const label = $("#cursorLabel");
const labelName = label.querySelector(".cursor-label__name");
const labelCat = label.querySelector(".cursor-label__cat");
const hint = $("#hint");
const detail = $("#detail");

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Everything the panel can tune. Values here are the starting "feel". */
const settings = {
  ease: 0.085, // how fast the wall catches up with the finger (lower = more glide)
  dragSpeed: 1.15,
  wheelSpeed: 0.9,
  momentum: 9, // how far a fling carries
  bend: 1.4,
  rgb: 1.0,
  hoverScale: 1.06,
  dim: 0.38,
  dotSize: 3.2,
  fieldAlpha: 0.32,
  parallax: 0.12,
  introSpeed: 1,
  dotsDesktop: 1100,
  dotsMobile: 320,
  reducedMotion: prefersReduced,
};

/* ── three ───────────────────────────────────────────── */
const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: true, alpha: false });
renderer.setClearColor(0x0e0c0b, 1);
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
camera.position.z = 10;

await document.fonts.ready; // tile labels are drawn with Outfit
const wall = new InfiniteCanvas({ scene, shots: buildShots(), settings });
const dots = new Dots({ scene, settings });
if (import.meta.env.DEV) window.__lab = { wall, dots, settings, renderer, gsap };

let vw = 0;
let vh = 0;
function resize() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr);
  renderer.setSize(vw, vh, false);
  camera.left = -vw / 2;
  camera.right = vw / 2;
  camera.top = vh / 2;
  camera.bottom = -vh / 2;
  camera.updateProjectionMatrix();
  closeDetail(true);
  wall.layout(vw, vh);
  dots.layout(vw, vh, pr);
}
resize();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 150);
});

/* ── intro ───────────────────────────────────────────── */
function intro() {
  wall.reveal = 0;
  gsap.killTweensOf(wall);
  dots.playIntro({
    onRelease: () => gsap.to(wall, { reveal: 1, duration: settings.reducedMotion ? 0 : 1.8, ease: "power2.out" }),
  });
}
intro();

/* ── picking + label ─────────────────────────────────── */
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pickAt(x, y) {
  ndc.set((x / vw) * 2 - 1, -(y / vh) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  return wall.pick(raycaster);
}

const labelPos = { x: -200, y: -200, tx: -200, ty: -200 };
function showLabel(tile) {
  if (!tile) {
    label.classList.remove("is-visible");
    return;
  }
  labelName.textContent = tile.shot.project.name;
  labelCat.textContent = tile.shot.project.cat;
  label.classList.add("is-visible");
}

/* ── input ───────────────────────────────────────────── */
const ptr = { down: false, id: null, x: 0, y: 0, sx: 0, sy: 0, t: 0, vx: 0, vy: 0, dragging: false, type: "mouse" };
let touchSelected = null;

stage.addEventListener("pointerdown", (e) => {
  if (wall.locked) return;
  stage.setPointerCapture(e.pointerId);
  Object.assign(ptr, { down: true, id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), vx: 0, vy: 0, dragging: false, type: e.pointerType });
});

stage.addEventListener("pointermove", (e) => {
  if (ptr.down && e.pointerId === ptr.id) {
    const dx = e.clientX - ptr.x;
    const dy = e.clientY - ptr.y;
    const now = performance.now();
    const dt = Math.max(now - ptr.t, 1);
    ptr.vx = THREE.MathUtils.lerp(ptr.vx, (dx / dt) * 16, 0.5);
    ptr.vy = THREE.MathUtils.lerp(ptr.vy, (dy / dt) * 16, 0.5);
    ptr.x = e.clientX;
    ptr.y = e.clientY;
    ptr.t = now;

    if (!ptr.dragging && Math.hypot(e.clientX - ptr.sx, e.clientY - ptr.sy) > 6) {
      ptr.dragging = true;
      stage.classList.add("is-dragging");
      wall.setHovered(null);
      touchSelected = null;
      showLabel(null);
      hint.classList.add("is-hidden");
    }
    if (ptr.dragging) wall.pan(dx * settings.dragSpeed, -dy * settings.dragSpeed);
    return;
  }

  if (e.pointerType === "mouse") {
    mouse.inside = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    labelPos.tx = e.clientX + 18;
    labelPos.ty = e.clientY + 18;
    updateHover();
  }
});
stage.addEventListener("pointerleave", (e) => {
  if (e.pointerType !== "mouse") return;
  mouse.inside = false;
  updateHover();
});

/* The wall keeps gliding after the mouse stops, so hover is re-checked every
   frame, not only on mousemove. */
const mouse = { inside: false, x: 0, y: 0 };
function updateHover() {
  if (touchSelected) return;
  const tile = mouse.inside && !ptr.down && !wall.locked ? pickAt(mouse.x, mouse.y) : null;
  if (tile === wall.hovered) return;
  wall.setHovered(tile);
  showLabel(tile);
  stage.classList.toggle("is-pointer", !!tile);
}

function endPointer(e) {
  if (!ptr.down || e.pointerId !== ptr.id) return;
  ptr.down = false;
  stage.classList.remove("is-dragging");

  // a pause before letting go cancels the fling
  const idle = performance.now() - ptr.t > 80;
  if (ptr.dragging) {
    if (!idle) wall.fling(ptr.vx * settings.dragSpeed, -ptr.vy * settings.dragSpeed);
    return;
  }

  const tile = pickAt(e.clientX, e.clientY);
  if (!tile) {
    touchSelected = null;
    wall.setHovered(null);
    showLabel(null);
    return;
  }
  if (ptr.type === "mouse" || touchSelected === tile) {
    openDetail(tile);
  } else {
    // touch: first tap names the tile, second tap opens it
    touchSelected = tile;
    wall.setHovered(tile);
    showLabel(tile);
  }
}
stage.addEventListener("pointerup", endPointer);
stage.addEventListener("pointercancel", endPointer);

stage.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : 1;
    let dx = e.deltaX * unit;
    let dy = e.deltaY * unit;
    if (e.shiftKey && !dx) [dx, dy] = [dy, 0];
    wall.pan(-dx * settings.wheelSpeed, dy * settings.wheelSpeed);
    hint.classList.add("is-hidden");
  },
  { passive: false }
);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") return closeDetail();
  const step = 140;
  const map = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
  if (map[e.key]) {
    e.preventDefault();
    wall.pan(...map[e.key]);
  }
});

/* ── open / close ────────────────────────────────────── */
function openDetail(tile) {
  showLabel(null);
  touchSelected = null;
  stage.classList.remove("is-pointer");
  hint.classList.add("is-hidden");
  detail.querySelector(".detail__title").textContent = tile.shot.project.name;
  detail.querySelector(".detail__cat").textContent = tile.shot.project.cat;
  dots.setReading(true);
  wall.open(tile);
  detail.classList.add("is-open");
  detail.setAttribute("aria-hidden", "false");
  $("#detailBack").focus({ preventScroll: true });
}

function closeDetail(instant) {
  if (!wall.opened) return;
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
  dots.setReading(false);
  if (instant === true) {
    wall.opened.open = 0;
    wall.opened = null;
    wall.locked = false;
    return;
  }
  wall.close();
}
$("#detailBack").addEventListener("click", () => closeDetail());
$("#replay").addEventListener("click", () => {
  closeDetail(true);
  intro();
});

/* ── tuning panel ────────────────────────────────────── */
const gui = new GUI({ title: "czucie / feel" });
if (window.innerWidth < 640) gui.close();
const f1 = gui.addFolder("płótno");
f1.add(settings, "ease", 0.03, 0.3, 0.005).name("doganianie (glide)");
f1.add(settings, "dragSpeed", 0.5, 2.5, 0.05).name("drag");
f1.add(settings, "wheelSpeed", 0.2, 2.5, 0.05).name("kółko / trackpad");
f1.add(settings, "momentum", 0, 25, 0.5).name("rozpęd po puszczeniu");
f1.add(settings, "bend", 0, 4, 0.05).name("wygięcie");
f1.add(settings, "rgb", 0, 4, 0.05).name("rozszczepienie rgb");
f1.add(settings, "hoverScale", 1, 1.2, 0.005).name("hover: powiększenie");
f1.add(settings, "dim", 0.1, 1, 0.01).name("hover: przygaszenie reszty");
const f2 = gui.addFolder("kropki");
f2.add(settings, "dotSize", 1, 8, 0.1).name("rozmiar");
f2.add(settings, "fieldAlpha", 0, 1, 0.01).name("widoczność tła");
f2.add(settings, "parallax", 0, 0.5, 0.01).name("paralaksa");
f2.add(settings, "introSpeed", 0.4, 2.5, 0.05).name("długość intra");
f2.add(settings, "dotsDesktop", 300, 3000, 50).name("ilość: desktop").onFinishChange(resize);
f2.add(settings, "dotsMobile", 150, 800, 10).name("ilość: telefon").onFinishChange(resize);
gui.add(settings, "reducedMotion").name("mniej ruchu (a11y)");
gui.add({ replay: () => $("#replay").click() }, "replay").name("powtórz intro");

/* ── loop ────────────────────────────────────────────── */
const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  wall.update(dt);
  dots.update(t, wall.offset);
  if (Math.abs(wall.vel.x) + Math.abs(wall.vel.y) > 0.05) updateHover();

  labelPos.x = THREE.MathUtils.lerp(labelPos.x, labelPos.tx, 0.25);
  labelPos.y = THREE.MathUtils.lerp(labelPos.y, labelPos.ty, 0.25);
  if (touchSelected) {
    // on touch the name sits under the tapped tile and travels with it
    labelPos.x = touchSelected.x + vw / 2 - touchSelected.w / 2;
    labelPos.y = vh / 2 - touchSelected.y + touchSelected.h / 2 + 10;
  }
  label.style.transform = `translate3d(${labelPos.x}px, ${labelPos.y}px, 0)`;

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

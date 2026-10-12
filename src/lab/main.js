/* v2 motion lab — the two signature effects on placeholder content:
   1. the project wall: an orbit of cards (orbit.js) or the infinite
      Phantom-style grid (canvas.js), switchable in the panel
   2. the dot field that forms Nuri in the intro (dots.js)
   Open /lab/ and tune the feel with the panel in the corner. */

import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { InfiniteCanvas } from "./canvas.js";
import { Orbit } from "./orbit.js";
import { Dots } from "./dots.js";
import { Buddy } from "./buddy.js";
import { buildShots, shuffled } from "./tiles.js";

const $ = (s) => document.querySelector(s);
const stage = $("#stage");
const label = $("#cursorLabel");
const caption = $("#caption");
const captionName = caption.querySelector(".caption__name");
const captionCat = caption.querySelector(".caption__cat");
const labelName = label.querySelector(".cursor-label__name");
const hint = $("#hint");
const detail = $("#detail");

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Everything the panel can tune. Values here are the starting "feel". */
const settings = {
  accent: "#f0532a", // persymona
  layout: "orbita", // "orbita" suits 3–6 projects, "siatka" needs many more
  ease: 0.085, // how fast the wall catches up with the finger (lower = more glide)
  dragSpeed: 1.15,
  wheelSpeed: 0.9,
  momentum: 9, // how far a fling carries
  bend: 1.4,
  rgb: 1.0,
  hoverScale: 1.05,
  dim: 0.45,
  orbitSpin: 22, // px of turn per second when nobody is touching it
  orbitBlur: 3.5,
  orbitPerProject: 2,
  dotSize: 3.2,
  fieldAlpha: 0.32,
  parallax: 0.12,
  introSpeed: 1,
  dotsDesktop: 1100,
  dotsMobile: 320,
  buddy: true, // little Nuri on the page after the intro
  reducedMotion: prefersReduced,
};

/* ── three ───────────────────────────────────────────── */
const renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: true, alpha: false });
renderer.setClearColor(0x15120f, 1);
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);
camera.position.z = 10;

await document.fonts.ready; // tile labels are drawn with Outfit
const shots = buildShots();
const walls = {
  orbita: new Orbit({ scene, shots, settings }),
  siatka: new InfiniteCanvas({ scene, shots: shuffled(shots), settings }),
};
let wall = walls[settings.layout];
const dots = new Dots({ scene, settings });
const buddy = new Buddy({ settings, dock: $(".dock") });
if (import.meta.env.DEV) window.__lab = { walls, dots, buddy, settings, renderer, gsap };

function setLayout() {
  closeDetail(true);
  wall = walls[settings.layout];
  for (const w of Object.values(walls)) w.group.visible = w === wall;
  gsap.killTweensOf(wall);
  gsap.fromTo(wall, { reveal: 0 }, { reveal: 1, duration: settings.reducedMotion ? 0 : 1.2, ease: "power2.out" });
}

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
  for (const w of Object.values(walls)) w.layout(vw, vh);
  dots.layout(vw, vh, pr);
}
resize();
for (const w of Object.values(walls)) w.group.visible = w === wall;
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 150);
});

/* ── intro ───────────────────────────────────────────── */
function intro() {
  buddy.hide();
  wall.reveal = 0;
  gsap.killTweensOf(wall);
  dots.playIntro({
    onRelease: () => gsap.to(wall, { reveal: 1, duration: settings.reducedMotion ? 0 : 1.8, ease: "power2.out" }),
    onDone: () => settings.buddy && buddy.show(),
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
  label.classList.add("is-visible");
}

/* ── input ───────────────────────────────────────────── */
const ptr = { down: false, id: null, x: 0, y: 0, sx: 0, sy: 0, t: 0, vx: 0, vy: 0, dragging: false, type: "mouse" };
let touchSelected = null;

stage.addEventListener("pointerdown", (e) => {
  if (wall.locked) return;
  if (wall.idle !== undefined) wall.idle = 0;
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
    labelPos.tx = e.clientX;
    labelPos.ty = e.clientY;
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
  if (wall.bringToFront && wall.bringToFront(tile)) return;
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
  buddy.hide();
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
  if (settings.buddy) buddy.show();
  if (instant === true) {
    wall.opened.open = 0;
    wall.opened = null;
    wall.locked = false;
    return;
  }
  wall.close();
}
$("#detailBack").addEventListener("click", () => closeDetail());
function replay() {
  closeDetail(true);
  intro();
}
$("#replay").addEventListener("click", replay);

/* ── tuning panel ────────────────────────────────────── */
const gui = new GUI({ title: "czucie / feel" });
if (window.innerWidth < 640) gui.close();
gui.add(settings, "layout", ["orbita", "siatka"]).name("układ projektów").onChange(setLayout);
const f0 = gui.addFolder("orbita");
f0.add(settings, "orbitSpin", 0, 80, 1).name("samoczynny obrót");
f0.add(settings, "orbitBlur", 0, 6, 0.1).name("rozmycie kart z tyłu");
f0.add(settings, "orbitPerProject", 1, 4, 1).name("kart na projekt").onFinishChange(resize);
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
gui.add(settings, "buddy").name("mała Nuri na stronie").onChange((on) => (on ? buddy.show() : buddy.hide()));
gui.add(settings, "reducedMotion").name("mniej ruchu (a11y)");
gui.add({ replay }, "replay").name("powtórz intro");

/* ── loop ────────────────────────────────────────────── */
const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  wall.update(dt);
  dots.update(t, wall.offset);
  buddy.update(dt, { wall, vw, vh, mouse, t });
  if (Math.abs(wall.vel.x) + Math.abs(wall.vel.y) > 0.05) updateHover();

  labelPos.x = THREE.MathUtils.lerp(labelPos.x, labelPos.tx, 0.25);
  labelPos.y = THREE.MathUtils.lerp(labelPos.y, labelPos.ty, 0.25);
  if (touchSelected) {
    // on touch the name sits under the tapped tile and travels with it
    const tw = touchSelected.sw || touchSelected.w;
    const th = touchSelected.sh || touchSelected.h;
    labelPos.x = touchSelected.x + vw / 2 - tw / 2;
    labelPos.y = vh / 2 - touchSelected.y + th / 2 + 10;
  }
  label.style.transform = `translate3d(${labelPos.x}px, ${labelPos.y}px, 0)`;

  // the front card's name sits under its left edge; hover hands it to the cursor label
  const front = wall.front;
  const showCaption = !!front && !wall.opened && !wall.hovered && wall.reveal > 0.6;
  caption.classList.toggle("is-visible", showCaption);
  if (front) {
    if (caption.dataset.key !== front.shot.project.key) {
      caption.dataset.key = front.shot.project.key;
      captionName.textContent = front.shot.project.name;
      captionCat.textContent = front.shot.project.cat;
    }
    const gap = (vw < 640 ? 18 : 22) * wall.unit;
    caption.style.transform = `translate3d(${vw / 2 + front.x - front.sw / 2}px, ${vh / 2 - front.y + front.sh / 2 + gap}px, 0)`;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

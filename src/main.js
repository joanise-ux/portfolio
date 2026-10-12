/* The portfolio's home page — the two signature effects on placeholder content:
   1. the project wall: an orbit of cards (orbit.js) or the infinite
      Phantom-style grid (canvas.js), switchable in the panel
   2. the dot field that forms Nuri in the intro (dots.js)
   This is the home page. Add ?panel to the address to tune the feel with
   the panel in the corner. */

import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { InfiniteCanvas } from "./canvas.js";
import { Orbit } from "./orbit.js";
import { Dots } from "./dots.js";
import { Buddy } from "./buddy.js";
import { CasePage } from "./case.js";
import { ProjectList } from "./list.js";
import { Pages } from "./pages.js";
import { LANG, UI, saveLang } from "./i18n.js";
import { PROJECTS, buildShots, shuffled } from "./tiles.js";

const $ = (s) => document.querySelector(s);
const stage = $("#stage");
const label = $("#cursorLabel");
const caption = $("#caption");
const captionName = caption.querySelector(".caption__name");
const captionCat = caption.querySelector(".caption__cat");
const labelName = label.querySelector(".cursor-label__name");
const hint = $("#hint");

/* ── language ────────────────────────────────────────── */
document.documentElement.lang = LANG;
document.title = UI.title;
stage.setAttribute("aria-label", UI.aria.stage);
hint.textContent = UI.hint;
$(".dock").setAttribute("aria-label", UI.aria.nav);
$("#replay").setAttribute("aria-label", UI.aria.replay);
$("#list").setAttribute("aria-label", UI.aria.projects);
$("#langSwitch").setAttribute("aria-label", UI.aria.lang);
$("#viewSwitch").setAttribute("aria-label", UI.aria.view);
$('[data-view="orbita"]').setAttribute("aria-label", UI.aria.orbit);
$('[data-view="lista"]').setAttribute("aria-label", UI.aria.list);
for (const a of document.querySelectorAll(".dock [data-go]")) a.textContent = UI.nav[a.dataset.go];
for (const b of $("#langSwitch").children) {
  b.classList.toggle("is-on", b.dataset.lang === LANG);
  b.setAttribute("aria-pressed", b.dataset.lang === LANG);
}

/* The switch saves the choice and reloads; `resume` carries where the
   visitor was across that reload, so only the words change. */
const RESUME_KEY = "portfolio.resume";
const resume = JSON.parse(sessionStorage.getItem(RESUME_KEY) || "null");
sessionStorage.removeItem(RESUME_KEY);
$("#langSwitch").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  // a tap on the current language flips to the other: on a phone the pair is one small target
  const lang = b.dataset.lang === LANG ? (LANG === "pl" ? "en" : "pl") : b.dataset.lang;
  saveLang(lang);
  sessionStorage.setItem(RESUME_KEY, JSON.stringify({ view: settings.view, project: wall.opened ? wall.opened.shot.project.key : null }));
  location.reload();
});

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Everything the panel can tune. Values here are the starting "feel". */
const settings = {
  accent: "#f0532a", // persymona
  view: "orbita", // "orbita" = the wall below, "lista" = the plain list (switch in the navbar)
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
const list = new ProjectList({ root: $("#list"), projects: PROJECTS, shotOf: (p) => shots.find((s) => s.project === p), onOpen: openFromList });
const pages = new Pages({ roots: { about: $("#about"), kontakt: $("#kontakt") } });
const page = new CasePage({ root: $("#case"), settings, onBack: () => leave(), onNext: () => openNext() });
if (import.meta.env.DEV) window.__lab = { walls, dots, buddy, settings, renderer, gsap };

const listing = () => settings.view === "lista";
let section = "work"; // the stop on the navbar: work | about | kontakt
const onWall = () => section === "work" && !listing();

/* Only the chosen wall is drawn, and none of them under the list or a page. */
function showWall(animate) {
  for (const w of Object.values(walls)) w.group.visible = w === wall && onWall();
  if (!animate || !onWall()) return;
  gsap.killTweensOf(wall);
  gsap.fromTo(wall, { reveal: 0 }, { reveal: 1, duration: settings.reducedMotion ? 0 : 1.2, ease: "power2.out" });
}

function setLayout() {
  closeDetail(true);
  wall = walls[settings.layout];
  showWall(true);
}

function setView(view) {
  if (view === settings.view) return;
  closeDetail(true);
  settings.view = view;
  for (const b of $("#viewSwitch").children) {
    b.classList.toggle("is-on", b.dataset.view === view);
    b.setAttribute("aria-pressed", b.dataset.view === view);
  }
  wall.setHovered(null);
  mouse.inside = false;
  touchSelected = null;
  showLabel(null);
  stage.classList.remove("is-pointer");
  hint.classList.add("is-hidden");
  if (listing()) {
    list.show();
    buddy.hide();
  } else {
    list.hide();
    if (settings.buddy) buddy.show();
  }
  dots.setReading(listing());
  gui.show(!listing()); // the panel only tunes the wall, and it would cover the right column
  showWall(true);
}
$("#viewSwitch").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  // on a phone only the current view's icon is shown, and it flips to the other
  const other = b.dataset.view === "orbita" ? "lista" : "orbita";
  setView(b.classList.contains("is-on") ? other : b.dataset.view);
});

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
  // a case study stays open through a resize: the walls are rebuilt under it
  const reading = wall.opened && wall.opened.shot.project;
  for (const w of Object.values(walls)) {
    w.locked = false;
    w.layout(vw, vh);
  }
  if (reading) {
    page.fit();
    wall.cover = heroCover();
    wall.swapOpened(tileFor(reading));
  }
  dots.layout(vw, vh, pr);
}
resize();
showWall();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 150);
});

/* ── intro ───────────────────────────────────────────── */
function intro(skip) {
  buddy.hide();
  gsap.killTweensOf(wall);
  if (skip) {
    dots.settle();
    wall.reveal = 1;
    if (settings.buddy && onWall()) buddy.show();
    return;
  }
  wall.reveal = 0;
  dots.playIntro({
    onRelease: () => gsap.to(wall, { reveal: 1, duration: settings.reducedMotion ? 0 : 1.8, ease: "power2.out" }),
    onDone: () => settings.buddy && onWall() && buddy.show(),
  });
}
intro(!!resume); // not again after a language switch

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
  if (e.key === "Escape") return leave();
  if (wall.opened || !onWall()) return; // the arrows scroll the page that is open
  const step = 140;
  const map = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
  if (map[e.key]) {
    e.preventDefault();
    wall.pan(...map[e.key]);
  }
});

/* ── open / close ────────────────────────────────────── */
const tileFor = (project) => wall.tiles.find((t) => t.shot.project === project);
const nextOf = (project) => PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

/* The hero of the case study, as the rect an opened card flies to. */
function heroCover() {
  const r = page.heroRect();
  return { x: r.left + r.width / 2 - vw / 2, y: vh / 2 - r.top - r.height / 2, w: r.width, h: r.height, r: r.radius };
}

function fillPage(tile) {
  page.render(tile.shot, tileFor(nextOf(tile.shot.project)).shot);
  wall.cover = heroCover();
  document.documentElement.classList.add("is-reading");
}

/* An open case study is a history entry, so the browser's Back (button,
   two-finger swipe, Alt+←) closes it. Moving on to the next project
   replaces the entry: Back always lands on the wall or the list. */
const urlFor = (project) => `#${project.name.toLowerCase().replaceAll(" ", "-")}`;
function remember(project, replace) {
  history[replace ? "replaceState" : "pushState"]({ project: project.key }, "", urlFor(project));
}
function leave() {
  if (history.state?.project) history.back();
  else closeDetail();
}
/* The stop an address stands for; a typed or linked #about has no state yet. */
const sectionAt = (state) => state?.section || ["about", "kontakt"].find((n) => location.hash === `#${n}`) || "work";
window.addEventListener("popstate", (e) => {
  const project = PROJECTS.find((p) => p.key === e.state?.project);
  showSection(sectionAt(e.state));
  if (project) openPlain(project); // Forward, back into a project
  else closeDetail();
});

/* ── work / about / kontakt ─────────────────────────────
   `showSection` puts a stop on screen; `go` is a click on a link to it and
   also writes the history entry, so Back walks through the stops. */
function showSection(name) {
  if (name === section) return;
  closeDetail(true, true);
  section = name;
  const home = name === "work";
  pages.show(home ? null : name);
  for (const a of document.querySelectorAll(".dock [data-go]")) {
    a.classList.toggle("is-active", a.dataset.go === name);
    a.toggleAttribute("aria-current", a.dataset.go === name);
  }
  $(".dock").classList.toggle("is-plain", !home); // the orbit / list switch belongs to Work
  if (home && listing()) list.show();
  else list.hide();
  if (onWall() && settings.buddy) buddy.show();
  else buddy.hide();
  dots.setReading(!onWall());
  gui.show(onWall());
  showWall(true);
}

function go(name) {
  if (name === "work" && wall.opened) return leave();
  if (name === section) return;
  const entry = [name === "work" ? null : { section: name }, "", name === "work" ? location.pathname : `#${name}`];
  // from inside a case study the new stop takes over its history entry
  if (wall.opened) {
    closeDetail(true, true);
    history.replaceState(...entry);
  } else history.pushState(...entry);
  showSection(name);
}
$(".dock").addEventListener("click", (e) => {
  const a = e.target.closest("[data-go]");
  if (!a) return;
  e.preventDefault();
  go(a.dataset.go);
});

function openDetail(tile) {
  showLabel(null);
  touchSelected = null;
  stage.classList.remove("is-pointer");
  hint.classList.add("is-hidden");
  fillPage(tile);
  dots.setReading(true);
  buddy.hide();
  gui.hide(); // the panel tunes the wall, and it would sit on top of the page
  wall.open(tile);
  page.show(settings.reducedMotion ? 0 : 0.6);
  remember(tile.shot.project);
}

/* No card to fly (from the list, or the browser's Forward): the page simply fades in. */
function openPlain(project) {
  const tile = tileFor(project);
  fillPage(tile);
  wall.swapOpened(tile);
  dots.setReading(true);
  buddy.hide();
  gui.hide();
  page.show();
}
function openFromList(project) {
  openPlain(project);
  remember(project);
}

function openNext() {
  const tile = tileFor(nextOf(wall.opened.shot.project));
  page.swap(() => {
    fillPage(tile);
    wall.swapOpened(tile);
    remember(tile.shot.project, true);
  });
}

/* `keep` leaves the history entry alone, for a caller that rewrites it itself. */
function closeDetail(instant, keep) {
  if (!wall.opened) return;
  if (!keep && history.state?.project) history.back(); // closed some other way than Back (view switch, intro replay)
  document.documentElement.classList.remove("is-reading");
  page.hide();
  gui.show(!listing());
  if (listing()) list.refocus();
  else {
    dots.setReading(false);
    if (settings.buddy) buddy.show();
  }
  if (instant === true || listing()) {
    wall.opened.open = 0;
    wall.opened = null;
    wall.locked = false;
    return;
  }
  wall.close();
}
function replay() {
  if (wall.opened) closeDetail(true);
  else go("work");
  setView("orbita");
  intro();
}
$("#replay").addEventListener("click", replay);

/* ── tuning panel ────────────────────────────────────── */
const gui = new GUI({ title: "czucie / feel" });
document.documentElement.classList.toggle("has-panel", new URLSearchParams(location.search).has("panel"));
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
gui.add(settings, "buddy").name("mała Nuri na stronie").onChange((on) => (on && onWall() ? buddy.show() : buddy.hide()));
gui.add(settings, "reducedMotion").name("mniej ruchu (a11y)");
gui.add({ replay }, "replay").name("powtórz intro");

/* A reload keeps About / Kontakt; a project address starts on the wall. */
if (sectionAt() !== "work") showSection(sectionAt());
else if (location.hash) history.replaceState(null, "", location.pathname);
if (resume) {
  setView(resume.view);
  const project = PROJECTS.find((p) => p.key === resume.project);
  if (project && section === "work") openFromList(project);
}

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
  const showCaption = !!front && !wall.opened && !wall.hovered && wall.reveal > 0.6 && onWall();
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

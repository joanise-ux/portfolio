/* CasePage — the project page a card opens into, laid out after
   design/v2/Case study.dc.html.

   The page is plain DOM over the canvas. Its hero is drawn in CSS as the
   same card the wall shows, so the WebGL card can fly to the hero's place
   and the page fades in on top of it. Images rise in once as they scroll
   into view; text never animates. The back button stays pinned to the top
   corner, so the way out is there at any scroll depth. */

import { caseFor } from "./cases.js";
import { UI } from "./i18n.js";
import { FILL, EYES } from "./nuri.js";
import { cardStyle, cardSpot } from "./tiles.js";

const RISE = 72; // px an image travels as it comes in
const TRIGGER = 0.9; // …once its top edge passes this share of the screen height

const NURI = `<svg viewBox="0 24 196 160" aria-hidden="true">
  <path d="${FILL[1]}"/><path d="${FILL[0]}"/>
  <g class="case__nuri-blush"><ellipse cx="60" cy="130" rx="8" ry="4.5"/><ellipse cx="136" cy="130" rx="8" ry="4.5"/></g>
  <g class="case__nuri-face">${EYES.map((e) => `<ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/>`).join("")}</g>
  <path class="case__nuri-mouth" d="M91 121 q3.5 5 7 0 q3.5 5 7 0"/>
</svg>`;

const shot = (label, kind) => `<figure class="case__shot case__shot--${kind}" data-reveal><figcaption>${label}</figcaption></figure>`;

function markup(s, next) {
  const p = s.project;
  const c = caseFor(p);
  return `
    <button class="case__back" type="button" data-back>${UI.back}</button>
    <header class="case__top">
      <div class="case__hero" ${cardStyle(s)}>
        ${cardSpot(s)}
        <span class="case__hero-label">${c.hero}</span>
        <div class="case__hero-title">
          <span class="case__tag">${p.cat}</span>
          <h1 data-fit>${p.name}</h1>
        </div>
      </div>
    </header>

    <div class="case__body">
      <div class="case__meta">
        <dl>${c.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
        ${c.link ? `<a class="case__link" href="${c.link.href}"><span>${c.link.label}</span><span>→</span></a>` : ""}
      </div>

      <p class="case__lead">${c.lead}</p>

      <section class="case__split">
        <div class="prose">
          <span class="eyebrow">${UI.problem}</span>
          <h2>${c.problem.title}</h2>
          ${c.problem.text.map((t) => `<p>${t}</p>`).join("")}
        </div>
        ${shot(c.problem.image, "tall")}
      </section>

      <section class="case__process">
        <div class="prose">
          <span class="eyebrow">${UI.process}</span>
          <h2>${c.process.title}</h2>
        </div>
        <ol>
          ${c.process.steps
            .map(
              (step, i) => `<li class="case__step">
                ${shot(step.image, "wide")}
                <div class="prose">
                  <span class="num">0${i + 1}</span>
                  <h3>${step.title}</h3>
                  <p>${step.text}</p>
                </div>
              </li>`
            )
            .join("")}
        </ol>
      </section>

      <section class="case__gallery">
        <span class="eyebrow">${UI.gallery}</span>
        <div class="case__grid">
          <figure class="case__shot case__shot--video" data-reveal>
            <span class="case__play" role="img" aria-label="${UI.aria.play}"></span>
            <figcaption>${c.gallery.video}</figcaption>
          </figure>
          ${c.gallery.phones.map((label) => shot(label, "tall")).join("")}
          ${shot(c.gallery.detail, "square")}
          <p class="case__note">${c.gallery.note}</p>
        </div>
      </section>

      <section class="case__result">
        <div class="prose">
          <span class="eyebrow">${UI.result}</span>
          <h2>${c.result.title}</h2>
          <p>${c.result.text}</p>
        </div>
        <ul class="case__stats">
          ${c.result.stats.map(([n, label]) => `<li><strong>${n}</strong><span>${label}</span></li>`).join("")}
        </ul>
      </section>
    </div>

    <footer class="case__next">
      <span class="case__nuri">${NURI}</span>
      <a class="case__next-card" href="#" data-next ${cardStyle(next)}>
        ${cardSpot(next)}
        <span class="case__next-text">
          <span class="eyebrow">${UI.next}</span>
          <span class="case__next-name" data-fit>${next.project.name}</span>
        </span>
        <span class="case__next-arrow" aria-hidden="true">→</span>
      </a>
    </footer>`;
}

export class CasePage {
  constructor({ root, settings, onBack, onNext }) {
    this.root = root;
    this.s = settings;
    this.waiting = [];
    this.swapTimer = 0;
    root.inert = true;

    root.addEventListener("click", (e) => {
      const link = e.target.closest("a, button");
      if (!link) return;
      if (link.getAttribute("href") === "#") e.preventDefault(); // placeholder links
      if (link.matches("[data-back]")) onBack();
      if (link.matches("[data-next]")) onNext();
    });
    root.addEventListener("scroll", () => this.reveal(), { passive: true });
  }

  /* `shot` is the card that was opened, `next` the card of the next project. */
  render(shot, next) {
    this.root.innerHTML = markup(shot, next);
    this.root.scrollTop = 0;
    this.fit();
    this.waiting = this.s.reducedMotion ? [] : [...this.root.querySelectorAll("[data-reveal]")];
    this.waiting.forEach((el) => el.classList.add("is-waiting"));
    this.reveal();
  }

  /* One long word (Nieruchomości) must not run off a narrow screen. */
  fit() {
    this.root.querySelectorAll("[data-fit]").forEach((el) => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > 24) el.style.fontSize = `${(size *= 0.94)}px`;
    });
  }

  reveal() {
    if (!this.waiting.length) return;
    const line = this.root.clientHeight * TRIGGER;
    const top = this.root.getBoundingClientRect().top;
    this.waiting = this.waiting.filter((el) => {
      // the waiting image is drawn RISE lower than where it will rest
      if (el.getBoundingClientRect().top - top - RISE > line) return true;
      el.classList.remove("is-waiting");
      return false;
    });
  }

  /* Where the hero sits with the page scrolled to the top, in screen px. */
  heroRect() {
    const hero = this.root.querySelector(".case__hero");
    const r = hero.getBoundingClientRect();
    return { left: r.left, top: r.top + this.root.scrollTop, width: r.width, height: r.height, radius: parseFloat(getComputedStyle(hero).borderRadius) };
  }

  /* `delay` holds the fade back while the card is still flying to the hero. */
  show(delay = 0) {
    clearTimeout(this.swapTimer);
    this.root.style.setProperty("--case-delay", `${delay}s`);
    this.root.classList.add("is-open");
    this.root.inert = false;
    this.root.querySelector("[data-back]").focus({ preventScroll: true });
  }

  hide() {
    clearTimeout(this.swapTimer);
    this.root.classList.remove("is-open");
    this.root.inert = true;
  }

  /* Fade out, let the caller change what is on the page, fade back in. */
  swap(change) {
    this.hide();
    this.swapTimer = setTimeout(() => {
      change();
      this.show();
    }, 260);
  }
}

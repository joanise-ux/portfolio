/* Pages — About and Kontakt, the two other stops on the navbar
   (design/v2/About.dc.html, Kontakt.dc.html). Plain DOM over the canvas,
   like the case study; the copy lives in profile.js. */

import { ABOUT, KONTAKT, CONTACT } from "./profile.js";
import { UI } from "./i18n.js";
import { sampleShape, shapeSpacing } from "./nuri.js";
import { Walker } from "./walker.js";

const WHO = `<div class="page__who"><span>Joanna Żuczkowska</span><span>UX/UI designer</span></div>`;
const cvLink = (cls) => `<a class="${cls}" href="${CONTACT.cv.href}" download="${CONTACT.cv.download}">${UI.getCv}</a>`;
/* Where Nuri sits in a section; walker.js moves her between them. */
const PERCH = `<span class="about__perch" aria-hidden="true"></span>`;
const linkedin = `<a class="link-arrow" href="${CONTACT.linkedin}" target="_blank" rel="noopener">LinkedIn →</a>`;

function about() {
  const a = ABOUT;
  return `${WHO}
    <div class="about">
      <section class="about__hello">
        ${PERCH}
        <span class="about__mark" data-fit>hello</span>
        <p>${a.intro}</p>
      </section>

      <section class="about__me">
        <div class="about__perch about__perch--me" aria-hidden="true"></div>
        <div class="prose">
          <span class="eyebrow">${UI.aboutMe}</span>
          <h2>${a.me.title}</h2>
          ${a.me.text.map((t) => `<p>${t}</p>`).join("")}
        </div>
      </section>

      <section class="about__block">
        ${PERCH}
        <div class="prose"><span class="eyebrow">${UI.services}</span><h2>${a.services.title}</h2></div>
        <ol class="about__services">
          ${a.services.items.map(([title, text], i) => `<li><span class="num">0${i + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join("")}
        </ol>
      </section>

      <section class="about__block">
        ${PERCH}
        <div class="prose"><span class="eyebrow">${UI.experience}</span><h2>${a.experience.title}</h2></div>
        <ul class="about__jobs">
          ${a.experience.rows.map(([when, role, where]) => `<li><span>${when}</span><strong>${role}</strong><span>${where}</span></li>`).join("")}
        </ul>
      </section>

      <section class="about__kit">
        ${PERCH}
        <div>
          <span class="eyebrow">${UI.tools}</span>
          <ul class="about__tools">${a.tools.map((t) => `<li>${t}</li>`).join("")}</ul>
        </div>
        <div>
          <span class="eyebrow">cv</span>
          <div class="about__cv">${cvLink("btn")}${linkedin}</div>
        </div>
      </section>
    </div>
`;
}

/* Nuri drawn in dots, the way the intro draws her. */
function dotNuri(count) {
  const pts = sampleShape(count, 1);
  const r = shapeSpacing(count, 1) * 0.45;
  let d = "";
  for (let i = 0; i < pts.length; i += 2) d += `<circle cx="${pts[i].toFixed(4)}" cy="${(-pts[i + 1]).toFixed(4)}" r="${r.toFixed(4)}"/>`;
  return `<svg class="kontakt__nuri" viewBox="-0.5 -0.44 1 1" role="img" aria-label="${UI.aria.dotNuri}">${d}</svg>`;
}

function kontakt() {
  const k = KONTAKT;
  return `${WHO}
    <div class="kontakt">
      <div class="kontakt__intro">
        <span class="eyebrow">${UI.contact}</span>
        <h1>${k.title}</h1>
        <a class="kontakt__mail" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
        <div class="kontakt__links">${linkedin}${cvLink("btn btn--line")}</div>
      </div>
      ${dotNuri(320)}
    </div>`;
}

export class Pages {
  /* `roots` is { about, kontakt }. */
  constructor({ roots }) {
    this.roots = roots;
    roots.about.innerHTML = about();
    roots.kontakt.innerHTML = kontakt();
    for (const root of Object.values(roots)) root.inert = true;
    this.walker = new Walker({
      about: roots.about.querySelector(".about"),
      label: UI.aria.dotNuri,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    window.addEventListener("resize", () => this.fit());
  }

  /* Open one page, or none with `null`. */
  show(name) {
    for (const [key, root] of Object.entries(this.roots)) {
      const on = key === name;
      if (on && root.inert) root.scrollTop = 0;
      root.classList.toggle("is-open", on);
      root.inert = !on;
    }
    if (name === "about") this.walker.start();
    else this.walker.stop();
    if (!name) return;
    this.fit();
    this.roots[name].focus({ preventScroll: true });
  }

  /* On a narrow screen "hello" is as wide as the column. */
  fit() {
    const el = this.roots.about.querySelector("[data-fit]");
    el.style.fontSize = "";
    if (window.innerWidth >= 900) return;
    el.style.fontSize = "100px";
    const w = el.offsetWidth;
    if (w) el.style.fontSize = `${(100 * el.parentElement.clientWidth * 0.985) / w}px`;
  }
}

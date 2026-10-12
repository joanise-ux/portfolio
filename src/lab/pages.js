/* Pages — About and Kontakt, the two other stops on the navbar
   (design/v2/About.dc.html, Kontakt.dc.html). Plain DOM over the canvas,
   like the case study; the copy lives in profile.js. */

import { ABOUT, KONTAKT, CONTACT } from "./profile.js";
import { UI } from "./i18n.js";
import { sampleShape, shapeSpacing } from "./nuri.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KEYS = ["name", "email", "msg"];

const WHO = `<div class="page__who"><span>Joanna Żuczkowska</span><span>UX/UI designer</span></div>`;
const cvLink = (cls) => `<a class="${cls}" href="${CONTACT.cv.href}" download="${CONTACT.cv.download}">${UI.getCv}</a>`;
const linkedin = `<a class="link-arrow" href="${CONTACT.linkedin}" target="_blank" rel="noopener">LinkedIn →</a>`;

function about() {
  const a = ABOUT;
  return `${WHO}
    <div class="about">
      <section class="about__hello">
        <span class="about__mark" data-fit>hello</span>
        <p>${a.intro}</p>
      </section>

      <section class="about__me">
        <figure class="about__portrait"><img src="${a.portrait}" alt="Joanna Żuczkowska" loading="lazy" /></figure>
        <div class="prose">
          <span class="eyebrow">${UI.aboutMe}</span>
          <h2>${a.me.title}</h2>
          ${a.me.text.map((t) => `<p>${t}</p>`).join("")}
        </div>
      </section>

      <section class="about__block">
        <div class="prose"><span class="eyebrow">${UI.services}</span><h2>${a.services.title}</h2></div>
        <ol class="about__services">
          ${a.services.items.map(([title, text], i) => `<li><span class="num">0${i + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join("")}
        </ol>
      </section>

      <section class="about__block">
        <div class="prose"><span class="eyebrow">${UI.experience}</span><h2>${a.experience.title}</h2></div>
        <ul class="about__jobs">
          ${a.experience.rows.map(([when, role, where]) => `<li><span>${when}</span><strong>${role}</strong><span>${where}</span></li>`).join("")}
        </ul>
      </section>

      <section class="about__kit">
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

function field(key) {
  const f = KONTAKT.fields[key];
  const attrs = `id="k-${key}" name="${key}" placeholder="${f.placeholder}" aria-describedby="k-${key}-err"`;
  return `<div class="field">
    <label for="k-${key}">${f.label}</label>
    ${key === "msg" ? `<textarea ${attrs}></textarea>` : `<input ${attrs} type="${f.type}" autocomplete="${f.autocomplete}" />`}
    <span class="field__err" id="k-${key}-err" role="alert" hidden></span>
  </div>`;
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
      <div class="kontakt__card">
        <form class="kontakt__form" novalidate>
          ${KEYS.map(field).join("")}
          <div class="kontakt__send">
            <button class="btn" type="submit">${k.submit}</button>
            <span class="field__err" data-send-err role="alert" hidden></span>
            <span class="kontakt__note">${k.note}</span>
          </div>
        </form>
        <div class="kontakt__sent" hidden tabindex="-1">
          <span data-nuri></span>
          <h2></h2>
          <p></p>
          <button class="kontakt__again" type="button">${k.again}</button>
        </div>
      </div>
    </div>`;
}

export class Pages {
  /* `roots` is { about, kontakt }. */
  constructor({ roots }) {
    this.roots = roots;
    roots.about.innerHTML = about();
    roots.kontakt.innerHTML = kontakt();
    for (const root of Object.values(roots)) root.inert = true;
    this.form();
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

  /* ── contact form ──────────────────────────────────── */
  form() {
    const root = this.roots.kontakt;
    const form = root.querySelector("form");
    const sent = root.querySelector(".kontakt__sent");
    const sendErr = root.querySelector("[data-send-err]");
    const input = (k) => form.elements[k];
    const mark = (k, msg) => {
      const err = root.querySelector(`#k-${k}-err`);
      input(k).setAttribute("aria-invalid", !!msg);
      err.hidden = !msg;
      err.textContent = msg || "";
    };
    const done = (copy, arg) => {
      sent.querySelector("[data-nuri]").innerHTML ||= dotNuri(320); // the same Nuri as the phone intro
      sent.querySelector("h2").textContent = copy.title;
      sent.querySelector("p").textContent = copy.text(arg);
      form.hidden = true;
      sent.hidden = false;
      sent.focus({ preventScroll: true });
    };

    KEYS.forEach((k) => input(k).addEventListener("input", () => mark(k, "")));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const v = Object.fromEntries(KEYS.map((k) => [k, input(k).value.trim()]));
      const E = KONTAKT.errors;
      const errors = {
        name: v.name ? "" : E.name,
        email: !v.email ? E.email : EMAIL_RE.test(v.email) ? "" : E.emailBad,
        msg: v.msg ? "" : E.msg,
      };
      KEYS.forEach((k) => mark(k, errors[k]));
      const first = KEYS.find((k) => errors[k]);
      if (first) return input(first).focus();

      sendErr.hidden = true;
      if (!CONTACT.formEndpoint) {
        // no backend: the visitor's own mail program sends it
        const subject = encodeURIComponent(KONTAKT.subject(v.name));
        const body = encodeURIComponent(`${v.msg}\n\n${v.name}\n${v.email}`);
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
        return done(KONTAKT.handed, CONTACT.email);
      }
      const button = form.querySelector("button");
      button.disabled = true;
      try {
        const res = await fetch(CONTACT.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: v.name, email: v.email, message: v.msg }),
        });
        if (!res.ok) throw new Error(res.status);
        done(KONTAKT.sent, v.email);
      } catch {
        sendErr.textContent = E.send(CONTACT.email);
        sendErr.hidden = false;
      } finally {
        button.disabled = false;
      }
    });

    root.querySelector(".kontakt__again").addEventListener("click", () => {
      form.reset();
      KEYS.forEach((k) => mark(k, ""));
      sent.hidden = true;
      form.hidden = false;
      input("name").focus();
    });
  }
}

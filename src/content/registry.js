/* ══════════════════════════════════════════════════════════════════
   REGISTRY — every window the desktop can open, keyed by id.

   `kind` picks the body renderer (see components/windows/), the rest
   is content. Rebuilt whenever the language changes, because most of
   it is translated copy.
   ══════════════════════════════════════════════════════════════════ */

import { DATA, stackGroups } from "./data.js";

const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function buildRegistry(t) {
  const d = t.docs;
  const reg = {};

  DATA.projects.forEach((p) => {
    const tp = t.projects[p.key] || {};
    reg[p.key] = {
      kind: "folder",
      title: p.slug,
      short: p.short,
      glyph: "▤",
      path: p.slug,
      kicker: tp.tagline || "",
      h1: p.name,
      desc: tp.description || "",
      count: t.shotCount((p.shots || []).length),
      study: tp.study || {},
      shots: p.shots || [],
    };
  });

  Object.assign(reg, {
    term: {
      kind: "term",
      title: `${t.term.title} — ${DATA.email.split("@")[0]}@neon-os`,
      short: "term",
      glyph: "›_",
    },
    bio: { kind: "doc", title: "bio.md", short: "bio", glyph: "▢", sections: [d.bio.kim, d.bio.jak] },
    exp: {
      kind: "doc",
      title: "doswiadczenie.md",
      short: "exp",
      glyph: "▢",
      sections: [
        { label: d.exp.expLabel, rows: d.exp.rows },
        { label: d.exp.eduLabel, rows: d.exp.edu },
        { label: d.exp.scopeLabel, text: d.bio.zakres },
      ],
    },
    tools: {
      kind: "doc",
      title: "narzedzia.md",
      short: "tools",
      glyph: "▢",
      sections: [
        {
          label: d.tools.label,
          rows: stackGroups(t).map((g) => ({ k: g.name, v: g.items.map((i) => i.n).join(" · ") })),
        },
      ],
    },
    kontakt: {
      kind: "doc",
      title: "kontakt.txt",
      short: "kontakt",
      glyph: "◨",
      sections: [
        {
          label: d.contact.channels,
          rows: [
            { k: "e-mail", v: DATA.email },
            { k: "linkedin", v: DATA.linkedin },
            ...DATA.social.map((s) => ({ k: s.label.toLowerCase(), v: s.handle })),
          ],
        },
        {
          label: d.contact.response,
          text: d.contact.text(t.responseTime, capitalise(t.availability)),
        },
      ],
    },
    mail: { kind: "mail", title: t.mail.title, short: "mail", glyph: "◨" },
    cv: {
      kind: "doc",
      title: DATA.cv.file,
      short: "cv",
      glyph: "▥",
      sections: [
        { label: d.cv.fileLabel, text: d.cv.fileText(DATA.cv.file, DATA.cv.size, DATA.cv.updated) },
        { label: d.cv.contentLabel, rows: d.cv.rows },
      ],
    },
    readme: {
      kind: "doc",
      title: "README.txt",
      short: "readme",
      glyph: "▢",
      sections: [
        { label: d.readme.howLabel, text: d.readme.howText },
        { label: d.readme.shortcutsLabel, rows: d.readme.rows },
      ],
    },
    stack: { kind: "editor", title: "stack.txt", short: "stack", glyph: "▢", groups: stackGroups(t) },
    kosz: {
      kind: "doc",
      title: d.trash.title,
      short: t.dock.trash,
      glyph: "▧",
      sections: [{ label: d.trash.label, text: d.trash.text }],
    },
  });

  return reg;
}

/* Window size per kind, clamped to the desktop. */
export function windowSize(kind, W, H) {
  switch (kind) {
    case "folder":
      return [Math.min(840, W - 120), Math.min(600, H - 150)];
    case "term":
      return [Math.min(680, W - 160), Math.min(430, H - 200)];
    case "mail":
      return [Math.min(620, W - 140), Math.min(560, H - 160)];
    default:
      return [Math.min(600, W - 160), Math.min(520, H - 180)];
  }
}

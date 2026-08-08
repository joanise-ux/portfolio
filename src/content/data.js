/* ══════════════════════════════════════════════════════════════════
   DATA — fakty (adresy, daty, pliki, nazwy własne).

   Wszystkie dane osobowe, kontaktowe i treści zmieniaj TYLKO tutaj;
   reszta aplikacji je odczytuje. Teksty widoczne dla użytkownika
   (tłumaczone) mieszkają w i18n.js.
   ══════════════════════════════════════════════════════════════════ */

/* Kafelek = wyeksportowany obraz. `file` to realna nazwa pliku w
   public/assets/, `src` to ścieżka. Nie dopisuj pozycji bez obrazu —
   siatka pokazuje wyłącznie podglądy. Pierwsza pozycja jest hero. */
const shot = (file) => ({ file, src: `/assets/${file}` });

/* Luźny plik graficzny leżący na pulpicie. `thumb` to WebP wycięty na
   dwukrotność pola, w którym się rysuje (`w`×`h` w pikselach pulpitu) —
   pulpit nigdy nie pobiera pełnego kadru, ten idzie dopiero do Quick
   Looka po kliknięciu. Oba pliki generuje się z eksportu do
   public/assets/desk/<slug>{-thumb}.webp. */
const deskImage = (name, w, h) => {
  const slug = name.replace(/\.[a-z0-9]+$/i, "");
  return {
    key: `img_${slug}`,
    name,
    w,
    h,
    thumb: `/assets/desk/${slug}-thumb.webp`,
    src: `/assets/desk/${slug}.webp`,
  };
};

/* Polaroid = inny materiał niż plik png: papier, ręczny podpis, klik
   prowadzi do treści (bio / case study), nie do podglądu. Maksymalnie
   dwa — jeden osobisty, jeden projektowy. */
const polaroid = (caption, slug, opens) => ({
  key: `pol_${slug}`,
  caption,
  opens,
  thumb: `/assets/desk/${slug}-thumb.webp`,
});

export const DATA = {
  name: "Joanna Żuczkowska",
  email: "joanna@neon-os.pl",
  linkedin: "https://www.linkedin.com/in/joannazuczkowska",
  city: "wrocław",
  careerStart: "2022-06", // start własnej działalności (RRRR-MM)
  learningStart: "2026-06-26", // start nauki koreańskiego (RRRR-MM-DD)
  learningGoalDays: 365, // cel: rok nauki
  learningLevel: "topik_1",
  social: [
    { label: "Behance", handle: "be.net/joannaz" },
    { label: "Instagram", handle: "@joanna.designs" },
  ],
  /* Jeden plik na język — pulpit podaje wersję zgodną z aktualnym
     językiem interfejsu (patrz cvFor niżej). */
  cv: {
    dir: "assets/",
    pl: {
      file: "cv_2026_pl.pdf",
      download: "Joanna_Zuczkowska_CV_PL.pdf",
      size: "247 KB",
      updated: "07.08.2026",
    },
    en: {
      file: "cv_2026_en.pdf",
      download: "Joanna_Zuczkowska_CV_EN.pdf",
      size: "205 KB",
      updated: "07.08.2026",
    },
  },
  building: {
    projectKey: "nature",
    meta: "design_system — v0.4",
    commits: 34,
    lastUpdate: "2d ago",
    progress: 62,
  },
  projects: [
    {
      key: "suoh",
      name: "SUOH",
      slug: "suoh/",
      short: "suoh",
      shots: [shot("suoh-hero.png"), shot("suoh-about.png")],
    },
    { key: "nature", name: "Nature Future", slug: "nature_future/", short: "nature", shots: [] },
    { key: "logtxt", name: "log.txt", slug: "log.txt", short: "log.txt", shots: [shot("logtxt-dashboard.png")] },
    { key: "web", name: "web_design", slug: "web_design/", short: "web", shots: [] },
    { key: "branding", name: "Kwartał Solna", slug: "branding/", short: "branding", shots: [] },
  ],
  stack: {
    design: ["figma", "adobe suite", "canva"],
    code: ["html / css", "javascript", "react", "sql", "supabase", "vercel"],
    ai: ["claude code", "claude design", "figma make"],
  },
};

/* Rozrzucone po pulpicie zdjęcia i zrzuty — kolejność jest kolejnością
   rysowania, więc dalsze pozycje nakładają się na wcześniejsze. */
export const DESK_IMAGES = [
  deskImage("suoh_detail_04.jpg", 176, 76),
  deskImage("suoh_studio_02.jpg", 132, 136),
  deskImage("logtxt_dash_v3.png", 172, 85),
  deskImage("logtxt_cards.png", 152, 72),
  deskImage("nav_dark.png", 72, 147),
  deskImage("logtxt_activity.png", 168, 67),
];

export const POLAROIDS = [
  polaroid("about_me.jpg", "about_me", "bio"),
  polaroid("logtxt_v3.png", "logtxt_polaroid", "logtxt"),
];

export const PROJECTS_BY_KEY = Object.fromEntries(DATA.projects.map((p) => [p.key, p]));

export const PROJECT_KEYS = DATA.projects.map((p) => p.key);

/* CV w języku interfejsu — polski jako zapasowy. */
export function cvFor(lang) {
  const c = DATA.cv[lang] || DATA.cv.pl;
  return { ...c, url: `/${DATA.cv.dir}${c.file}` };
}

/* Terminal `open <x>` accepts the key, the slug without a trailing
   slash, and the display name snake_cased. */
export const ALIASES = Object.fromEntries(
  DATA.projects.flatMap((p) => [
    [p.key, p.key],
    [p.slug.replace(/\/$/, ""), p.key],
    [p.name.toLowerCase().replace(/\s+/g, "_"), p.key],
  ])
);

export function yearsSinceCareerStart() {
  const [y0, m0] = DATA.careerStart.split("-").map(Number);
  const now = new Date();
  let y = now.getFullYear() - y0;
  if (now.getMonth() + 1 < m0) y -= 1;
  return Math.max(0, y);
}

export function daysSinceLearnStart() {
  const [y, m, d] = DATA.learningStart.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today - start) / 86400000));
}

export function learningPercent() {
  const goal = Math.max(1, DATA.learningGoalDays);
  return Math.max(0, Math.min(100, Math.floor((daysSinceLearnStart() / goal) * 100)));
}

export function stackGroups(t) {
  return Object.keys(DATA.stack).map((name) => ({
    name,
    items: DATA.stack[name].map((n) => ({ n, m: t.stackNotes[n] || "" })),
  }));
}

/* Language of the pages: the PL/EN switch wins and is remembered,
   otherwise a Polish browser gets Polish and every other one gets English.

   The language is fixed for the life of the page — the switch saves the
   choice and reloads — so content modules can simply pick their strings
   with `tr` as they load. */

const LANG_STORAGE_KEY = "portfolio.lang";

function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pl" || saved === "en") return saved;
  } catch {
    /* private mode / storage disabled — fall through to the browser's language */
  }
  return (navigator.language || "").toLowerCase().startsWith("pl") ? "pl" : "en";
}

export const LANG = detectLang();
export const tr = (byLang) => byLang[LANG];

export function saveLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage disabled: the choice just won't survive the reload */
  }
}

/* Interface strings; the copy of each page lives with that page's content. */
export const UI = tr({
  pl: {
    title: "Joanna Żuczkowska — portfolio",
    nav: { work: "Work", about: "About", kontakt: "Kontakt" },
    hint: "← przeciągnij →",
    back: "← wróć",
    problem: "problem",
    process: "proces",
    gallery: "galeria",
    prototypes: "prototypy",
    result: "rezultat",
    next: "następny projekt",
    aboutMe: "o mnie",
    services: "co robię",
    experience: "doświadczenie",
    tools: "narzędzia",
    getCv: "Pobierz CV",
    contact: "kontakt",
    aria: {
      nav: "Nawigacja",
      stage: "Płótno projektów — przeciągnij, żeby się poruszać",
      replay: "Nuri — odtwórz intro",
      buddy: "Nuri — kliknij albo przeciągnij",
      lang: "Język",
      view: "Widok projektów",
      orbit: "Widok orbita",
      list: "Widok lista",
      projects: "Projekty",
      play: "Odtwórz wideo",
      dotNuri: "Nuri z kropek",
    },
  },
  en: {
    title: "Joanna Żuczkowska — portfolio",
    nav: { work: "Work", about: "About", kontakt: "Contact" },
    hint: "← drag →",
    back: "← back",
    problem: "problem",
    process: "process",
    gallery: "gallery",
    prototypes: "prototypes",
    result: "result",
    next: "next project",
    aboutMe: "about me",
    services: "what I do",
    experience: "experience",
    tools: "tools",
    getCv: "Download CV",
    contact: "contact",
    aria: {
      nav: "Navigation",
      stage: "Project canvas — drag to move around",
      replay: "Nuri — replay the intro",
      buddy: "Nuri — click or drag",
      lang: "Language",
      view: "Project view",
      orbit: "Orbit view",
      list: "List view",
      projects: "Projects",
      play: "Play video",
      dotNuri: "Nuri made of dots",
    },
  },
});

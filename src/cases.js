/* Case study copy, one entry per project key (see PROJECTS in tiles.js),
   in both languages. Nature Future is the placeholder copy from
   design/v2/Case study.dc.html; projects without an entry get a neutral
   stand-in so the layout can be checked on every card. Every image is a
   label for now — add `src` next to a label when the real shots arrive. */

import { tr } from "./i18n.js";

const NF = {
  pl: {
    hero: "hero: strona główna",
    meta: [
      ["Rola", "UX/UI designer, research"],
      ["Rok", "2026"],
      ["Zakres", "Strona www, design system"],
      ["Narzędzia", "Figma, Maze, Webflow"],
    ],
    link: { label: "zobacz stronę", href: "#" },
    lead: "Strona fundacji klimatycznej, która zamienia długie raporty w krótkie historie, przez które chce się przewinąć do końca.",
    problem: {
      title: "Raporty, których nikt nie czytał",
      text: [
        "Fundacja co kwartał publikowała raport w PDF-ie liczący kilkadziesiąt stron. Strona była tylko miejscem, z którego się go pobierało, a większość odwiedzających wychodziła po kilku sekundach.",
        "Zespół chciał, żeby wyniki badań trafiały do osób spoza branży: nauczycieli, dziennikarzy i lokalnych samorządów. Bez zmiany formy treści nie dało się tego osiągnąć.",
      ],
      image: "obraz: stara strona, audyt",
    },
    process: {
      title: "Od arkusza do opowieści",
      steps: [
        {
          title: "Mapa treści",
          text: "Przejrzałam trzy ostatnie raporty i wypisałam pytania, na które odpowiadają. Z warsztatu z zespołem wyszło siedem tematów, które wracają co kwartał.",
          image: "obraz: mapa treści z warsztatu",
        },
        {
          title: "Makiety i testy",
          text: "Zbudowałam dwa warianty strony tematu i sprawdziłam je z ośmioma osobami. Wygrała wersja, w której dane pojawiają się dopiero po krótkim wstępie.",
          image: "obraz: makiety w Figmie",
        },
        {
          title: "System komponentów",
          text: "Ułożyłam bibliotekę bloków, z których redakcja składa nowe historie bez pomocy programisty. Każdy blok ma wersję na telefon i krótki opis użycia.",
          image: "obraz: biblioteka komponentów",
        },
      ],
    },
    gallery: {
      video: "wideo: przewijanie strony tematu · 0:42",
      phones: ["telefon: menu tematów", "telefon: artykuł"],
      detail: "detal: nawigacja",
      note: "Nawigacja tematów w trzech stanach: spoczynek, hover i aktywny.",
    },
    result: {
      title: "Co się zmieniło",
      text: "Po trzech miesiącach od startu strona przestała być miejscem do pobrania pliku. Ludzie czytają historie do końca i wracają do kolejnych tematów, a redakcja publikuje nowe treści sama, bez kolejki do programisty.",
      stats: [
        ["+00%", "czasu spędzanego na stronie tematu"],
        ["−00%", "odejść z pierwszego ekranu"],
        ["00", "historii opublikowanych samodzielnie przez redakcję"],
      ],
    },
  },
  en: {
    hero: "hero: home page",
    meta: [
      ["Role", "UX/UI designer, research"],
      ["Year", "2026"],
      ["Scope", "Website, design system"],
      ["Tools", "Figma, Maze, Webflow"],
    ],
    link: { label: "see the site", href: "#" },
    lead: "A website for a climate foundation that turns long reports into short stories you want to scroll to the end of.",
    problem: {
      title: "Reports nobody read",
      text: [
        "Every quarter the foundation published a PDF report dozens of pages long. The website was only the place you downloaded it from, and most visitors left within seconds.",
        "The team wanted the research to reach people outside the field: teachers, journalists and local councils. That could not happen without changing the form of the content.",
      ],
      image: "image: old site, audit",
    },
    process: {
      title: "From spreadsheet to story",
      steps: [
        {
          title: "Content map",
          text: "I went through the last three reports and wrote down the questions they answer. A workshop with the team gave seven topics that come back every quarter.",
          image: "image: content map from the workshop",
        },
        {
          title: "Wireframes and tests",
          text: "I built two versions of the topic page and tested them with eight people. The version where the data only appears after a short introduction won.",
          image: "image: wireframes in Figma",
        },
        {
          title: "Component system",
          text: "I put together a library of blocks the editors use to build new stories without a developer. Every block has a phone version and a short note on how to use it.",
          image: "image: component library",
        },
      ],
    },
    gallery: {
      video: "video: scrolling a topic page · 0:42",
      phones: ["phone: topic menu", "phone: article"],
      detail: "detail: navigation",
      note: "Topic navigation in three states: rest, hover and active.",
    },
    result: {
      title: "What changed",
      text: "Three months after launch the site is no longer a place to download a file. People read the stories to the end and come back for more topics, and the editors publish new content themselves, with no queue for a developer.",
      stats: [
        ["+00%", "time spent on a topic page"],
        ["−00%", "exits from the first screen"],
        ["00", "stories published by the editors on their own"],
      ],
    },
  },
};

export const CASES = { nf: tr(NF) };

const S = tr({
  pl: {
    meta: ["Rola", "Rok", "Zakres", "Narzędzia"],
    lead: (name) => `Jedno zdanie o projekcie ${name}: dla kogo powstał i co zmienia. Tekst zastępczy.`,
    problemTitle: "Punkt wyjścia",
    problemText: [
      "Tekst zastępczy. Tu będzie opis sytuacji sprzed projektu: kto miał problem i po czym było to widać.",
      "Drugi akapit: czego potrzebował zespół i dlaczego dotychczasowe rozwiązanie nie wystarczało.",
    ],
    problemImage: "obraz: punkt wyjścia",
    processTitle: "Jak powstawał",
    steps: ["Rozpoznanie", "Projekt", "Wdrożenie"],
    stepText: "Tekst zastępczy: dwa zdania o tym, co zrobiłam na tym etapie i co z niego wynikło.",
    stepImage: "obraz: etap",
    video: "wideo: przegląd projektu",
    screen: "ekran",
    detail: "detal",
    note: "Podpis do detalu, tekst zastępczy.",
    resultTitle: "Co się zmieniło",
    resultText: "Tekst zastępczy. Tu będzie krótkie podsumowanie tego, co projekt zmienił po wdrożeniu.",
    stats: ["opis pierwszej liczby", "opis drugiej liczby", "opis trzeciej liczby"],
  },
  en: {
    meta: ["Role", "Year", "Scope", "Tools"],
    lead: (name) => `One sentence about ${name}: who it was made for and what it changes. Placeholder text.`,
    problemTitle: "Starting point",
    problemText: [
      "Placeholder text. This will describe the situation before the project: who had a problem and how it showed.",
      "Second paragraph: what the team needed and why the existing solution was not enough.",
    ],
    problemImage: "image: starting point",
    processTitle: "How it was made",
    steps: ["Discovery", "Design", "Launch"],
    stepText: "Placeholder text: two sentences on what I did at this stage and what came out of it.",
    stepImage: "image: stage",
    video: "video: project overview",
    screen: "screen",
    detail: "detail",
    note: "Caption for the detail, placeholder text.",
    resultTitle: "What changed",
    resultText: "Placeholder text. A short summary of what the project changed after launch will go here.",
    stats: ["what the first number means", "what the second number means", "what the third number means"],
  },
});

function standIn(project) {
  return {
    hero: `hero: ${project.name.toLowerCase()}`,
    meta: [
      [S.meta[0], "UX/UI designer"],
      [S.meta[1], String(project.year)],
      [S.meta[2], project.cat],
      [S.meta[3], "Figma"],
    ],
    lead: S.lead(project.name),
    problem: { title: S.problemTitle, text: S.problemText, image: S.problemImage },
    process: {
      title: S.processTitle,
      steps: S.steps.map((title, i) => ({ title, text: S.stepText, image: `${S.stepImage} 0${i + 1}` })),
    },
    gallery: { video: S.video, phones: [`${S.screen} 01`, `${S.screen} 02`], detail: S.detail, note: S.note },
    result: { title: S.resultTitle, text: S.resultText, stats: S.stats.map((label) => ["00", label]) },
  };
}

export const caseFor = (project) => CASES[project.key] || standIn(project);

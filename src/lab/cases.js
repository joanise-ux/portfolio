/* Case study copy, one entry per project key (see PROJECTS in tiles.js).
   Nature Future is the placeholder copy from design/v2/Case study.dc.html;
   projects without an entry get a neutral stand-in so the layout can be
   checked on every card. Every image is a label for now — add `src` next to
   a label when the real shots arrive. */

export const CASES = {
  nf: {
    hero: "hero: strona główna",
    meta: [
      ["Rola", "UX/UI designer, research"],
      ["Rok", "2025"],
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
};

function standIn(project) {
  return {
    hero: `hero: ${project.name.toLowerCase()}`,
    meta: [
      ["Rola", "UX/UI designer"],
      ["Rok", String(project.year)],
      ["Zakres", project.cat],
      ["Narzędzia", "Figma"],
    ],
    lead: `Jedno zdanie o projekcie ${project.name}: dla kogo powstał i co zmienia. Tekst zastępczy.`,
    problem: {
      title: "Punkt wyjścia",
      text: [
        "Tekst zastępczy. Tu będzie opis sytuacji sprzed projektu: kto miał problem i po czym było to widać.",
        "Drugi akapit: czego potrzebował zespół i dlaczego dotychczasowe rozwiązanie nie wystarczało.",
      ],
      image: "obraz: punkt wyjścia",
    },
    process: {
      title: "Jak powstawał",
      steps: ["Rozpoznanie", "Projekt", "Wdrożenie"].map((title, i) => ({
        title,
        text: "Tekst zastępczy: dwa zdania o tym, co zrobiłam na tym etapie i co z niego wynikło.",
        image: `obraz: etap 0${i + 1}`,
      })),
    },
    gallery: {
      video: "wideo: przegląd projektu",
      phones: ["ekran 01", "ekran 02"],
      detail: "detal",
      note: "Podpis do detalu, tekst zastępczy.",
    },
    result: {
      title: "Co się zmieniło",
      text: "Tekst zastępczy. Tu będzie krótkie podsumowanie tego, co projekt zmienił po wdrożeniu.",
      stats: [
        ["00", "opis pierwszej liczby"],
        ["00", "opis drugiej liczby"],
        ["00", "opis trzeciej liczby"],
      ],
    },
  };
}

export const caseFor = (project) => CASES[project.key] || standIn(project);

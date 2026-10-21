/* Case study copy, one entry per project key (see PROJECTS in tiles.js),
   in both languages. Nature Future is the placeholder copy from
   design/v2/Case study.dc.html; projects without an entry get a neutral
   stand-in so the layout can be checked on every card. An image is either
   a label (a placeholder slot) or `{ src, alt }`; the gallery video is a
   label or `{ src, label }`. Optional: `brief` (short question and goal
   under the lead), an `eyebrow` on problem / process / result to rename
   that section, and `result.stats` (leave it out for no numbers). */

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

/* Atelier, the real estate site. Shots are framed screenshots of
   atelier-realestate.vercel.app (public/assets/cases/nr); the hero is the
   site's own Unsplash photo. */
const NR_DIR = "/assets/cases/nr";
const nrPic = (file, alt) => ({ src: `${NR_DIR}/${file}`, alt });

const NR = {
  pl: {
    hero: nrPic("nr-hero.jpg", "Nowoczesny dom nocą, zdjęcie z pierwszego ekranu strony Atelier"),
    meta: [
      ["Klient", "Projekt własny"],
      ["Rok", "2026"],
      ["Usługi", "UX/UI, web design, ton marki"],
      ["Narzędzia", "Claude"],
    ],
    link: { label: "zobacz stronę", href: "https://atelier-realestate.vercel.app/" },
    lead: "Atelier to koncept butikowego biura nieruchomości, które zamiast katalogu pokazuje trzy domy i mówi, dlaczego właśnie te.",
    brief: [
      ["Pytanie", "Jak pokazać dom za kilkanaście milionów, żeby strona nie wyglądała jak portal z ogłoszeniami?"],
      ["Cel", "Spokojna strona, która buduje zaufanie, zanim klient w ogóle zadzwoni."],
    ],
    problem: {
      eyebrow: "o projekcie",
      title: "Mniej ofert, więcej powodu",
      text: [
        "Atelier to mój projekt własny. Chciałam sprawdzić, jak wygląda strona biura premium, kiedy wyrzuci się z niej wszystko, co znamy z portali: filtry, dziesiątki ogłoszeń i formularze, które wyskakują po trzech sekundach.",
        "Zostało hasło, trzy oferty, cztery kroki współpracy i kontakt. Kierunek, treść i wszystkie decyzje są moje, a stronę złożyłam z pomocą AI. To przyspiesza pracę i pozwala mi szybko sprawdzić w działaniu, czy pomysł się broni.",
      ],
      image: nrPic("nr-start.webp", "Pierwszy ekran strony Atelier na telefonie"),
    },
    process: {
      eyebrow: "decyzje",
      title: "Trzy decyzje, które ułożyły stronę",
      steps: [
        {
          title: "Kierunek wizualny",
          text: "Zaczęłam od hasła „Nieruchomości wybrane, nie znalezione” i dopiero pod nie dobrałam resztę. Szeryfowy Cormorant Garamond w nagłówkach, prawie czarne tło i mosiężny akcent tylko w drobnych podpisach. Kolor wnoszą zdjęcia domów, więc nic z nimi nie konkuruje.",
          image: nrPic("nr-step-1.webp", "Pierwszy ekran z hasłem na zdjęciu domu nocą"),
        },
        {
          title: "Trzy oferty zamiast katalogu",
          text: "Biuro, które pracuje z niewieloma klientami, nie potrzebuje wyszukiwarki. Każda karta ma lokalizację, nazwę, metraż i cenę, nic więcej. Duże zdjęcia robią tu to, co na portalach robią filtry.",
          image: nrPic("nr-step-2.webp", "Sekcja z trzema wyróżnionymi nieruchomościami"),
        },
        {
          title: "Ruch, który nie ponagla",
          text: "Sekcje pojawiają się łagodnie przy przewijaniu, a zdjęcie na pierwszym ekranie przesuwa się wolniej niż tekst. Przy włączonym ograniczeniu ruchu strona po prostu stoi. Kontakt to trzy pola i dopisek „spotkania wyłącznie po umówieniu”, bez wyskakujących okienek.",
          image: nrPic("nr-step-3.webp", "Sekcje Jak pracujemy i Kontakt"),
        },
      ],
    },
    gallery: {
      video: { src: `${NR_DIR}/nr-scroll.webm`, label: "Przewijanie strony Atelier od góry do dołu" },
      phones: [
        nrPic("nr-phone-1.webp", "Wyróżnione nieruchomości na telefonie"),
        nrPic("nr-phone-2.webp", "Sekcja Jak pracujemy na telefonie"),
      ],
      detail: nrPic("nr-detail.webp", "Karta oferty po najechaniu kursorem"),
      note: "Karta oferty po najechaniu: zdjęcie powoli się przybliża i przygasa, a tekst zostaje na swoim miejscu.",
    },
    result: {
      eyebrow: "efekt",
      title: "Strona, która mówi mniej",
      text: "Atelier pokazuje, że w segmencie premium liczy się też to, czego na stronie nie ma. Każda sekcja ma jedno zadanie, a całość działa tak samo dobrze na telefonie jak na dużym ekranie. Z tego projektu biorę ton, który mogę przenieść na stronę prawdziwego biura.",
    },
  },
  en: {
    hero: nrPic("nr-hero.jpg", "A modern house at night, the photo from the first screen of the Atelier site"),
    meta: [
      ["Client", "Personal project"],
      ["Year", "2026"],
      ["Services", "UX/UI, web design, brand voice"],
      ["Tools", "Claude"],
    ],
    link: { label: "see the site", href: "https://atelier-realestate.vercel.app/" },
    lead: "Atelier is a concept for a boutique real estate agency that shows three houses instead of a catalogue, and says why these three.",
    brief: [
      ["The question", "How do you show a house worth millions without the site looking like a listings portal?"],
      ["The goal", "A calm site that builds trust before the client even picks up the phone."],
    ],
    problem: {
      eyebrow: "overview",
      title: "Fewer offers, more reason",
      text: [
        "Atelier is a personal project. I wanted to see what a premium agency site looks like once you take out everything we know from portals: filters, dozens of listings and forms that pop up after three seconds.",
        "What's left is a headline, three offers, four steps of working together and a contact form. The direction, the copy and every decision are mine, and I put the site together with AI. It speeds the work up and lets me quickly see a working version and check whether the idea holds up.",
      ],
      image: nrPic("nr-start.webp", "The first screen of the Atelier site on a phone"),
    },
    process: {
      eyebrow: "decisions",
      title: "Three decisions that shaped the site",
      steps: [
        {
          title: "Visual direction",
          text: "I started with the headline, “Properties chosen, not found,” and fitted the rest to it. Cormorant Garamond serif for headings, an almost black background and a brass accent kept to small labels. The colour comes from the photos of the houses, so nothing competes with them.",
          image: nrPic("nr-step-1.webp", "The first screen with the headline over a house at night"),
        },
        {
          title: "Three offers instead of a catalogue",
          text: "An agency that works with few clients doesn't need a search engine. Each card has a location, a name, the floor area and the price, nothing more. Large photos do the job that filters do on portals.",
          image: nrPic("nr-step-2.webp", "The section with three featured properties"),
        },
        {
          title: "Motion that doesn't rush you",
          text: "Sections fade in gently as you scroll, and the photo on the first screen moves slower than the text. With reduced motion turned on, the page simply stays still. Contact is three fields and a note, “meetings by appointment only”, with no pop-ups.",
          image: nrPic("nr-step-3.webp", "The How we work and Contact sections"),
        },
      ],
    },
    gallery: {
      video: { src: `${NR_DIR}/nr-scroll.webm`, label: "Scrolling the Atelier site from top to bottom" },
      phones: [
        nrPic("nr-phone-1.webp", "Featured properties on a phone"),
        nrPic("nr-phone-2.webp", "The How we work section on a phone"),
      ],
      detail: nrPic("nr-detail.webp", "An offer card on hover"),
      note: "An offer card on hover: the photo slowly zooms in and dims, while the text stays where it is.",
    },
    result: {
      eyebrow: "outcome",
      title: "A site that says less",
      text: "Atelier shows that in the premium segment, what the site leaves out matters too. Every section has one job, and the whole thing works as well on a phone as on a big screen. What I take from it is a tone I can carry over to a real agency's site.",
    },
  },
};

export const CASES = { nf: tr(NF), nr: tr(NR) };

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

/* Case study copy, one entry per project key (see PROJECTS in tiles.js),
   in both languages. Nature Future is the placeholder copy from
   design/v2/Case study.dc.html; projects without an entry get a neutral
   stand-in so the layout can be checked on every card. An image is either
   a label (a placeholder slot) or `{ src, alt }`; the gallery video is a
   label, `{ src, label }` or a still `{ src, alt }`. Optional: `link`, or
   `badge` (a plain note in its place), `brief` (short question and goal
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
    hero: nrPic("nr-hero.jpg", "Pierwszy ekran strony Atelier na laptopie i telefonie"),
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
    hero: nrPic("nr-hero.jpg", "The first screen of the Atelier site on a laptop and a phone"),
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

/* Red Panda Pomodoro, the desktop timer (github.com/joanise-ux/red-panda-pomodoro).
   It's private for now, so there's no download link. The window shots are
   captures of the real build with sample data; the desk, phone and menu bar
   around them are drawn mockups (public/assets/cases/rp). */
const RP_DIR = "/assets/cases/rp";
const rpPic = (file, alt) => ({ src: `${RP_DIR}/${file}`, alt });

const RP = {
  pl: {
    hero: rpPic("rp-hero.jpg", "Dłoń trzymająca telefon z minutnikiem Red Panda Pomodoro w trakcie skupienia"),
    meta: [
      ["Klient", "Projekt własny"],
      ["Rok", "2026"],
      ["Usługi", "Ilustracja, UX/UI, aplikacja desktopowa"],
      ["Narzędzia", "Claude, Electron, React"],
    ],
    badge: "prywatna, do pobrania wkrótce",
    lead: "Red Panda Pomodoro to spokojny minutnik do pracy w rytmie pomodoro, na macOS i Windows. Zamiast kolejnego surowego zegara ma czerwoną pandę, która siedzi na tarczy i dotrzymuje towarzystwa przy pracy.",
    brief: [
      ["Pytanie", "Jak zrobić minutnik, który pilnuje czasu, ale nie stresuje?"],
      ["Cel", "Mała aplikacja, która działa w tle, mówi tylko to, co trzeba, i którą po prostu miło otworzyć."],
    ],
    problem: {
      eyebrow: "o projekcie",
      title: "Minutnik, który nie pogania",
      text: [
        "Red Panda Pomodoro to mój projekt własny. Większość minutników pomodoro albo wygląda jak panel sterowania, albo odlicza czas czerwonymi cyframi, które bardziej stresują, niż pomagają się skupić. Chciałam czegoś cichego i ciepłego, co stoi z boku ekranu i nie domaga się uwagi.",
        "Kierunek, ilustracja, kolory i wszystkie decyzje są moje, a kod napisałam z pomocą AI. Dzięki temu z pomysłu powstała prawdziwa aplikacja: instaluje się, pamięta ustawienia i działa także przy zamkniętym oknie. Na razie korzystam z niej sama, a wersja do pobrania jest w planach.",
      ],
      image: rpPic("rp-start.jpg", "Ikona aplikacji: czerwona panda na kremowym tle"),
    },
    process: {
      eyebrow: "decyzje",
      title: "Trzy decyzje, które ułożyły aplikację",
      steps: [
        {
          title: "Panda jako twarz aplikacji",
          text: "Zaczęłam od ilustracji. Ta sama panda jest ikoną w docku, siedzi na tarczy minutnika, a jej uproszczona głowa w pasku menu pokazuje, ile zostało czasu. Z niej wzięła się też paleta: rdzawy, kremowy i ciepły brąz.",
          image: rpPic("rp-step-1.jpg", "Aplikacja na pulpicie: okno z minutnikiem, panda w docku i pozostały czas w pasku menu"),
        },
        {
          title: "Kolor mówi, co teraz robisz",
          text: "Skupienie jest rdzawe, krótka przerwa zielona, a długa niebieska. Wystarczy zerknąć na ekran, żeby wiedzieć, w jakiej jesteś fazie. Kropki pod tarczą liczą pomodoro do długiej przerwy, a na dole widać, ile udało się dziś zrobić.",
          image: rpPic("rp-step-2.jpg", "Trzy tryby obok siebie: skupienie, krótka przerwa i długa przerwa"),
        },
        {
          title: "Spokój także po ciemku",
          text: "Aplikacja przechodzi w ciemny motyw razem z systemem, a kolory w obu motywach mają kontrast zgodny z WCAG AA. Ustawienia mieszczą się na jednym ekranie. Całość da się obsłużyć z klawiatury: spacja startuje i pauzuje, R resetuje, S przeskakuje sesję.",
          image: rpPic("rp-step-3.jpg", "Ustawienia w jasnym motywie i minutnik w ciemnym"),
        },
      ],
    },
    gallery: {
      video: rpPic("rp-wide.jpg", "Ekrany aplikacji w telefonach ułożone ukośnie: tryby, ustawienia, jasny i ciemny motyw"),
      phones: [
        rpPic("rp-phone-1.jpg", "Ikona Red Panda Pomodoro na ekranie telefonu"),
        rpPic("rp-phone-2.jpg", "Telefon z minutnikiem w ciemnym motywie w trakcie skupienia"),
      ],
      detail: rpPic("rp-detail.jpg", "Menu w pasku menu z pozostałym czasem"),
      note: "Minutnik mieszka też w pasku menu. Stamtąd można zatrzymać sesję, przeskoczyć ją albo otworzyć ustawienia, bez otwierania okna.",
    },
    result: {
      eyebrow: "efekt",
      title: "Mała aplikacja, która naprawdę działa",
      text: "Red Panda Pomodoro to działająca aplikacja na macOS i Windows, a nie makieta. Liczy czas dokładnie nawet po uśpieniu komputera, pamięta ustawienia i dzisiejsze statystyki, a żadne dane nie opuszczają komputera. Na razie to projekt prywatny, a w przyszłości chcę udostępnić go do pobrania.",
    },
  },
  en: {
    hero: rpPic("rp-hero.jpg", "A hand holding a phone with the Red Panda Pomodoro timer during a focus session"),
    meta: [
      ["Client", "Personal project"],
      ["Year", "2026"],
      ["Services", "Illustration, UX/UI, desktop app"],
      ["Tools", "Claude, Electron, React"],
    ],
    badge: "private, download coming later",
    lead: "Red Panda Pomodoro is a calm Pomodoro timer for macOS and Windows. Instead of yet another bare clock, it has a red panda that sits on the dial and keeps you company while you work.",
    brief: [
      ["The question", "How do you make a timer that keeps track of time without stressing you out?"],
      ["The goal", "A small app that runs in the background, says only what it needs to, and is simply nice to open."],
    ],
    problem: {
      eyebrow: "overview",
      title: "A timer that doesn't rush you",
      text: [
        "Red Panda Pomodoro is a personal project. Most Pomodoro timers either look like a control panel or count down in red digits that stress you more than they help you focus. I wanted something quiet and warm that sits at the side of the screen and doesn't ask for attention.",
        "The direction, the illustration, the colours and every decision are mine, and I wrote the code with AI. That turned the idea into a real app: it installs, remembers its settings and keeps running with the window closed. For now I'm its only user, and a downloadable version is in the plans.",
      ],
      image: rpPic("rp-start.jpg", "The app icon: a red panda on a cream background"),
    },
    process: {
      eyebrow: "decisions",
      title: "Three decisions that shaped the app",
      steps: [
        {
          title: "The panda as the face of the app",
          text: "I started with the illustration. The same panda is the icon in the dock, sits on the timer's dial, and a simplified head in the menu bar shows how much time is left. The palette came from it too: rust, cream and warm brown.",
          image: rpPic("rp-step-1.jpg", "The app on a desktop: the timer window, the panda in the dock and the time left in the menu bar"),
        },
        {
          title: "Colour tells you what you're doing",
          text: "Focus is rust, a short break is green and a long break is blue. One glance at the screen tells you which phase you're in. The dots under the dial count pomodoros until the long break, and the bottom line shows what you've done today.",
          image: rpPic("rp-step-2.jpg", "The three modes side by side: focus, short break and long break"),
        },
        {
          title: "Calm in the dark too",
          text: "The app follows the system into dark mode, and the colours in both themes meet WCAG AA contrast. The settings fit on one screen. Everything works from the keyboard: Space starts and pauses, R resets, S skips a session.",
          image: rpPic("rp-step-3.jpg", "Settings in the light theme and the timer in the dark theme"),
        },
      ],
    },
    gallery: {
      video: rpPic("rp-wide.jpg", "App screens in phones laid out at an angle: the modes, settings, light and dark themes"),
      phones: [
        rpPic("rp-phone-1.jpg", "The Red Panda Pomodoro icon on a phone home screen"),
        rpPic("rp-phone-2.jpg", "A phone with the timer in the dark theme during a focus session"),
      ],
      detail: rpPic("rp-detail.jpg", "The menu bar menu with the time left"),
      note: "The timer also lives in the menu bar. From there you can pause a session, skip it or open the settings without opening the window.",
    },
    result: {
      eyebrow: "outcome",
      title: "A small app that really works",
      text: "Red Panda Pomodoro is a working app for macOS and Windows, not a mockup. It keeps accurate time even after the computer sleeps, remembers its settings and today's stats, and no data ever leaves the computer. For now it's a private project, and later on I'd like to make it available to download.",
    },
  },
};

/* SUOH, the shop for crochet bags. Shots are framed screenshots of
   suoh-two.vercel.app (public/assets/cases/su); the hero is the site's own
   first screen with the text hidden, so only the two bags are left. */
const SU_DIR = "/assets/cases/su";
const suPic = (file, alt) => ({ src: `${SU_DIR}/${file}`, alt });

const SU = {
  pl: {
    hero: suPic("su-hero.jpg", "Dwie szydełkowe torebki SUOH: brązowa na kamieniach nad wodą i granatowa na łańcuszku"),
    meta: [
      ["Klient", "SUOH, Wrocław"],
      ["Rok", "2026"],
      ["Usługi", "UX/UI, e-commerce, front-end"],
      ["Narzędzia", "Claude"],
    ],
    link: { label: "zobacz stronę", href: "https://suoh-two.vercel.app/" },
    lead: "SUOH to jednoosobowa pracownia z Wrocławia, w której każda torebka, brelok i prezent powstają ręcznie na szydełku. Zaprojektowałam dla niej sklep, w którym rękodzieło wygląda jak sztuka, a kupuje się je jak w zwykłym sklepie.",
    brief: [
      ["Pytanie", "Jak sprzedawać rzeczy, z których każda jest jedyna, żeby sklep nie wyglądał jak kolejny marketplace z rękodziełem?"],
      ["Cel", "Ciemna, spokojna strona, na której pierwsze skrzypce grają zdjęcia, a droga od torebki do koszyka zajmuje dwa kliknięcia."],
    ],
    problem: {
      eyebrow: "o projekcie",
      title: "Rękodzieło, które nie chce wyglądać na tanie",
      text: [
        "Projektantka SUOH szydełkuje torebki z jedwabistego sznurka i wykańcza je metalowymi okuciami i własną blaszką z logo. Sprzedaż przez media społecznościowe i portale z rękodziełem sprawiała, że torebka za kilkaset złotych stała obok rzeczy za kilkanaście.",
        "SUOH to mój projekt własny, zrobiony z myślą o niej. Hasło „Art you can carry”, czyli sztuka, którą nosisz, ustawiło cały kierunek. Projekt, treść i wszystkie decyzje są moje, a stronę złożyłam z pomocą AI, więc od razu działa: ma koszyk, ulubione i konto klienta.",
      ],
      image: suPic("su-start.webp", "Pierwszy ekran sklepu SUOH na telefonie"),
    },
    process: {
      eyebrow: "decyzje",
      title: "Trzy decyzje, które ułożyły sklep",
      steps: [
        {
          title: "Ciemna galeria zamiast jasnego katalogu",
          text: "Tło jest prawie czarne, a sekcje przeplatają się z głębokim brązem w odcieniu octu balsamicznego. Nagłówki są w szeryfowym Cormorant Garamond, drobne napisy w Jost z szerokim odstępem, a miedziany kolor zostaje tylko dla cen i przycisków. Dzięki temu faktura splotu na zdjęciach jest najjaśniejszym, co widać na ekranie.",
          image: suPic("su-step-1.webp", "Pierwszy ekran sklepu z dwiema torebkami i hasłem Art you can carry"),
        },
        {
          title: "Karta produktu jak metryczka",
          text: "W sklepie produkty dzielą się na torebki, breloki i prezenty, a filtry mieszczą się w jednym rzędzie. Na karcie jest nazwa, kolor, cena, z czego torebka jest zrobiona i jakie ma wymiary. Kupująca nie widzi torebki na żywo, więc dostaje wszystko, o co zapytałaby w pracowni.",
          image: suPic("su-step-2.webp", "Sklep z filtrami kategorii, a z przodu karta torebki Noir Crossbody po dodaniu do koszyka"),
        },
        {
          title: "Historia obok koszyka",
          text: "Strona „O nas” opowiada, jak z wieczorów z szydełkiem powstała pracownia i dlaczego zawsze będzie mała. Kiedy kupująca wie, ile godzin stoi za jedną torebką, cena przestaje dziwić. Koszyk jest prosty: miniatura, ilość, cena i informacja, że od 200 zł wysyłka jest gratis.",
          image: suPic("su-step-3.webp", "Strona z historią pracowni, a z przodu koszyk z dwiema torebkami"),
        },
      ],
    },
    gallery: {
      video: { src: `${SU_DIR}/su-scroll.webm`, label: "Przewijanie strony głównej SUOH od góry do dołu" },
      phones: [
        suPic("su-phone-1.webp", "Karta torebki Noir Crossbody na telefonie"),
        suPic("su-phone-2.webp", "Kolekcja breloków na telefonie"),
      ],
      detail: suPic("su-detail.webp", "Karta torebki po najechaniu kursorem"),
      note: "Na liście nowości zdjęcie stoi samo. Nazwa, cena i przycisk „Do koszyka” pojawiają się dopiero po najechaniu, żeby nic nie zasłaniało splotu.",
    },
    result: {
      eyebrow: "efekt",
      title: "Sklep, który traktuje rękodzieło poważnie",
      text: "SUOH ma działający sklep po polsku i angielsku, z koszykiem, listą ulubionych i kontem klienta. Na telefonie wszystko mieści się w jednej kolumnie i dalej wygląda jak galeria. Na razie to wersja pokazowa, która czeka na płatności i prawdziwe zamówienia.",
    },
  },
  en: {
    hero: suPic("su-hero.jpg", "Two SUOH crochet bags: a brown one on rocks by the water and a navy one on a chain"),
    meta: [
      ["Client", "SUOH, Wrocław"],
      ["Year", "2026"],
      ["Services", "UX/UI, e-commerce, front-end"],
      ["Tools", "Claude"],
    ],
    link: { label: "see the site", href: "https://suoh-two.vercel.app/" },
    lead: "SUOH is a one-woman studio in Wrocław, Poland, where every bag, keychain and gift is crocheted by hand. I designed a shop for it where handmade work looks like art and buying it feels like any other shop.",
    brief: [
      ["The question", "How do you sell things that are each one of a kind, without the shop looking like yet another handmade marketplace?"],
      ["The goal", "A dark, calm site where the photos lead, and the way from a bag to the cart takes two clicks."],
    ],
    problem: {
      eyebrow: "overview",
      title: "Handmade that doesn't want to look cheap",
      text: [
        "The designer behind SUOH crochets bags from silky cord and finishes them with metal hardware and her own logo plate. Selling through social media and handmade portals meant a bag worth a few hundred złoty stood next to things that cost a few dozen.",
        "SUOH is a personal project, made with her in mind. The line “Art you can carry” set the whole direction. The design, the copy and every decision are mine, and I put the site together with AI, so it works from day one: it has a cart, a wishlist and a customer account.",
      ],
      image: suPic("su-start.webp", "The first screen of the SUOH shop on a phone"),
    },
    process: {
      eyebrow: "decisions",
      title: "Three decisions that shaped the shop",
      steps: [
        {
          title: "A dark gallery instead of a bright catalogue",
          text: "The background is almost black, and the sections alternate with a deep balsamic brown. Headings are in Cormorant Garamond serif, small labels in widely spaced Jost, and copper is kept for prices and buttons. That way the texture of the stitches in the photos is the brightest thing on the screen.",
          image: suPic("su-step-1.webp", "The shop's first screen with two bags and the line Art you can carry"),
        },
        {
          title: "A product card like a label",
          text: "The shop splits into bags, keychains and gifts, and the filters fit in one row. Each card has the name, colour, price, what the bag is made of and its dimensions. The buyer can't see the bag in person, so she gets everything she'd ask about in the studio.",
          image: suPic("su-step-2.webp", "The shop with category filters, and in front the Noir Crossbody card after adding it to the cart"),
        },
        {
          title: "The story next to the cart",
          text: "The About page tells how evenings with a crochet hook turned into a studio, and why it will always stay small. Once a buyer knows how many hours go into one bag, the price stops being a surprise. The cart is simple: a thumbnail, the quantity, the price and a note that shipping is free above 200 PLN.",
          image: suPic("su-step-3.webp", "The studio's story page, and in front the cart with two bags"),
        },
      ],
    },
    gallery: {
      video: { src: `${SU_DIR}/su-scroll.webm`, label: "Scrolling the SUOH home page from top to bottom" },
      phones: [
        suPic("su-phone-1.webp", "The Noir Crossbody card on a phone"),
        suPic("su-phone-2.webp", "The keychain collection on a phone"),
      ],
      detail: suPic("su-detail.webp", "A bag card on hover"),
      note: "In the new arrivals the photo stands on its own. The name, price and “Add to bag” button only show up on hover, so nothing covers the stitches.",
    },
    result: {
      eyebrow: "outcome",
      title: "A shop that takes handmade seriously",
      text: "SUOH has a working shop in Polish and English, with a cart, a wishlist and a customer account. On a phone everything fits in one column and still looks like a gallery. For now it's a demo version, waiting for payments and real orders.",
    },
  },
};

export const CASES = { nf: tr(NF), nr: tr(NR), su: tr(SU), rp: tr(RP) };

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

/* Case study copy, one entry per project key (see PROJECTS in tiles.js),
   in both languages. Projects without an entry get a neutral
   stand-in so the layout can be checked on every card. An image is either
   a label (a placeholder slot) or `{ src, alt }`; the gallery video is a
   label, `{ src, label }` or a still `{ src, alt }`. Optional: `link`, or
   `badge` (a plain note in its place), `brief` (short question and goal
   under the lead), an `eyebrow` on problem / process / result to rename
   that section, `result.stats` (leave it out for no numbers), and
   `prototypes` (`{ title, text, links: [[label, href]] }`, a list of
   live screens under the gallery). */

import { tr } from "./i18n.js";

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

/* UME, the private photo journal (a product concept). Shots are composed
   from the prototype's own phone screenshots (public/assets/cases/um); the
   prototypes live on ume-app-zeta.vercel.app, one page per screen. */
const UM_DIR = "/assets/cases/um";
const umPic = (file, alt) => ({ src: `${UM_DIR}/${file}`, alt });
const UM_URL = "https://ume-app-zeta.vercel.app";
const umLinks = (labels) =>
  ["/", "/tablica/Tablica.html", "/wpis/index.html", "/nowy-wpis/index.html", "/haru/index.html", "/kolekcje/index.html", "/ustawienia/index.html", "/logo-final/splash-standalone.html"].map(
    (path, i) => [labels[i], UM_URL + path]
  );

const UM = {
  pl: {
    hero: umPic("um-hero.jpg", "Trzy telefony z aplikacją UME: Kolekcje, Tablica i udekorowany wpis ze zdjęciem kota"),
    meta: [
      ["Klient", "Projekt własny"],
      ["Rok", "2026"],
      ["Usługi", "Research, marka i logo, UX/UI, prototypy"],
      ["Narzędzia", "Claude Design, Claude Code"],
    ],
    link: { label: "otwórz prototyp", href: `${UM_URL}/` },
    lead: "UME to prywatny fotodziennik na iOS i Androida: jak Instagram, tylko dla siebie. Małe momenty dnia trafiają na przytulną tablicę, bez obserwujących, polubień i reklam, a wszystko jest szyfrowane end-to-end.",
    brief: [
      ["Pytanie", "Jak zrobić miejsce na codzienne wspomnienia, które jest przyjemne jak Pinterest, prywatne jak sejf i nie wywiera żadnej presji?"],
      ["Cel", "Koncept aplikacji z marką, logo i klikalnymi prototypami, które da się sprawdzić na telefonie, zanim powstanie pierwsza linijka kodu."],
    ],
    problem: {
      eyebrow: "o projekcie",
      title: "Wspomnienia, które nie są występem",
      text: [
        "Robimy coraz więcej zdjęć, ale rzadko do nich wracamy. Media społecznościowe zamieniają je w występ dla innych, a dzienniki, które dbają o prywatność, wyglądają jak edytory tekstu. Przeanalizowałam siedem aplikacji, od Day One po BeReal, i żadna nie łączyła naraz ładnej tablicy wspomnień, szyfrowania, Androida i lokalnych języków.",
        "UME to mój projekt własny. Nazwa to po japońsku kwiat śliwy, który kwitnie jako pierwszy, jeszcze zimą. Z niego wzięło się logo rysowane jedną linią i bordowy akcent na tle mleka owsianego i lnu. Research, decyzje produktowe i kierunek są moje, a ekrany i prototypy złożyłam z pomocą AI.",
      ],
      image: umPic("um-start.jpg", "Logo UME w kolorze bordo na kremowym tle"),
    },
    process: {
      eyebrow: "decyzje",
      title: "Trzy decyzje, które ułożyły aplikację",
      steps: [
        {
          title: "Tablica zamiast feedu",
          text: "Główny ekran to tablica w stylu Pinterest: zdjęcia, krótkie klipy i notatki różnej wysokości, z filtrami po tagach i nastroju. Zamiast liczników jest przywitanie „Dobry wieczór”. Tryb ciemny zamienia krem na leśną zieleń, a daty i tytuły w miękkim szeryfie Fraunces zostają te same.",
          image: umPic("um-step-1.jpg", "Tablica w trybie jasnym i ciemnym obok siebie"),
        },
        {
          title: "Nowy wpis w kilku ruchach",
          text: "Arkusz wyboru, galeria, przycięcie klipu do 10 sekund i edytor z nastrojem, tagami i kolekcją. Klipy są krótkie, bo to mają być momenty dnia, a nie filmy. Zaprojektowałam też stany graniczne: wpis tylko tekstowy, koniec okresu próbnego, limit klipów i brak dostępu do zdjęć.",
          image: umPic("um-step-2.jpg", "Nowy wpis w trzech krokach: wybór, przycinanie klipu i edytor"),
        },
        {
          title: "Prywatność, którą widać",
          text: "Szyfrowania nie widać, więc pokazuje je interfejs. Przy kolekcjach stoi „Widzisz je tylko Ty”, nigdzie nie ma przycisku udostępniania, a strona „Gdzie są moje dane?” prostym schematem tłumaczy drogę zdjęcia z telefonu na serwer w UE. Eksport wszystkiego to jedno kliknięcie, bo dane należą do użytkownika.",
          image: umPic("um-step-3.jpg", "Ustawienia, strona Gdzie są moje dane? i eksport wszystkich wpisów"),
        },
      ],
    },
    gallery: {
      video: umPic("um-wide.jpg", "Pięć ekranów UME: wpis ze zdjęciami, kalendarz Haru, Kolekcje w trybie jasnym i ciemnym oraz wpis tekstowy"),
      phones: [
        umPic("um-phone-1.jpg", "Tablica na Androidzie"),
        umPic("um-phone-2.jpg", "Kolekcje na Androidzie w trybie ciemnym"),
      ],
      detail: umPic("um-detail.jpg", "Kalendarz Haru z miniaturą każdego dnia"),
      note: "Haru to kalendarz, w którym każdy dzień ma swoją miniaturę. Pod nim czeka „Tego dnia rok temu”, więc aplikacja z czasem zyskuje wartość, bez codziennego przymusu.",
    },
    prototypes: {
      title: "Sprawdź na telefonie",
      text: "Każdy ekran działa w wersji na iPhone'a i Androida, w trybie jasnym i ciemnym, a dolny pasek prowadzi między nimi. Najlepiej otworzyć je na telefonie.",
      links: umLinks(["Strona projektu", "Tablica", "Podgląd wpisu", "Nowy wpis", "Haru, kalendarz", "Kolekcje", "Ustawienia", "Ekran startowy z logo"]),
    },
    result: {
      eyebrow: "efekt",
      title: "Aplikacja, którą można kliknąć przed kodem",
      text: "UME ma spójny system wizualny, animowane logo i siedem połączonych, klikalnych prototypów online. Każdy ekran można ocenić na telefonie, zanim powstała pierwsza linijka kodu aplikacji. Kolejne kroki to testy z użytkownikami i aplikacja w Expo, z pięcioma językami i szyfrowaniem end-to-end.",
    },
  },
  en: {
    hero: umPic("um-hero.jpg", "Three phones with the UME app: Collections, the Board and a decorated entry with a photo of a kitten"),
    meta: [
      ["Client", "Personal project"],
      ["Year", "2026"],
      ["Services", "Research, brand and logo, UX/UI, prototypes"],
      ["Tools", "Claude Design, Claude Code"],
    ],
    link: { label: "open the prototype", href: `${UM_URL}/` },
    lead: "UME is a private photo journal for iOS and Android: like Instagram, but only for you. Small moments of the day land on a cozy board, with no followers, no likes and no ads, and everything is end-to-end encrypted.",
    brief: [
      ["The question", "How do you make a place for everyday memories that feels as pleasant as Pinterest, as private as a safe, and puts no pressure on you?"],
      ["The goal", "An app concept with a brand, a logo and clickable prototypes you can try on a phone before the first line of code is written."],
    ],
    problem: {
      eyebrow: "overview",
      title: "Memories that aren't a performance",
      text: [
        "We take more photos than ever but rarely look back at them. Social media turns them into a performance for others, and the journals that take privacy seriously look like text editors. I analysed seven apps, from Day One to BeReal, and none of them combined a beautiful memory board, encryption, Android and local languages at once.",
        "UME is a personal project. The name is Japanese for the plum blossom, the first flower to bloom while it's still winter. It gave me a logo drawn in a single line and a burgundy accent on oat milk and linen. The research, the product decisions and the direction are mine, and I put the screens and prototypes together with AI.",
      ],
      image: umPic("um-start.jpg", "The UME logo in burgundy on a cream background"),
    },
    process: {
      eyebrow: "decisions",
      title: "Three decisions that shaped the app",
      steps: [
        {
          title: "A board instead of a feed",
          text: "The main screen is a Pinterest-like board: photos, short clips and notes of different heights, with filters by tag and mood. Instead of counters there's a greeting, “Good evening”. Dark mode swaps the cream for forest green, while the dates and titles in the soft Fraunces serif stay the same.",
          image: umPic("um-step-1.jpg", "The Board in light and dark mode side by side"),
        },
        {
          title: "A new entry in a few moves",
          text: "A picker sheet, the gallery, trimming a clip to 10 seconds and an editor with mood, tags and a collection. Clips are short because these are moments of the day, not films. I designed the edge cases too: a text-only entry, the end of the trial, the clip limit and no photo access.",
          image: umPic("um-step-2.jpg", "A new entry in three steps: the picker, trimming a clip and the editor"),
        },
        {
          title: "Privacy you can see",
          text: "Encryption is invisible, so the interface shows it. Collections say “Only you can see them”, there's no share button anywhere, and a “Where is my data?” page explains with a simple diagram how a photo travels from the phone to a server in the EU. Exporting everything takes one tap, because the data belongs to the user.",
          image: umPic("um-step-3.jpg", "Settings, the Where is my data? page and exporting every entry"),
        },
      ],
    },
    gallery: {
      video: umPic("um-wide.jpg", "Five UME screens: an entry with photos, the Haru calendar, Collections in light and dark mode, and a text entry"),
      phones: [
        umPic("um-phone-1.jpg", "The Board on Android"),
        umPic("um-phone-2.jpg", "Collections on Android in dark mode"),
      ],
      detail: umPic("um-detail.jpg", "The Haru calendar with a thumbnail for every day"),
      note: "Haru is a calendar where every day has its own thumbnail. Below it waits “On this day last year”, so the app grows more valuable over time, with no daily obligation.",
    },
    prototypes: {
      title: "Try it on your phone",
      text: "Every screen works on iPhone and Android, in light and dark mode, and the bottom bar takes you between them. They're best opened on a phone. The interface is in Polish, the first market.",
      links: umLinks(["Project page", "Board", "Entry", "New entry", "Haru, the calendar", "Collections", "Settings", "Splash screen with the logo"]),
    },
    result: {
      eyebrow: "outcome",
      title: "An app you can click before the code",
      text: "UME has a consistent visual system, an animated logo and seven connected, clickable prototypes online. Every screen can be judged on a phone before the first line of app code exists. Next come user testing and the Expo app, with five languages and end-to-end encryption.",
    },
  },
};

export const CASES = { nr: tr(NR), su: tr(SU), rp: tr(RP), um: tr(UM) };

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

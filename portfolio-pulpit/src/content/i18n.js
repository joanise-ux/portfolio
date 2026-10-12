/* ══════════════════════════════════════════════════════════════════
   I18N — wszystkie teksty widoczne dla użytkownika. Nic nie jest
   wpisane w komponentach: interfejs czyta tylko stąd.
   Nie tłumaczymy nazw własnych (SUOH, Nature Future, log.txt),
   nazw plików, komend i narzędzi.
   ══════════════════════════════════════════════════════════════════ */

export const I18N = {
  pl: {
    code: "pl",
    role: "projektantka produktowa i UX",
    status: "dostępna od Q4",
    availability: "wolne moce od października",
    responseTime: "odpisuję w mniej niż 24 godziny",
    years: (n) => {
      if (n === 1) return "1 rok";
      const d = n % 10;
      const s = n % 100;
      return n + (d >= 2 && d <= 4 && !(s >= 12 && s <= 14) ? " lata" : " lat");
    },
    shotCount: (n) => (n === 1 ? "1 podgląd" : n >= 2 && n <= 4 ? `${n} podglądy` : `${n} podglądów`),
    menu: {
      file: "plik",
      projects: "projekty",
      about: "o mnie",
      contact: "kontakt",
      newProject: "nowy projekt",
      downloadCv: "pobierz CV",
      clearDesktop: "wyczyść pulpit",
      bio: "bio",
      experience: "doświadczenie",
      tools: "narzędzia",
      toolsMeta: "stack",
      email: "e-mail",
    },
    dock: { terminal: "terminal", mail: "mail", linkedin: "linkedin", trash: "kosz" },
    ui: {
      replay: "powtórz",
      replayHint: "powtórz animację wejścia — kliknij, żeby ją pominąć",
      projectsRoot: "projekty",
      grid: "siatka",
      read: "czytanie",
      spaceHint: "spacja — podgląd",
      noShots: "// brak eksportów w ",
      noShotsHelp: "dodaj PNG do public/assets/ i wpisz je w DATA.projects[].shots",
      noStudy:
        "// brak opisu — uzupełnij I18N[lang].projects[...].study (problem / proces / rezultat)",
      study: ["01 — problem", "02 — proces", "03 — rezultat"],
    },
    ql: { hint: "← → nawigacja · esc zamyka", close: "zamknij podgląd" },
    widgets: {
      building: "teraz_buduję",
      learning: "nauka",
      buildLog: (c, u) => `commit ${c} · ostatnia zmiana ${u}`,
      learnDay: (d, lvl) => `dzień_${d} · ${lvl}`,
      sticky: ["poprawić kerning", "w lockupie SUOH", "oddać do 12.08", "→ potem CV ↗"],
    },
    mail: {
      title: "nowa wiadomość",
      to: "Do:",
      locked: "locked",
      from: "Od:",
      name: "Imię:",
      subject: "Temat:",
      body: "treść:",
      plain: "plain text",
      phFrom: "twoj@adres.pl",
      phName: "jak się do ciebie zwracać",
      phSubj: "nowy projekt — [nazwa]",
      phBody: "napisz wiadomość…",
      send: "wyślij",
      sending: "wysyłanie…",
      sentTitle: "wiadomość wysłana",
      sentSub: "odpowiem w ciągu 48h",
      again: "napisz kolejną →",
      chars: (n) => `${n} znaków`,
      err: {
        from: "podaj adres zwrotny",
        fromBad: "to nie wygląda na adres e-mail",
        subj: "temat jest wymagany",
        body: "napisz przynajmniej dwa zdania",
      },
    },
    editor: {
      comment: "// narzędzia, których używam na co dzień",
      pos: "ln 1, col 1",
      sections: (n) => `${n} sekcje`,
      saved: "saved",
    },
    term: {
      title: "terminal",
      helpTitle: "dostępne komendy",
      cmd: {
        whoami: "kim jestem",
        ls: "lista projektów",
        open: "otwórz okno projektu",
        contact: "dane kontaktowe",
        cv: "pobierz ",
        hire: "dostępność",
        help: "ta lista",
      },
      notFound: "!! nie znaleziono: ",
      notFoundHint: "   wpisz ls, żeby zobaczyć projekty",
      typeHelp: "   wpisz help",
      scope: "zakres: ",
      write: ":: napisz: ",
    },
    stackNotes: {
      figma: "// makiety, systemy, prototypy",
      "adobe suite": "// grafika, obróbka, druk",
      canva: "// szybkie materiały, social",
      "html / css": "// layout, tokeny",
      javascript: "// interakcje",
      react: "// komponenty, buildy w claude code",
      sql: "// zapytania do bazy",
      supabase: "// baza i backend",
      vercel: "// deploy",
      "claude code": "// budowa aplikacji i stron",
      "claude design": "// projektowanie interfejsów",
      "figma make": "// szybkie prototypy",
    },
    projects: {
      suoh: {
        sub: "dark_luxury",
        menuMeta: "e-commerce",
        tagline: "e-commerce — dark luxury",
        description:
          "Sklep pracowni rękodzieła — katalog, karta produktu, koszyk. Ciepła czerń i duża szeryfowa typografia; interfejs schodzi zdjęciom z drogi.",
        study: {},
      },
      nature: {
        sub: "biotech_story",
        menuMeta: "biotech",
        tagline: "biotech — narracja produktowa",
        description:
          "Strona i system nawigacji dla laboratorium biotechnologicznego. Dane zostają czytelne, obraz robi ciszę wokół nich.",
        study: {},
      },
      logtxt: {
        sub: "journaling",
        menuMeta: "dashboard",
        tagline: "dziennik jako dashboard",
        description:
          "Aplikacja do dziennika, w której nawigacja jest ścieżką pliku, a zmiana stanu — komendą. Wpisy wracają jako wykres tygodnia.",
        study: {},
      },
      web: {
        sub: "strony",
        menuMeta: "strony",
        tagline: "strony — wybór",
        description:
          "Cztery strony zbudowane na jednym systemie typograficznym. Każda dostaje własny kontrast, żadna nie dostaje nowego kroju.",
        study: {},
      },
      branding: {
        sub: "kwartał_solna",
        menuMeta: "kwartał solna",
        tagline: "identyfikacja i nawigacja",
        description:
          "Identyfikacja i system nawigacji dla kwartału mieszkaniowego. Treść zostaje w kości słoniowej — neon oświetla tylko interfejs wokół niej.",
        study: {},
      },
    },
    docs: {
      bio: {
        kim: {
          label: "01 — kim jestem",
          text: "Projektuję i wdrażam. SUOH i Nature&Future to moje projekty od pierwszego szkicu po produkcję — identyfikacja, interfejs, front-end, integracje płatności, deploy.",
        },
        jak: {
          label: "02 — jak pracuję",
          text: "Zaczynam od stanów pustych i błędów, kończę na typografii. Projekt uznaję za skończony, kiedy działa pod adresem, nie kiedy wygląda dobrze na artboardzie.",
        },
        zakres:
          "Identyfikacja wizualna, interfejsy, e-commerce. Projekty prowadzone od koncepcji po wdrożenie — projekt, front-end, integracje, deploy.",
      },
      exp: {
        expLabel: "01 — doświadczenie",
        eduLabel: "02 — wykształcenie",
        scopeLabel: "03 — zakres",
        rows: [
          { k: "2022 — teraz", v: "freelance designer — własna działalność" },
          { k: "2024 — teraz", v: "projektowanie produktowe i wdrożenia własnych projektów" },
        ],
        edu: [{ k: "2024", v: "licencjat — Uniwersytet WSB Merito Wrocław" }],
      },
      tools: { label: "01 — narzędzia" },
      contact: {
        channels: "01 — kanały",
        response: "02 — czas odpowiedzi",
        text: (resp, avail) => `Najszybciej mailem — ${resp}. ${avail}.`,
      },
      cv: {
        fileLabel: "01 — plik",
        contentLabel: "02 — zawartość",
        fileText: (file, size, upd) => `${file} — ${size}, ostatnia aktualizacja ${upd}.`,
        rows: [
          { k: "s. 1", v: "doświadczenie i wykształcenie" },
          { k: "s. 2", v: "wybrane projekty" },
          { k: "s. 3", v: "narzędzia i stack" },
        ],
      },
      readme: {
        howLabel: "01 — jak to działa",
        howText:
          "To portfolio jest pulpitem. Foldery otwierają projekty, terminal przyjmuje komendy, okna można przenosić, skalować i minimalizować do doku.",
        shortcutsLabel: "02 — skróty",
        rows: [
          { k: "dwuklik", v: "maksymalizuj okno" },
          { k: "prawy dolny róg", v: "zmiana rozmiaru" },
          { k: "help", v: "lista komend w terminalu" },
        ],
      },
      trash: {
        title: "kosz — pusty",
        label: "01 — kosz",
        text: "// brak wpisów — nic tu nie wyrzucono",
      },
    },
  },

  en: {
    code: "en",
    role: "product & ux designer",
    status: "available from Q4",
    availability: "capacity open from October",
    responseTime: "I reply in under 24 hours",
    years: (n) => n + (n === 1 ? " year" : " years"),
    shotCount: (n) => n + (n === 1 ? " preview" : " previews"),
    menu: {
      file: "file",
      projects: "projects",
      about: "about",
      contact: "contact",
      newProject: "new project",
      downloadCv: "download CV",
      clearDesktop: "clear desktop",
      bio: "bio",
      experience: "experience",
      tools: "tools",
      toolsMeta: "stack",
      email: "e-mail",
    },
    dock: { terminal: "terminal", mail: "mail", linkedin: "linkedin", trash: "trash" },
    ui: {
      replay: "replay",
      replayHint: "replay the intro animation — click to skip it",
      projectsRoot: "projects",
      grid: "grid",
      read: "reading",
      spaceHint: "space — preview",
      noShots: "// no exports in ",
      noShotsHelp: "add PNGs to public/assets/ and list them in DATA.projects[].shots",
      noStudy:
        "// no write-up — fill in I18N[lang].projects[...].study (problem / process / outcome)",
      study: ["01 — problem", "02 — process", "03 — outcome"],
    },
    ql: { hint: "← → navigate · esc closes", close: "close preview" },
    widgets: {
      building: "now_building",
      learning: "learning",
      buildLog: (c, u) => `commit ${c} · last update ${u}`,
      learnDay: (d, lvl) => `day_${d} · ${lvl}`,
      sticky: ["fix the kerning", "in the SUOH lockup", "hand off by 12.08", "→ then the CV ↗"],
    },
    mail: {
      title: "new message",
      to: "To:",
      locked: "locked",
      from: "From:",
      name: "Name:",
      subject: "Subject:",
      body: "body:",
      plain: "plain text",
      phFrom: "your@address.com",
      phName: "how should I address you",
      phSubj: "new project — [name]",
      phBody: "write your message…",
      send: "send",
      sending: "sending…",
      sentTitle: "message sent",
      sentSub: "I reply within 48h",
      again: "write another →",
      chars: (n) => `${n} characters`,
      err: {
        from: "enter a return address",
        fromBad: "that doesn't look like an e-mail address",
        subj: "subject is required",
        body: "write at least two sentences",
      },
    },
    editor: {
      comment: "// tools I use every day",
      pos: "ln 1, col 1",
      sections: (n) => `${n} sections`,
      saved: "saved",
    },
    term: {
      title: "terminal",
      helpTitle: "available commands",
      cmd: {
        whoami: "who I am",
        ls: "list of projects",
        open: "open a project window",
        contact: "contact details",
        cv: "download ",
        hire: "availability",
        help: "this list",
      },
      notFound: "!! not found: ",
      notFoundHint: "   type ls to see the projects",
      typeHelp: "   type help",
      scope: "scope: ",
      write: ":: write: ",
    },
    stackNotes: {
      figma: "// wireframes, systems, prototypes",
      "adobe suite": "// graphics, retouch, print",
      canva: "// quick assets, social",
      "html / css": "// layout, tokens",
      javascript: "// interactions",
      react: "// components, builds in claude code",
      sql: "// database queries",
      supabase: "// database and backend",
      vercel: "// deploy",
      "claude code": "// building apps and sites",
      "claude design": "// interface design",
      "figma make": "// quick prototypes",
    },
    projects: {
      suoh: {
        sub: "dark_luxury",
        menuMeta: "e-commerce",
        tagline: "e-commerce — dark luxury",
        description:
          "A craft studio's shop — catalogue, product page, cart. Warm black and large serif type; the interface stays out of the photographs' way.",
        study: {},
      },
      nature: {
        sub: "biotech_story",
        menuMeta: "biotech",
        tagline: "biotech — product narrative",
        description:
          "Website and navigation system for a biotechnology lab. The data stays readable, the imagery keeps quiet around it.",
        study: {},
      },
      logtxt: {
        sub: "journaling",
        menuMeta: "dashboard",
        tagline: "a journal as a dashboard",
        description:
          "A journaling app where navigation is a file path and changing state is a command. Entries come back as the week's chart.",
        study: {},
      },
      web: {
        sub: "web_pages",
        menuMeta: "websites",
        tagline: "websites — a selection",
        description:
          "Four sites built on one typographic system. Each gets its own contrast, none gets a new typeface.",
        study: {},
      },
      branding: {
        sub: "kwartal_solna",
        menuMeta: "kwartał solna",
        tagline: "identity and navigation",
        description:
          "Identity and navigation system for a residential quarter. Content stays in ivory — neon lights only the interface around it.",
        study: {},
      },
    },
    docs: {
      bio: {
        kim: {
          label: "01 — who I am",
          text: "I design and I ship. SUOH and Nature&Future are mine from the first sketch to production — identity, interface, front-end, payment integrations, deploy.",
        },
        jak: {
          label: "02 — how I work",
          text: "I start with empty and error states and finish with typography. A project is done when it works at an address, not when it looks good on an artboard.",
        },
        zakres:
          "Visual identity, interfaces, e-commerce. Projects run from concept to launch — design, front-end, integrations, deploy.",
      },
      exp: {
        expLabel: "01 — experience",
        eduLabel: "02 — education",
        scopeLabel: "03 — scope",
        rows: [
          { k: "2022 — now", v: "freelance designer — own practice" },
          { k: "2024 — now", v: "product design and shipping my own projects" },
        ],
        edu: [{ k: "2024", v: "bachelor's degree — WSB Merito University Wrocław" }],
      },
      tools: { label: "01 — tools" },
      contact: {
        channels: "01 — channels",
        response: "02 — response time",
        text: (resp, avail) => `Fastest by e-mail — ${resp}. ${avail}.`,
      },
      cv: {
        fileLabel: "01 — file",
        contentLabel: "02 — contents",
        fileText: (file, size, upd) => `${file} — ${size}, last updated ${upd}.`,
        rows: [
          { k: "p. 1", v: "experience and education" },
          { k: "p. 2", v: "selected projects" },
          { k: "p. 3", v: "tools and stack" },
        ],
      },
      readme: {
        howLabel: "01 — how this works",
        howText:
          "This portfolio is a desktop. Folders open projects, the terminal takes commands, windows can be moved, resized and minimised to the dock.",
        shortcutsLabel: "02 — shortcuts",
        rows: [
          { k: "double-click", v: "maximise window" },
          { k: "bottom-right corner", v: "resize" },
          { k: "help", v: "list of terminal commands" },
        ],
      },
      trash: {
        title: "trash — empty",
        label: "01 — trash",
        text: "// no entries — nothing was thrown out here",
      },
    },
  },
};

export const LANG_STORAGE_KEY = "neonos.lang";

export function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pl" || saved === "en") return saved;
  } catch {
    /* private mode / storage disabled — fall through to navigator */
  }
  return (navigator.language || "").toLowerCase().startsWith("pl") ? "pl" : "en";
}

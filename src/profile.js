/* Copy and contact details for About and Kontakt (design/v2/About.dc.html,
   Kontakt.dc.html), in both languages.

   The bio, work history, stack, city, address and LinkedIn are Joanna's
   own. The intro line and the four services are still
   the design's placeholder copy. */

import { tr } from "./i18n.js";

export const CONTACT = {
  email: "zuczkowskaj@gmail.com",
  linkedin: "https://www.linkedin.com/in/joannazuczkowska",
  /* The CV is being rewritten: while this is null there is no "Download CV"
     button anywhere. To bring it back, put the PDFs in public/assets and:
     cv: tr({
       pl: { href: "/assets/cv_2026_pl.pdf", download: "Joanna_Zuczkowska_CV_PL.pdf" },
       en: { href: "/assets/cv_2026_en.pdf", download: "Joanna_Zuczkowska_CV_EN.pdf" },
     }), */
  cv: null,
};

const TOOLS = ["Figma", "Adobe Suite", "Canva", "HTML / CSS", "JavaScript", "React", "SQL", "Supabase", "Vercel", "Claude Code", "Claude Design", "Figma Make"];

export const ABOUT = tr({
  pl: {
    intro: "Cześć, jestem Joanna. Projektuję spokojne, czytelne interfejsy dla ludzi, którzy nie lubią się gubić.",
    me: {
      title: "Projektuję i wdrażam",
      text: [
        "Prowadzę projekty od pierwszego szkicu po produkcję — identyfikacja, interfejs, front-end, deploy.",
        "Zaczynam od stanów pustych i błędów, kończę na typografii. Projekt uznaję za skończony, kiedy działa pod adresem, nie kiedy wygląda dobrze na artboardzie.",
        "Projektuję z AI. Kierunek, treść i decyzje są moje, a ekrany i kod składam z pomocą Claude Code i Claude Design. Dzięki temu szybko sprawdzam w działaniu, czy pomysł się broni, zamiast tygodniami dopracowywać go w Figmie.",
      ],
    },
    services: {
      title: "W czym mogę pomóc",
      items: [
        ["UX research", "Wywiady, testy z użytkownikami i analiza danych, z których wynika, co naprawdę warto zmienić."],
        ["UI design", "Czytelne ekrany i spójne komponenty, które dobrze wyglądają i równie dobrze działają na telefonie."],
        ["Branding", "Logo, kolory i ton głosu, które pasują do produktu i nie gubią się, gdy marka zaczyna rosnąć."],
        ["Prototypowanie", "Działające prototypy składane z AI, dzięki którym pomysł da się sprawdzić w przeglądarce, zanim trafi do programistów."],
      ],
    },
    experience: {
      title: "Gdzie pracowałam",
      rows: [
        ["2024 — teraz", "Projektowanie produktowe", "wdrożenia własnych projektów"],
        ["2023", "Staż — grafika", "Gmina Walim"],
        ["2022 — teraz", "Freelance designer", "własna działalność"],
      ],
    },
    tools: TOOLS,
  },
  en: {
    intro: "Hi, I'm Joanna. I design calm, readable interfaces for people who don't like getting lost.",
    me: {
      title: "I design and I ship",
      text: [
        "I take projects from the first sketch to production — identity, interface, front-end, deploy.",
        "I start with empty and error states and finish with typography. A project is done when it works at an address, not when it looks good on an artboard.",
        "I design with AI. The direction, the copy and the decisions are mine, and I put the screens and code together with Claude Code and Claude Design. That way I quickly see a working version and whether the idea holds up, instead of polishing it in Figma for weeks.",
      ],
    },
    services: {
      title: "How I can help",
      items: [
        ["UX research", "Interviews, user tests and data analysis that show what is really worth changing."],
        ["UI design", "Readable screens and consistent components that look good and work just as well on a phone."],
        ["Branding", "A logo, colours and a tone of voice that fit the product and hold up as the brand grows."],
        ["Prototyping", "Working prototypes put together with AI, so an idea can be tested in the browser before it reaches the developers."],
      ],
    },
    experience: {
      title: "Where I've worked",
      rows: [
        ["2024 — now", "Product design", "shipping my own projects"],
        ["2023", "Graphic design intern", "Gmina Walim"],
        ["2022 — now", "Freelance designer", "own practice"],
      ],
    },
    tools: TOOLS,
  },
});

export const KONTAKT = tr({
  pl: { title: "Napisz do mnie" },
  en: { title: "Write to me" },
});

/* Copy and contact details for About and Kontakt (design/v2/About.dc.html,
   Kontakt.dc.html), in both languages.

   The bio, work history, stack, city, address, LinkedIn, CV files and the
   portrait are Joanna's own. The intro line and the four services are still
   the design's placeholder copy. */

import { tr } from "./i18n.js";

export const CONTACT = {
  email: "zuczkowskaj@gmail.com",
  linkedin: "https://www.linkedin.com/in/joannazuczkowska",
  cv: tr({
    pl: { href: "/assets/cv_2026_pl.pdf", download: "Joanna_Zuczkowska_CV_PL.pdf" },
    en: { href: "/assets/cv_2026_en.pdf", download: "Joanna_Zuczkowska_CV_EN.pdf" },
  }),
  /* Where the form posts JSON { name, email, message } (Formspree and the
     like). While this is empty there is no backend, so the form hands the
     message to the visitor's own mail program instead of pretending. */
  formEndpoint: "",
};

const TOOLS = ["Figma", "Adobe Suite", "Canva", "HTML / CSS", "JavaScript", "React", "SQL", "Supabase", "Vercel", "Claude Code", "Claude Design", "Figma Make"];

export const ABOUT = tr({
  pl: {
    intro: "Cześć, jestem Joanna. Projektuję spokojne, czytelne interfejsy dla ludzi, którzy nie lubią się gubić.",
    portrait: "/assets/about-me-photo.png",
    me: {
      title: "Projektuję i wdrażam",
      text: [
        "Nature&Future to mój projekt od pierwszego szkicu po produkcję — identyfikacja, interfejs, front-end, integracje płatności, deploy.",
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
    portrait: "/assets/about-me-photo.png",
    me: {
      title: "I design and I ship",
      text: [
        "Nature&Future is mine from the first sketch to production — identity, interface, front-end, payment integrations, deploy.",
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
  pl: {
    title: "Napisz do mnie",
    fields: {
      name: { label: "Imię", placeholder: "np. Marta", type: "text", autocomplete: "given-name" },
      email: { label: "E-mail", placeholder: "np. marta@firma.pl", type: "email", autocomplete: "email" },
      msg: { label: "Wiadomość", placeholder: "Opowiedz krótko o zespole i roli, której szukasz." },
    },
    errors: {
      name: "Wpisz swoje imię.",
      email: "Podaj adres e-mail, żebym mogła odpisać.",
      emailBad: "Adres jest niepełny — brakuje domeny, np. .pl lub .com.",
      msg: "Napisz kilka słów o tym, czego szukasz.",
      send: (email) => `Nie udało się wysłać. Napisz proszę prosto na ${email}.`,
    },
    submit: "Wyślij",
    note: "Odpisuję w ciągu dwóch dni roboczych.",
    subject: (name) => `Portfolio — wiadomość od: ${name}`,
    sent: {
      title: "Dziękuję, wiadomość doszła",
      text: (to) => `Odpiszę w ciągu dwóch dni roboczych na adres ${to}.`,
    },
    /* shown instead of `sent` while there is no formEndpoint */
    handed: {
      title: "Wiadomość czeka w Twojej poczcie",
      text: (email) => `Otworzyłam Twój program pocztowy z gotową wiadomością — wystarczy ją wysłać. Jeśli nic się nie otworzyło, napisz na ${email}.`,
    },
    again: "napisz kolejną wiadomość",
  },
  en: {
    title: "Write to me",
    fields: {
      name: { label: "Name", placeholder: "e.g. Marta", type: "text", autocomplete: "given-name" },
      email: { label: "E-mail", placeholder: "e.g. marta@company.com", type: "email", autocomplete: "email" },
      msg: { label: "Message", placeholder: "Tell me briefly about the team and the role." },
    },
    errors: {
      name: "Enter your name.",
      email: "Enter your e-mail address so I can reply.",
      emailBad: "The address is incomplete — the domain is missing, e.g. .com.",
      msg: "Write a few words about what you are looking for.",
      send: (email) => `Sending failed. Please write straight to ${email}.`,
    },
    submit: "Send",
    note: "I reply within two working days.",
    subject: (name) => `Portfolio — message from: ${name}`,
    sent: {
      title: "Thank you, your message arrived",
      text: (to) => `I'll reply within two working days to ${to}.`,
    },
    handed: {
      title: "Your message is waiting in your mail",
      text: (email) => `I opened your mail program with the message ready — you only need to send it. If nothing opened, write to ${email}.`,
    },
    again: "write another message",
  },
});

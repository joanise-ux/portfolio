/* Copy for About and Kontakt (design/v2/About.dc.html, Kontakt.dc.html).

   The facts come from the current site (src/content): the bio, the work
   history, the stack, the city, the address, LinkedIn, the CV file and the
   portrait. The intro line, the four services and the Kontakt lead are
   still the design's placeholder copy. */

import { DATA } from "../content/data.js";

export const CONTACT = {
  email: DATA.email,
  linkedin: DATA.linkedin,
  cv: { href: `/${DATA.cv.dir}${DATA.cv.pl.file}`, download: DATA.cv.pl.download },
  /* Where the form posts JSON { name, email, message } (Formspree and the
     like). While this is empty there is no backend, so the form hands the
     message to the visitor's own mail program instead of pretending. */
  formEndpoint: "",
};

export const ABOUT = {
  intro: "Cześć, jestem Joanna. Projektuję spokojne, czytelne interfejsy dla ludzi, którzy nie lubią się gubić.",
  portrait: "/assets/about-me-photo.png",
  me: {
    title: "Projektuję i wdrażam",
    text: [
      "SUOH i Nature&Future to moje projekty od pierwszego szkicu po produkcję — identyfikacja, interfejs, front-end, integracje płatności, deploy.",
      "Zaczynam od stanów pustych i błędów, kończę na typografii. Projekt uznaję za skończony, kiedy działa pod adresem, nie kiedy wygląda dobrze na artboardzie.",
    ],
  },
  services: {
    title: "W czym mogę pomóc",
    items: [
      ["UX research", "Wywiady, testy z użytkownikami i analiza danych, z których wynika, co naprawdę warto zmienić."],
      ["UI design", "Czytelne ekrany i spójne komponenty, które dobrze wyglądają i równie dobrze działają na telefonie."],
      ["Branding", "Logo, kolory i ton głosu, które pasują do produktu i nie gubią się, gdy marka zaczyna rosnąć."],
      ["Prototypowanie", "Klikalne makiety w Figmie, dzięki którym pomysł da się sprawdzić, zanim trafi do programistów."],
    ],
  },
  experience: {
    title: "Gdzie pracowałam",
    rows: [
      ["2024 — teraz", "Projektowanie produktowe", "wdrożenia własnych projektów"],
      ["2022 — teraz", "Freelance designer", "własna działalność"],
    ],
  },
  // DATA.stack, spelled with capitals
  tools: ["Figma", "Adobe Suite", "Canva", "HTML / CSS", "JavaScript", "React", "SQL", "Supabase", "Vercel", "Claude Code", "Claude Design", "Figma Make"],
  talk: { eyebrow: "szukam pracy na etat", title: "Porozmawiajmy" },
};

export const KONTAKT = {
  title: "Napisz do mnie",
  lead: "Szukam pracy na etat jako UX/UI designer — najchętniej w zespole produktowym, we Wrocławiu albo zdalnie.",
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
};

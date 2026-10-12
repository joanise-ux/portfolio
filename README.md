# Portfolio — Joanna Żuczkowska

Two portfolios live in this repo, each in its own place, built together by
Vite and published by Netlify from `main`.

| Where | What | Address |
| --- | --- | --- |
| `index.html`, `src/`, `design/v2/` | The portfolio: project orbit and list, Nuri, case studies, About, Kontakt, PL/EN | `/` |
| `portfolio-pulpit/` | The earlier desktop portfolio (NEON OS), whole in one folder — see its own README | `/portfolio-pulpit/` |

`public/assets/` holds the files both use (CV, portrait, screenshots).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## The portfolio (`src/`)

Plain JavaScript with three.js and GSAP; no framework.

| File | What it holds |
| --- | --- |
| `main.js` | Wires everything: input, navigation, history, language |
| `orbit.js`, `canvas.js` | The two project walls: the orbit and the infinite grid |
| `dots.js`, `nuri.js`, `buddy.js` | The dot field, Nuri's shape, and little Nuri on the page |
| `list.js` | The project list (the other side of the orbit / list switch) |
| `case.js`, `cases.js` | The case study page and its copy |
| `pages.js`, `profile.js` | About and Kontakt, and their copy and contact details |
| `tiles.js` | The projects and their placeholder cards |
| `i18n.js` | Language choice and interface strings |
| `main.css` | All styles |

Where to change things:

- **Projects** — `tiles.js` (names, categories, years) and `cases.js` (case study copy).
- **Bio, experience, e-mail, links** — `profile.js`.
- **Contact form** — it has no backend: it opens the visitor's mail program.
  Put a form service address in `CONTACT.formEndpoint` in `profile.js` to send for real.
- **Motion tuning panel** — add `?panel` to the address.

The home page is `noindex` until real projects replace the placeholder ones
(see the `robots` meta tag in `index.html`).

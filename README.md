# Pulpit NEON OS

Portfolio jako pulpit systemu — React + Vite implementation of the NEON OS
design system.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Layout model

The desktop is authored at a fixed **1440×900** and scaled to fit the viewport
(`useStage`). Every coordinate in the app — icon positions, window rects, drag
maths — is in that authored space; pointer deltas are divided by the live stage
scale before they're applied. If you add a positioned element, give it authored
pixels and let the stage scale it.

## Where things live

| Path | What |
| --- | --- |
| `src/content/data.js` | Facts: name, e-mail, links, dates, projects, screenshots, stack. **Edit personal details only here.** |
| `src/content/i18n.js` | Every user-visible string, `pl` + `en`. Nothing is hardcoded in components. |
| `src/content/registry.js` | Which windows exist and what each one contains. `kind` picks the body renderer. |
| `src/components/` | The design-system components — `Window`, `MenuBar`, `Dock`, `Widget`, `DesktopIcon`, `QuickLook`. |
| `src/components/windows/` | One body renderer per window `kind`: folder, doc, editor, mail, term. |
| `src/hooks/` | State machines: stage scaling, intro typewriter, window manager, terminal, mail, quick look. |
| `src/styles/tokens.css` | NEON OS design tokens, ported from the design system. |
| `design/` | The original Claude Design export (`Pulpit NEON OS.dc.html`, `_ds/`) kept for reference. Not built or served. |

## Adding a project

1. Drop the exported PNGs into `public/assets/`.
2. Add the project to `DATA.projects` in `src/content/data.js`, listing the
   files in `shots` — the first one is the hero tile.
3. Add its copy (`tagline`, `description`, optional `study`) under
   `projects.<key>` in **both** languages in `src/content/i18n.js`.

A project with no `shots` renders the empty state rather than placeholder
boxes — the grid only ever shows real exports. Filling in `study.problem`,
`study.proces` and `study.rezultat` populates the ▤ reading view.

## Loose image files on the desktop

The scattered image files (and the two polaroids) are cut from the project
exports by `scripts/desk-assets.py`, which writes a pair of WebPs per entry
into `public/assets/desk/`: the full crop for Quick Look, and a thumbnail at
exactly twice the box it renders in. Only the thumbnails ever reach the
desktop — together they are around 27 kB.

To change one, edit the crop and display size in that script, run
`python scripts/desk-assets.py`, and keep the display size in step with
`DESK_IMAGES` in `src/content/data.js`. Positions and the ±3° tilt live in
`initialLayout` / `ROTATION` in `src/App.jsx`; the name lockup settles across
roughly x 450–990 / y 333–475 and nothing is placed inside that box.

## Notes

- **Contact form** — `useMail` validates and then plays a staged send
  animation. There is no backend; nothing is transmitted. Wire it to a form
  service before relying on it.
- **CV link** — points at `/assets/cv_2026.pdf`. The design file referenced
  `/cv.pdf`, which had no file behind it; the path was corrected to the asset
  that actually ships. The PDF itself is a placeholder stub.
- **Language** — detected from `navigator.language`, overridden by the PL/EN
  switch, and remembered in `localStorage` under `neonos.lang`.
- **Fonts** stream from Google Fonts (Cormorant Garamond, JetBrains Mono,
  Caveat). Self-host them if the site must work offline.

## Design system rules worth keeping

- Content is ivory serif; the interface is mono, always lowercase.
- Gold marks identity — section labels, the `JŻ` monogram, the CV tile.
- Neon (violet/magenta) lives **only** on edges and indicators, never behind
  text.
- Chrome corners are sharp; only the dock softens.
- Shadows are black and deep — never coloured.

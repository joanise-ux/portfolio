import { useState } from "react";
import SectionLabel from "../SectionLabel.jsx";

const HERO_H = 244;
const TILE_H = 118;

/* Project folder. Two views over the same content:
   ▦ grid — the exported previews, hero first
   ▤ read — the write-up interleaved with the previews

   The grid only ever shows real exports; a project with no PNGs gets
   the empty state rather than placeholder boxes. */
export default function FolderWindow({ t, def, selectedShot, onOpenShot }) {
  const [mode, setMode] = useState("grid");

  const shots = def.shots || [];
  const study = def.study || {};

  const texts = [
    ["problem", t.ui.study[0]],
    ["proces", t.ui.study[1]],
    ["rezultat", t.ui.study[2]],
  ]
    .filter(([key]) => study[key])
    .map(([key, label]) => ({ label, text: study[key] }));

  // reading view alternates write-up and image, longest run wins
  const blocks = [];
  for (let i = 0; i < Math.max(texts.length, shots.length); i += 1) {
    if (texts[i]) blocks.push({ type: "text", ...texts[i] });
    if (shots[i]) blocks.push({ type: "img", index: i, ...shots[i] });
  }

  const cover = (src, height) => ({
    height,
    backgroundImage: `url(${src})`,
  });

  return (
    <div className="window__body">
      <div className="window__toolbar">
        <span className="window__crumb-arrows">‹ ›</span>
        <span>
          ~/{t.ui.projectsRoot}/{def.path}
        </span>
        <span style={{ flex: 1 }} />
        <span className="viewtoggle" data-nodrag="1">
          <button
            type="button"
            title={t.ui.grid}
            className={`viewtoggle__btn${mode === "grid" ? " is-on" : ""}`}
            onClick={() => setMode("grid")}
          >
            ▦
          </button>
          <button
            type="button"
            title={t.ui.read}
            className={`viewtoggle__btn${mode === "read" ? " is-on" : ""}`}
            onClick={() => setMode("read")}
          >
            ▤
          </button>
        </span>
      </div>

      <div className="window__scroll">
        <SectionLabel>{def.kicker}</SectionLabel>
        <div className="folder__h1">{def.h1}</div>
        <p className="folder__desc">{def.desc}</p>

        {mode === "grid" ? (
          <div>
            {shots.length ? (
              <div
                className={`tile${selectedShot === 0 ? " is-selected" : ""}`}
                data-nodrag="1"
                onClick={() => onOpenShot(0)}
              >
                <div className="tile__cover" style={cover(shots[0].src, HERO_H)} />
                <div className="tile__name">{shots[0].file}</div>
              </div>
            ) : null}

            {shots.length > 1 ? (
              <div className="shots">
                {shots.slice(1).map((s, i) => (
                  <div
                    key={s.file}
                    className={`tile${selectedShot === i + 1 ? " is-selected" : ""}`}
                    data-nodrag="1"
                    onClick={() => onOpenShot(i + 1)}
                  >
                    <div className="tile__cover" style={cover(s.src, TILE_H)} />
                    <div className="tile__name">{s.file}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {shots.length === 0 ? (
              <div className="empty">
                <div className="empty__title">
                  {t.ui.noShots}
                  {def.path}
                </div>
                <div className="empty__help">{t.ui.noShotsHelp}</div>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {blocks.map((b, i) =>
              b.type === "text" ? (
                <div className="readblock" key={`t${i}`}>
                  <SectionLabel>{b.label}</SectionLabel>
                  <p className="readblock__text">{b.text}</p>
                </div>
              ) : (
                <div className="readblock" key={b.file}>
                  <div
                    data-nodrag="1"
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenShot(b.index)}
                  >
                    <div className="readblock__img" style={{ backgroundImage: `url(${b.src})` }} />
                    <div className="readblock__file">{b.file}</div>
                  </div>
                </div>
              )
            )}
            {texts.length === 0 ? (
              <div style={{ fontSize: 11, letterSpacing: ".12em", color: "var(--ivory-34)" }}>
                {t.ui.noStudy}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <footer className="window__footer">
        <span>{def.count}</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "var(--ivory-34)" }}>{shots.length ? t.ui.spaceHint : ""}</span>
      </footer>
    </div>
  );
}

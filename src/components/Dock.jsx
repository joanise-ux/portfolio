export default function Dock({ t, revealed, revealDelay, cv, links, termOpen, minimized, actions }) {
  return (
    <div
      className={`dock reveal${revealed ? " is-revealed" : ""}`}
      style={{ "--reveal-delay": `${revealDelay}ms` }}
    >
      <button type="button" className="dock__item" onClick={actions.term}>
        <span className={`dock__glyph${termOpen ? " dock__glyph--active" : ""}`}>›_</span>
        <span className="dock__label">{t.dock.terminal}</span>
      </button>

      <button type="button" className="dock__item" onClick={actions.mail}>
        <span className="dock__glyph dock__glyph--mail">◨</span>
        <span className="dock__label">{t.dock.mail}</span>
      </button>

      <a className="dock__item" href={cv.url} download={cv.download}>
        <span className="dock__glyph dock__glyph--cv">▥</span>
        <span className="dock__label dock__label--cv">{cv.file}</span>
      </a>

      <a className="dock__item" href={links.linkedin} target="_blank" rel="noopener noreferrer">
        <span className="dock__glyph dock__glyph--linkedin">in</span>
        <span className="dock__label">{t.dock.linkedin}</span>
      </a>

      <a className="dock__item" href={links.github} target="_blank" rel="noopener noreferrer">
        <span className="dock__glyph">◍</span>
        <span className="dock__label">{t.dock.github}</span>
      </a>

      <span className="dock__sep" />

      {/* minimised windows land here and restore on click */}
      {minimized.map((m) => (
        <button type="button" className="dock__item" key={m.id} onClick={m.restore}>
          <span className="dock__glyph dock__glyph--min">{m.glyph}</span>
          <span className="dock__label dock__label--min">{m.short}</span>
        </button>
      ))}

      <button type="button" className="dock__item" onClick={actions.kosz}>
        <span className="dock__glyph dock__glyph--trash">▧</span>
        <span className="dock__label dock__label--trash">{t.dock.trash}</span>
      </button>
    </div>
  );
}

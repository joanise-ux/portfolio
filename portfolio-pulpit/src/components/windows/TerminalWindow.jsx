/* Terminal. The visible caret is a decorative block; the real input is
   parked offscreen and focused when the pane is clicked. */

const LINE_COLOR = {
  ivory: "var(--ivory)",
  dim: "var(--ivory-55)",
  magenta: "var(--magenta)",
  violet: "var(--violet)",
  gold: "var(--gold)",
};

export default function TerminalWindow({ term }) {
  const { lines, input, setInput, inputRef, scrollRef, focusInput, onKeyDown } = term;

  return (
    <div className="term" ref={scrollRef} onClick={focusInput}>
      {lines.map((l, i) => (
        // eslint-disable-next-line react/no-array-index-key -- log is append-only
        <div className="term__line" key={i} style={{ color: LINE_COLOR[l.c] || LINE_COLOR.ivory }}>
          {l.s}
        </div>
      ))}

      <div className="term__prompt">
        <span className="term__sigil">&gt;&gt;</span>
        <span className="term__input-echo">{input}</span>
        <span className="term__caret" />
      </div>

      <input
        ref={inputRef}
        className="term__input"
        value={input}
        spellCheck="false"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

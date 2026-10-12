/* stack.txt — the tools list rendered as a plain-text editor. */
export default function EditorWindow({ t, groups }) {
  return (
    <div className="window__body">
      <div className="window__toolbar" style={{ padding: "0 22px" }}>
        <span>~/about/stack.txt</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "var(--ivory-34)" }}>utf-8 · plain text</span>
      </div>

      <div className="editor">
        <div className="editor__comment" style={{ marginBottom: 16 }}>
          {t.editor.comment}
        </div>

        {groups.map((g) => (
          <div className="editor__group" key={g.name}>
            <div className="editor__group-name">[{g.name}]</div>
            {g.items.map((item) => (
              <div className="editor__item" key={item.n}>
                <span className="editor__arrow">→</span>
                <span className="editor__name">{item.n}</span>
                <span className="editor__note">{item.m}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="editor__comment">// eof</div>
      </div>

      <footer className="window__footer" style={{ padding: "10px 24px" }}>
        <span>{t.editor.pos}</span>
        <span>{t.editor.sections(groups.length)}</span>
        <span style={{ flex: 1 }} />
        <span className="editor__saved">{t.editor.saved}</span>
      </footer>
    </div>
  );
}

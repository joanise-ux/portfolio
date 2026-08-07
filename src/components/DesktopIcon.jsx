/* Two icon bodies, both drawn in CSS rather than shipped as images:
   a gold manila folder for projects, an ivory sheet for text files. */

function FolderGlyph() {
  return (
    <div className="icon__folder">
      <div className="icon__folder-tab" />
      <div className="icon__folder-body" />
      <div className="icon__folder-sheen" />
    </div>
  );
}

function DocGlyph() {
  return (
    <div className="icon__doc">
      <div className="icon__doc-line" />
      <div className="icon__doc-line" />
      <div className="icon__doc-line" />
    </div>
  );
}

export default function DesktopIcon({ variant = "folder", label, sub, width = 116 }) {
  return (
    <div className="icon" style={{ width }}>
      {variant === "folder" ? <FolderGlyph /> : <DocGlyph />}
      <div className="icon__label">{label}</div>
      {sub ? <div className="icon__sub">{sub}</div> : null}
    </div>
  );
}

import { DESK_H, DESK_W } from "../hooks/useStage.js";

const MENUBAR_H = 34;

/* Window chrome: title bar, controls, resize grip.

   Minimising animates the frame down into the dock rather than just
   hiding it, so the translate below is computed from the window's own
   centre to the dock's. */
export default function Window({
  win,
  title,
  focused,
  onFocus,
  onDragStart,
  onResizeStart,
  onMinimize,
  onToggleMax,
  onClose,
  children,
}) {
  const x = win.max ? 0 : win.x;
  const y = win.max ? MENUBAR_H : win.y;
  const w = win.max ? DESK_W : win.w;
  const h = win.max ? DESK_H - MENUBAR_H : win.h;

  let transform;
  if (win.min) {
    const dx = Math.round(DESK_W / 2 - (x + w / 2));
    const dy = Math.round(DESK_H - 46 - (y + h / 2));
    transform = `translate(${dx}px,${dy}px) scale(.06)`;
  }

  const classes = [
    "window",
    focused && !win.min ? "is-focused" : "",
    win.max ? "is-max" : "",
    win.min ? "is-min" : "",
    win.spawn ? "is-spawning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onPointerDown={onFocus}
      style={{ left: x, top: y, width: w, height: h, zIndex: win.z, transform }}
    >
      <header className="window__bar" onPointerDown={onDragStart} onDoubleClick={onToggleMax}>
        <span className="window__title">{title}</span>
        <span style={{ flex: 1 }} />
        <span className="window__controls">
          <button type="button" data-nodrag="1" className="window__ctl" onClick={onMinimize}>
            ─
          </button>
          <button type="button" data-nodrag="1" className="window__ctl" onClick={onToggleMax}>
            □
          </button>
          <button type="button" data-nodrag="1" className="window__ctl" onClick={onClose}>
            ×
          </button>
        </span>
      </header>

      {children}

      <div className="window__grip" data-nodrag="1" onPointerDown={onResizeStart}>
        <span />
        <span />
      </div>
    </div>
  );
}

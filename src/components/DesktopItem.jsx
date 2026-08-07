/* Positioning + drag shell shared by every loose object on the desktop:
   icons, the polaroid, the widgets, the sticky note.

   `revealDelay` staggers the boot fade — App sorts items by distance
   from the centre of the screen so the desktop assembles outward. */

export const FALLBACK_POSITION = { x: 40, y: 62 };

export default function DesktopItem({
  /* An item whose key is missing from the layout parks in the top-left
     corner. It used to throw, which took the whole desktop down with it
     — a stray icon is a far better failure than a blank screen. */
  position = FALLBACK_POSITION,
  rotation = 0,
  dragging = false,
  revealed,
  revealDelay = 0,
  onPointerDown,
  children,
}) {
  return (
    <div
      className={`item${dragging ? " is-dragging" : ""}`}
      onPointerDown={onPointerDown}
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation + (dragging ? 2 : 0)}deg)${dragging ? " scale(1.03)" : ""}`,
        opacity: revealed ? 1 : 0,
        pointerEvents: revealed ? "auto" : "none",
        "--reveal-delay": `${revealDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}

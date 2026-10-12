import { useCallback, useEffect, useRef, useState } from "react";

const DISMISS_DRAG = 110; // px of downward swipe before the sheet closes

/* Full-bleed image viewer. Opens from a folder tile or the space bar,
   steps with ← →, closes on esc / space / swipe-down. */
export function useQuickLook({ registry }) {
  const [open, setOpen] = useState(null); // { id, index }
  const [selected, setSelected] = useState({}); // last-viewed shot per folder
  const [dragY, setDragY] = useState(0);
  const [hint, setHint] = useState(0); // 0 off · 1 shown · 2 fading

  const hintSeenRef = useRef(false);
  const hintTimersRef = useRef([]);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);

  const shotsOf = useCallback((id) => registry[id]?.shots || [], [registry]);

  const show = useCallback(
    (id, index) => {
      setSelected((prev) => ({ ...prev, [id]: index }));
      setOpen({ id, index });
      setDragY(0);

      // the swipe/arrow hint appears once per session
      if (hintSeenRef.current) return;
      hintSeenRef.current = true;
      setHint(1);
      hintTimersRef.current.push(setTimeout(() => setHint(2), 3000));
      hintTimersRef.current.push(setTimeout(() => setHint(0), 3600));
    },
    []
  );

  const close = useCallback(() => {
    setOpen(null);
    setDragY(0);
  }, []);

  const step = useCallback(
    (delta) => {
      setOpen((prev) => {
        if (!prev) return prev;
        const count = shotsOf(prev.id).length;
        if (!count) return prev;
        const next = prev.index + delta;
        if (next < 0 || next > count - 1) return prev;
        setSelected((sel) => ({ ...sel, [prev.id]: next }));
        setDragY(0);
        return { id: prev.id, index: next };
      });
    },
    [shotsOf]
  );

  /* Touch only — a mouse gets the arrows and the close button. */
  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse") return;
    startYRef.current = e.clientY;
    draggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      /* capture is a nicety; the gesture still works without it */
    }
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const d = e.clientY - startYRef.current;
    setDragY(d > 0 ? d : 0);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragY((d) => {
      if (d > DISMISS_DRAG) setOpen(null);
      return 0;
    });
  }, []);

  useEffect(
    () => () => {
      hintTimersRef.current.forEach(clearTimeout);
    },
    []
  );

  const shots = open ? shotsOf(open.id) : [];
  const index = open ? Math.min(open.index, Math.max(0, shots.length - 1)) : 0;

  return {
    isOpen: !!(open && shots.length),
    shots,
    index,
    selected,
    dragY,
    isDragging: draggingRef.current,
    hint,
    shotsOf,
    show,
    close,
    step,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}

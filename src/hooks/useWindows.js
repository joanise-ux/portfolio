import { useCallback, useRef, useState } from "react";
import { windowSize } from "../content/registry.js";
import { DESK_H, DESK_W } from "./useStage.js";

/* Window manager: stacking order, spawn/minimise/maximise, and the
   pointer drag layer for both windows and desktop icons.

   All geometry is in authored 1440×900 pixels, so pointer deltas are
   divided by the live stage scale before they're applied. */
export function useWindows({ registry, getScale, iconPositions, setIconPositions, closeMenus }) {
  const [wins, setWins] = useState([]);
  const [topZ, setTopZ] = useState(300);
  const [draggingIcon, setDraggingIcon] = useState(null);

  const gestureRef = useRef(null);
  const timersRef = useRef([]);

  const after = useCallback((ms, fn) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  const patch = useCallback((id, changes) => {
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...changes } : w)));
  }, []);

  const focus = useCallback((id) => {
    setTopZ((z) => {
      const next = z + 1;
      setWins((prev) => {
        const target = prev.find((w) => w.id === id);
        if (!target || target.z === z) return prev; // already on top
        return prev.map((w) => (w.id === id ? { ...w, z: next } : w));
      });
      return next;
    });
    closeMenus?.();
  }, [closeMenus]);

  const open = useCallback(
    (id) => {
      const def = registry[id];
      if (!def) return;
      closeMenus?.();

      setTopZ((z) => {
        const next = z + 1;
        setWins((prev) => {
          if (prev.some((w) => w.id === id)) {
            // already open (possibly minimised) — raise and restore
            return prev.map((w) => (w.id === id ? { ...w, min: false, z: next, spawn: false } : w));
          }
          const [w, h] = windowSize(def.kind, DESK_W, DESK_H);
          // cascade: every window lands offset from the last few
          const n = prev.length % 5;
          const x = Math.max(20, Math.round((DESK_W - w) / 2) + (n - 2) * 32);
          const y = Math.max(48, Math.round((DESK_H - h) / 2 - 34) + (n - 2) * 26);
          return [...prev, { id, kind: def.kind, x, y, w, h, z: next, min: false, max: false, spawn: true }];
        });
        return next;
      });

      // let the spawn transform paint once, then release it
      after(30, () => patch(id, { spawn: false }));
    },
    [registry, closeMenus, after, patch]
  );

  const close = useCallback((id) => setWins((prev) => prev.filter((w) => w.id !== id)), []);
  const minimize = useCallback((id) => patch(id, { min: true }), [patch]);
  const clearAll = useCallback(() => setWins([]), []);

  const toggleMax = useCallback((id) => {
    setWins((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.max) return { ...w, max: false, ...(w.prev || {}) };
        return { ...w, max: true, prev: { x: w.x, y: w.y, w: w.w, h: w.h } };
      })
    );
  }, []);

  /* ── gestures ────────────────────────────────────────────────── */

  const startIconDrag = useCallback(
    (key, e) => {
      if (e.button != null && e.button !== 0) return;
      if (e.target?.closest?.("[data-nodrag]")) return;
      const el = e.currentTarget;
      const base = iconPositions[key] || { x: 40, y: 62 };
      gestureRef.current = {
        mode: "icon",
        key,
        scale: getScale(),
        sx: e.clientX,
        sy: e.clientY,
        ox: base.x,
        oy: base.y,
        w: el.offsetWidth,
        h: el.offsetHeight,
        moved: false,
      };
      e.preventDefault?.();
      closeMenus?.();
      setDraggingIcon(key);
    },
    [iconPositions, getScale, closeMenus]
  );

  const startWindowDrag = useCallback(
    (id, e) => {
      if (e.button != null && e.button !== 0) return;
      if (e.target?.closest?.("[data-nodrag]")) return;
      const w = wins.find((x) => x.id === id);
      if (!w || w.max) return;
      gestureRef.current = {
        mode: "win",
        id,
        scale: getScale(),
        sx: e.clientX,
        sy: e.clientY,
        ox: w.x,
        oy: w.y,
      };
      e.preventDefault?.();
      focus(id);
    },
    [wins, getScale, focus]
  );

  const startResize = useCallback(
    (id, e) => {
      if (e.button != null && e.button !== 0) return;
      const w = wins.find((x) => x.id === id);
      if (!w) return;
      gestureRef.current = {
        mode: "size",
        id,
        scale: getScale(),
        sx: e.clientX,
        sy: e.clientY,
        ow: w.w,
        oh: w.h,
      };
      e.preventDefault?.();
      focus(id);
    },
    [wins, getScale, focus]
  );

  const onPointerMove = useCallback(
    (e) => {
      const g = gestureRef.current;
      if (!g) return;
      const k = g.scale || 1;
      const dx = (e.clientX - g.sx) / k;
      const dy = (e.clientY - g.sy) / k;

      if (g.mode === "icon") {
        // past the slop threshold this stops being a click
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) g.moved = true;
        const x = Math.max(6, Math.min(DESK_W - g.w - 6, g.ox + dx));
        const y = Math.max(40, Math.min(DESK_H - g.h - 8, g.oy + dy));
        setIconPositions((prev) => ({ ...prev, [g.key]: { x, y } }));
      } else if (g.mode === "win") {
        patch(g.id, {
          x: Math.max(-160, Math.min(DESK_W - 120, g.ox + dx)),
          y: Math.max(34, Math.min(DESK_H - 60, g.oy + dy)),
        });
      } else if (g.mode === "size") {
        patch(g.id, {
          w: Math.max(360, Math.min(DESK_W - 24, g.ow + dx)),
          h: Math.max(220, Math.min(DESK_H - 48, g.oh + dy)),
        });
      }
    },
    [patch, setIconPositions]
  );

  /* Returns the icon key if the gesture was a click rather than a drag,
     so the caller can decide what to open. */
  const onPointerUp = useCallback(() => {
    const g = gestureRef.current;
    if (!g) return null;
    gestureRef.current = null;
    if (g.mode !== "icon") return null;
    setDraggingIcon(null);
    return g.moved ? null : g.key;
  }, []);

  const disposeTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  return {
    wins,
    topZ,
    draggingIcon,
    open,
    close,
    focus,
    minimize,
    toggleMax,
    clearAll,
    after,
    startIconDrag,
    startWindowDrag,
    startResize,
    onPointerMove,
    onPointerUp,
    disposeTimers,
  };
}

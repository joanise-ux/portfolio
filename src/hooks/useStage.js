import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/* The desktop is authored at a fixed size and scaled to fit the
   viewport. Everything downstream works in authored pixels; only this
   hook knows about real ones. */
export const DESK_W = 1440;
export const DESK_H = 900;

export function useStage() {
  const wrapRef = useRef(null);
  const deskRef = useRef(null);
  const [scale, setScale] = useState(1);

  const measure = useCallback(() => {
    const el = wrapRef.current;
    const vw = el ? el.clientWidth : window.innerWidth;
    const vh = el ? el.clientHeight : window.innerHeight;
    // A hidden container (background tab, display:none ancestor) measures
    // 0 and would collapse the desktop to scale(0). Keep the last good
    // value until it can be measured for real.
    if (vw <= 0 || vh <= 0) return;
    setScale(Math.min(vw / DESK_W, vh / DESK_H));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Live scale read off the DOM. Drag handlers need the value at the
     moment of the gesture, not the one captured at render. */
  const getScale = useCallback(() => {
    const el = deskRef.current;
    if (!el) return 1;
    const r = el.getBoundingClientRect();
    return r.width ? r.width / DESK_W : 1;
  }, []);

  return { wrapRef, deskRef, scale, getScale };
}

import { useCallback, useEffect, useRef, useState } from "react";

/* Boot typewriter. The two lines are written straight into their DOM
   nodes rather than through state — one setState per character would
   re-render the whole desktop ~50 times during the intro. React only
   hears about the handful of things that matter: which caret is live,
   whether the lockup has shrunk to its desktop size, and whether the
   rest of the chrome has been revealed. */

/* Beat after the last character, spent blinking, before the shrink. */
const HOLD_MS = 600;
/* Must match the .hero transform transition in global.css. */
const SHRINK_MS = 900;

export function useIntro(name, role) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const timersRef = useRef([]);

  const [caret, setCaret] = useState(1); // 1 = name, 2 = role, 0 = done
  const [settled, setSettled] = useState(false); // lockup at desktop size + position
  const [revealed, setRevealed] = useState(false); // desktop items may fade in
  const [instant, setInstant] = useState(false); // sequence was skipped — no tween

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    const at = (ms, fn) => timersRef.current.push(setTimeout(fn, ms));
    const jitter = (base, j) => Math.max(12, base + (Math.random() * 2 - 1) * j);

    if (line1Ref.current) line1Ref.current.textContent = "";
    if (line2Ref.current) line2Ref.current.textContent = "";
    setCaret(1);
    setSettled(false);
    setRevealed(false);
    setInstant(false);

    let i = 0;
    let j = 0;

    const typeRole = () => {
      j += 1;
      if (line2Ref.current) line2Ref.current.textContent = role.slice(0, j);
      if (j < role.length) at(jitter(35, 12), typeRole);
      else
        at(HOLD_MS, () => {
          // Caret goes out, the lockup starts shrinking towards the
          // desktop, and the menu bar rides along with it. Everything
          // else waits for the shrink to land.
          setCaret(0);
          setSettled(true);
          at(SHRINK_MS, () => setRevealed(true));
        });
    };

    const typeName = () => {
      i += 1;
      if (line1Ref.current) line1Ref.current.textContent = name.slice(0, i);
      if (i < name.length) at(jitter(55, 20), typeName);
      else
        at(400, () => {
          setCaret(2);
          typeRole();
        });
    };

    at(620, typeName);
  }, [name, role, clearTimers]);

  /* Click anywhere during the boot: wind the whole sequence to its end. */
  const skip = useCallback(() => {
    clearTimers();
    if (line1Ref.current) line1Ref.current.textContent = name;
    if (line2Ref.current) line2Ref.current.textContent = role;
    setCaret(0);
    setInstant(true);
    setSettled(true);
    setRevealed(true);
  }, [name, role, clearTimers]);

  useEffect(() => {
    play();
    return clearTimers;
    // Intentionally runs once: replay is manual, and a language switch
    // repaints line 2 in place (see syncRole) rather than restarting.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* After a language switch the already-typed role line is stale. */
  const syncRole = useCallback(
    (nextRole) => {
      if (revealed && line2Ref.current) line2Ref.current.textContent = nextRole;
    },
    [revealed]
  );

  return { line1Ref, line2Ref, caret, settled, revealed, instant, replay: play, skip, syncRole };
}

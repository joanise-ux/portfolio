import { useCallback, useEffect, useRef, useState } from "react";

/* Boot typewriter. The two lines are written straight into their DOM
   nodes rather than through state — one setState per character would
   re-render the whole desktop ~50 times during the intro. React only
   hears about the two things that matter: which caret is live, and
   whether the chrome has been revealed. */
export function useIntro(name, role) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const timersRef = useRef([]);

  const [caret, setCaret] = useState(1); // 1 = name, 2 = role, 0 = done
  const [revealed, setRevealed] = useState(false);

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
    setRevealed(false);

    let i = 0;
    let j = 0;

    const typeRole = () => {
      j += 1;
      if (line2Ref.current) line2Ref.current.textContent = role.slice(0, j);
      if (j < role.length) at(jitter(35, 12), typeRole);
      else
        at(120, () => {
          setRevealed(true);
          at(2000, () => setCaret(0));
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

  return { line1Ref, line2Ref, caret, revealed, replay: play, syncRole };
}

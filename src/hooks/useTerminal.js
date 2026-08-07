import { useCallback, useEffect, useRef, useState } from "react";
import { ALIASES, DATA, yearsSinceCareerStart } from "../content/data.js";

/* Line colours are semantic keys, not hex — Terminal.jsx maps them to
   design-system variables. */
const IVORY = "ivory";
const DIM = "dim";
const MAG = "magenta";
const VIO = "violet";
const GOLD = "gold";

const HISTORY_LIMIT = 20;

export function useTerminal({ t, registry, open, after }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const bootTimersRef = useRef([]);

  /* Keep the log pinned to the bottom as it grows. */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const helpLines = useCallback(() => {
    const c = t.term.cmd;
    const pad = (s) => `${s}                `.slice(0, 16);
    return [
      { c: IVORY, s: "" },
      { c: GOLD, s: t.term.helpTitle },
      { c: IVORY, s: `  ${pad("whoami")}${c.whoami}` },
      { c: IVORY, s: `  ${pad("ls")}${c.ls}` },
      { c: IVORY, s: `  ${pad("open [project]")}${c.open}` },
      { c: IVORY, s: `  ${pad("contact")}${c.contact}` },
      { c: IVORY, s: `  ${pad("cv")}${c.cv}${DATA.cv.file}` },
      { c: IVORY, s: `  ${pad("hire")}${c.hire}` },
      { c: IVORY, s: `  ${pad("help")}${c.help}` },
      { c: IVORY, s: "" },
    ];
  }, [t]);

  /* Staggered boot log — one line every 70ms so it reads as a machine
     coming up rather than a paste. */
  const boot = useCallback(() => {
    bootTimersRef.current.forEach(clearTimeout);
    bootTimersRef.current = [];
    setLines([]);
    setInput("");

    const seq = [
      { c: VIO, s: ":: mount /portfolio … ok" },
      { c: DIM, s: `zsh — ${DATA.email.split("@")[0]}@neon-os · ${new Date().getFullYear()}` },
      ...helpLines(),
    ];
    seq.forEach((line, i) => {
      bootTimersRef.current.push(
        setTimeout(() => setLines((prev) => [...prev, line]), 90 + i * 70)
      );
    });
    bootTimersRef.current.push(setTimeout(focusInput, 120));
  }, [helpLines, focusInput]);

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim();
      if (!cmd) {
        setLines((prev) => [...prev, { c: MAG, s: ">> " }]);
        return;
      }

      const out = [{ c: MAG, s: `>> ${cmd}` }];
      const parts = cmd.toLowerCase().split(/\s+/);
      const head = parts[0];

      if (head === "help") {
        out.push(...helpLines());
      } else if (head === "whoami") {
        out.push(
          { c: IVORY, s: `${DATA.name.toLowerCase()} — ${t.role}` },
          { c: DIM, s: `${DATA.city} · ${t.years(yearsSinceCareerStart())} · ${t.status}` }
        );
      } else if (head === "ls") {
        DATA.projects.forEach((p) =>
          out.push({ c: IVORY, s: `  ${p.slug}   ${(t.projects[p.key] || {}).tagline || ""}` })
        );
        out.push({ c: DIM, s: `  bio.md   ${DATA.cv.file}   kontakt.txt   stack.txt` });
      } else if (head === "open") {
        const key = ALIASES[(parts[1] || "").replace(/\/$/, "")];
        if (key) {
          out.push({ c: VIO, s: `:: open ${registry[key].path} … ok` });
          after(60, () => open(key));
        } else {
          out.push(
            { c: MAG, s: t.term.notFound + (parts[1] || "—") },
            { c: DIM, s: t.term.notFoundHint }
          );
        }
      } else if (head === "contact") {
        out.push(
          { c: IVORY, s: `  e-mail      ${DATA.email}` },
          { c: IVORY, s: `  linkedin    ${DATA.linkedin}` },
          { c: VIO, s: `:: ${t.responseTime} … ok` }
        );
        after(60, () => open("kontakt"));
      } else if (head === "cv") {
        out.push({ c: VIO, s: `:: ${DATA.cv.file} — ${DATA.cv.size} … ok` });
        after(60, () => open("cv"));
      } else if (head === "hire") {
        out.push(
          { c: IVORY, s: `${t.status} — ${t.availability}` },
          { c: IVORY, s: t.term.scope + t.docs.bio.zakres.split(".")[0].toLowerCase() },
          { c: VIO, s: `${t.term.write}${DATA.email} … ok` }
        );
      } else if (head === "clear") {
        setLines([]);
        setInput("");
        return;
      } else {
        out.push({ c: MAG, s: `!! command not found: ${head}` }, { c: DIM, s: t.term.typeHelp });
      }

      out.push({ c: IVORY, s: "" });
      setLines((prev) => [...prev, ...out]);
      setInput("");
      setHistory((prev) => [cmd, ...prev].slice(0, HISTORY_LIMIT));
      setHistoryIndex(-1);
    },
    [t, registry, open, after, helpLines]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        run(input);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((i) => {
          const next = Math.min(history.length - 1, i + 1);
          if (next < 0) return i;
          setInput(history[next]);
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((i) => {
          const next = i - 1;
          setInput(next < 0 ? "" : history[next]);
          return next;
        });
      }
    },
    [input, history, run]
  );

  useEffect(
    () => () => {
      bootTimersRef.current.forEach(clearTimeout);
    },
    []
  );

  return { lines, input, setInput, inputRef, scrollRef, focusInput, boot, onKeyDown };
}

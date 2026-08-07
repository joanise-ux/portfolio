import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Dock from "./components/Dock.jsx";
import DesktopIcon from "./components/DesktopIcon.jsx";
import DesktopItem from "./components/DesktopItem.jsx";
import MenuBar from "./components/MenuBar.jsx";
import QuickLook from "./components/QuickLook.jsx";
import Window from "./components/Window.jsx";
import { BuildingWidget, LearningWidget, Polaroid, StickyNote } from "./components/Widget.jsx";
import DocWindow from "./components/windows/DocWindow.jsx";
import EditorWindow from "./components/windows/EditorWindow.jsx";
import FolderWindow from "./components/windows/FolderWindow.jsx";
import MailWindow from "./components/windows/MailWindow.jsx";
import TerminalWindow from "./components/windows/TerminalWindow.jsx";

import {
  DATA,
  PROJECTS_BY_KEY,
  PROJECT_KEYS,
  learningPercent,
  daysSinceLearnStart,
  yearsSinceCareerStart,
} from "./content/data.js";
import { I18N, LANG_STORAGE_KEY, detectLang } from "./content/i18n.js";
import { buildRegistry } from "./content/registry.js";
import { useClocks } from "./hooks/useClocks.js";
import { useIntro } from "./hooks/useIntro.js";
import { useMail } from "./hooks/useMail.js";
import { useQuickLook } from "./hooks/useQuickLook.js";
import { DESK_W, useStage } from "./hooks/useStage.js";
import { useTerminal } from "./hooks/useTerminal.js";
import { useWindows } from "./hooks/useWindows.js";

/* Everything loose on the desktop, in no particular order — the reveal
   stagger below sorts them by distance from the centre of the screen. */
const ITEMS = [...PROJECT_KEYS, "readme", "stack", "polaroid", "building", "learning", "sticky"];

/* Which window each item opens. Widgets and the sticky note open nothing. */
const OPENS = {
  ...Object.fromEntries(PROJECT_KEYS.map((k) => [k, k])),
  readme: "readme",
  stack: "stack",
  polaroid: "bio",
};

/* A couple of items sit slightly off-square, like objects put down by hand. */
const ROTATION = { polaroid: -3.2, sticky: 2.4 };

const initialLayout = () => ({
  suoh: { x: 40, y: 62 },
  nature: { x: 172, y: 188 },
  logtxt: { x: 44, y: 314 },
  web: { x: 176, y: 440 },
  branding: { x: 48, y: 566 },
  readme: { x: 180, y: 686 },
  stack: { x: 44, y: 692 },
  polaroid: { x: Math.max(300, DESK_W - 288), y: 58 },
  building: { x: Math.max(300, DESK_W - 276), y: 356 },
  learning: { x: Math.max(300, DESK_W - 276), y: 552 },
  sticky: { x: Math.max(300, DESK_W - 520), y: 566 },
});

export default function App({ showScanline = true, showGrain = true }) {
  const [lang, setLang] = useState(detectLang);
  const t = I18N[lang];
  const registry = useMemo(() => buildRegistry(t), [t]);

  const [iconPositions, setIconPositions] = useState(initialLayout);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPinned, setMenuPinned] = useState(false);

  const { wrapRef, deskRef, scale, getScale } = useStage();
  const clocks = useClocks();
  const intro = useIntro(DATA.name, t.role);
  const mail = useMail(t);
  const ql = useQuickLook({ registry });

  const closeMenus = useCallback(() => {
    setOpenMenu(null);
    setMenuPinned(false);
  }, []);

  const windows = useWindows({
    registry,
    getScale,
    iconPositions,
    setIconPositions,
    closeMenus,
  });
  const { wins, topZ, draggingIcon, open, after } = windows;

  const term = useTerminal({ t, registry, open, after });

  /* Opening the terminal replays its boot log. Held in a ref so the
     callback below doesn't have to be rebuilt whenever the log grows. */
  const bootRef = useRef(term.boot);
  bootRef.current = term.boot;

  const openWindow = useCallback(
    (id) => {
      open(id);
      if (id === "term") bootRef.current();
    },
    [open]
  );

  useEffect(() => windows.disposeTimers, [windows.disposeTimers]);

  /* ── language ────────────────────────────────────────────────── */

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "pl" ? "en" : "pl";
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        /* storage unavailable — the switch still applies for this session */
      }
      intro.syncRole(I18N[next].role);
      return next;
    });
  }, [intro]);

  /* ── global pointer + keyboard ───────────────────────────────── */

  useEffect(() => {
    const onMove = (e) => windows.onPointerMove(e);
    const onUp = () => {
      const clickedIcon = windows.onPointerUp();
      if (clickedIcon && OPENS[clickedIcon]) openWindow(OPENS[clickedIcon]);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [windows, openWindow]);

  /* A click anywhere winds the boot sequence to its end. The replay
     button is exempt — clicking it mid-boot means "start over", not
     "skip", and the skip would fight the restart. */
  const introRunning = !intro.revealed;
  const skipIntro = intro.skip;

  useEffect(() => {
    if (!introRunning) return undefined;
    const onDown = (e) => {
      if (e.target instanceof Element && e.target.closest(".replay")) return;
      skipIntro();
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [introRunning, skipIntro]);

  /* Top-most non-minimised folder — the one the space bar previews. */
  const topFolder = useMemo(() => {
    let best = null;
    wins.forEach((w) => {
      if (w.min || registry[w.id]?.kind !== "folder") return;
      if (!best || w.z > best.z) best = w;
    });
    return best;
  }, [wins, registry]);

  useEffect(() => {
    const onKey = (e) => {
      if (ql.isOpen) {
        if (e.key === "Escape" || e.key === " ") {
          e.preventDefault();
          ql.close();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          ql.step(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          ql.step(1);
        }
        return;
      }
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key !== " " || !topFolder) return;
      if (!ql.shotsOf(topFolder.id).length) return;
      e.preventDefault();
      ql.show(topFolder.id, ql.selected[topFolder.id] || 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ql, topFolder]);

  /* ── reveal stagger ──────────────────────────────────────────── */

  /* Items fade in from the middle of the screen outwards, 60ms apart,
     starting once the intro lockup has finished shrinking. The menu bar
     is not in here — it rides along with the shrink instead. */
  const revealDelays = useMemo(() => {
    const entries = ITEMS.map((k) => {
      const p = iconPositions[k] || { x: 40, y: 62 };
      return { k, d: Math.hypot(p.x + 58 - 720, p.y + 50 - 450) };
    })
      .concat([{ k: "__dock", d: 380 }])
      .sort((a, b) => a.d - b.d);
    return Object.fromEntries(entries.map((e, i) => [e.k, i * 60]));
  }, [iconPositions]);

  /* ── derived view data ───────────────────────────────────────── */

  const { revealed, settled } = intro;
  const termOpen = wins.some((w) => w.id === "term" && !w.min);
  const buildProject = PROJECTS_BY_KEY[DATA.building.projectKey];
  const years = t.years(yearsSinceCareerStart());

  const links = {
    linkedin: DATA.linkedin,
    github: DATA.github,
    linkedinHandle: DATA.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/, ""),
    githubHandle: DATA.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""),
  };
  const cv = { url: DATA.cvUrl, download: DATA.cvDownload, file: DATA.cv.file, size: DATA.cv.size };

  const actions = useMemo(() => {
    const map = {};
    ["term", "mail", "cv", "bio", "exp", "tools", "kontakt", "kosz", "readme", "stack"].forEach(
      (k) => {
        map[k] = () => openWindow(k);
      }
    );
    map.clear = () => {
      windows.clearAll();
      closeMenus();
    };
    return map;
  }, [openWindow, windows, closeMenus]);

  const menuProjects = DATA.projects.map((p) => ({
    key: p.key,
    slug: p.slug,
    meta: (t.projects[p.key] || {}).menuMeta || "",
    open: () => openWindow(p.key),
  }));

  const minimized = wins
    .filter((w) => w.min)
    .map((w) => ({
      id: w.id,
      short: registry[w.id].short,
      glyph: registry[w.id].glyph,
      restore: () => openWindow(w.id),
    }));

  const itemProps = (key) => ({
    position: iconPositions[key],
    rotation: ROTATION[key] || 0,
    dragging: draggingIcon === key,
    revealed,
    revealDelay: revealDelays[key],
    onPointerDown: (e) => windows.startIconDrag(key, e),
  });

  /* ── window body per kind ────────────────────────────────────── */

  const renderBody = (win) => {
    const def = registry[win.id];
    switch (def.kind) {
      case "folder":
        return (
          <FolderWindow
            t={t}
            def={def}
            selectedShot={ql.selected[win.id] || 0}
            onOpenShot={(i) => ql.show(win.id, i)}
          />
        );
      case "doc":
        return <DocWindow sections={def.sections} />;
      case "editor":
        return <EditorWindow t={t} groups={def.groups} />;
      case "mail":
        return <MailWindow t={t} email={DATA.email} mail={mail} />;
      case "term":
        return <TerminalWindow term={term} />;
      default:
        return null;
    }
  };

  return (
    <div className="stage-wrap" ref={wrapRef}>
      <div
        className={`stage${intro.instant ? " is-boot-skipped" : ""}`}
        ref={deskRef}
        style={{ transform: `translate(-50%,-50%) scale(${scale})` }}
      >
        <div className="bloom bloom--tr" />
        <div className="bloom bloom--bl" />
        {showScanline ? <div className="scanline" /> : null}
        {showGrain ? <div className="grain" /> : null}

        {/* ── intro lockup ── */}
        <div
          className={`hero${intro.settled ? " is-settled" : ""}${
            intro.instant ? " is-instant" : ""
          }`}
        >
          <div className="hero__name">
            <span ref={intro.line1Ref} />
            {intro.caret === 1 ? <span className="hero__caret hero__caret--l1" /> : null}
          </div>
          <div className="hero__role">
            <span ref={intro.line2Ref} />
            {intro.caret === 2 ? <span className="hero__caret hero__caret--l2" /> : null}
          </div>
        </div>

        <button type="button" className="replay" title={t.ui.replayHint} onClick={intro.replay}>
          <span style={{ fontSize: 11 }}>↻</span>
          {t.ui.replay}
        </button>

        <MenuBar
          t={t}
          revealed={settled}
          revealDelay={0}
          lang={lang}
          onToggleLang={toggleLang}
          status={t.status}
          clocks={clocks}
          years={years}
          email={DATA.email}
          links={links}
          cv={cv}
          menuProjects={menuProjects}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          pinned={menuPinned}
          setPinned={setMenuPinned}
          actions={actions}
        />

        {/* ── desktop items ── */}
        {PROJECT_KEYS.map((key) => {
          const p = PROJECTS_BY_KEY[key];
          const isDoc = !p.slug.endsWith("/");
          return (
            <DesktopItem key={key} {...itemProps(key)}>
              <DesktopIcon
                variant={isDoc ? "doc" : "folder"}
                label={p.slug}
                sub={(t.projects[key] || {}).sub}
                width={key === "nature" ? 126 : 116}
              />
            </DesktopItem>
          );
        })}

        <DesktopItem {...itemProps("readme")}>
          <DesktopIcon variant="doc" label="README.txt" />
        </DesktopItem>

        <DesktopItem {...itemProps("stack")}>
          <DesktopIcon variant="doc" label="stack.txt" />
        </DesktopItem>

        <DesktopItem {...itemProps("polaroid")}>
          <Polaroid src="/assets/suoh-about.png" alt="about_me.jpg" caption="about_me.jpg" />
        </DesktopItem>

        <DesktopItem {...itemProps("building")}>
          <BuildingWidget
            label={t.widgets.building}
            name={buildProject ? buildProject.name : ""}
            meta={DATA.building.meta}
            log={t.widgets.buildLog(DATA.building.commits, DATA.building.lastUpdate)}
            percent={DATA.building.progress}
          />
        </DesktopItem>

        <DesktopItem {...itemProps("learning")}>
          <LearningWidget
            label={t.widgets.learning}
            subject="한국어"
            percent={learningPercent()}
            day={t.widgets.learnDay(daysSinceLearnStart(), DATA.learningLevel)}
          />
        </DesktopItem>

        <DesktopItem {...itemProps("sticky")}>
          <StickyNote lines={t.widgets.sticky} />
        </DesktopItem>

        {/* ── windows ── */}
        {wins.map((win) => (
          <Window
            key={win.id}
            win={win}
            title={registry[win.id].title}
            focused={win.z === topZ}
            onFocus={() => windows.focus(win.id)}
            onDragStart={(e) => windows.startWindowDrag(win.id, e)}
            onResizeStart={(e) => windows.startResize(win.id, e)}
            onMinimize={() => windows.minimize(win.id)}
            onToggleMax={() => windows.toggleMax(win.id)}
            onClose={() => windows.close(win.id)}
          >
            {renderBody(win)}
          </Window>
        ))}

        {ql.isOpen ? <QuickLook t={t} ql={ql} /> : null}

        <Dock
          t={t}
          revealed={revealed}
          revealDelay={revealDelays.__dock}
          cv={cv}
          links={links}
          termOpen={termOpen}
          minimized={minimized}
          actions={actions}
        />
      </div>
    </div>
  );
}

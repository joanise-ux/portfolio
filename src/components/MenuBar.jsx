import { useEffect, useRef } from "react";

/* ── one dropdown ──────────────────────────────────────────────── */

function Menu({ id, label, openId, onHover, onClick, width, children }) {
  const isOpen = openId === id;
  return (
    <div className="menu" onMouseEnter={() => onHover(id)}>
      <span className="menu__bridge" />
      <button
        type="button"
        className={`menu__trigger${isOpen ? " is-open" : ""}`}
        onClick={(e) => onClick(id, e)}
      >
        {label}
      </button>
      {isOpen ? (
        <div className="menu__panel" style={{ minWidth: width }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MenuItem({ label, hint, onClick, href, download, external }) {
  const body = (
    <>
      <span>{label}</span>
      {hint ? <span className="menu__hint">{hint}</span> : null}
    </>
  );
  if (href) {
    return (
      <a
        className="menu__item"
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {body}
      </a>
    );
  }
  return (
    <button type="button" className="menu__item" onClick={onClick}>
      {body}
    </button>
  );
}

/* ── bar ───────────────────────────────────────────────────────── */

export default function MenuBar({
  t,
  revealed,
  revealDelay,
  lang,
  onToggleLang,
  status,
  clocks,
  years,
  email,
  links,
  cv,
  menuProjects,
  openMenu,
  setOpenMenu,
  pinned,
  setPinned,
  actions,
}) {
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  const hover = (id) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };

  const leave = () => {
    clearTimeout(closeTimer.current);
    if (pinned) return; // click-opened menus stay until dismissed
    closeTimer.current = setTimeout(() => setOpenMenu(null), 250);
  };

  const click = (id, e) => {
    e.stopPropagation();
    clearTimeout(closeTimer.current);
    if (openMenu === id && pinned) {
      setOpenMenu(null);
      setPinned(false);
    } else {
      setOpenMenu(id);
      setPinned(true);
    }
  };

  /* A press anywhere outside the nav dismisses an open menu. */
  useEffect(() => {
    if (!openMenu) return undefined;
    const onDown = (e) => {
      if (navRef.current?.contains(e.target)) return;
      clearTimeout(closeTimer.current);
      setOpenMenu(null);
      setPinned(false);
    };
    document.addEventListener("mousedown", onDown, true);
    return () => document.removeEventListener("mousedown", onDown, true);
  }, [openMenu, setOpenMenu, setPinned]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className={`menubar reveal${revealed ? " is-revealed" : ""}`}
      style={{ "--reveal-delay": `${revealDelay}ms` }}
    >
      <span className="menubar__mark">
        <span className="menubar__diamond">◆</span>
        <span className="menubar__initials">JŻ</span>
      </span>

      <nav className="menubar__nav" ref={navRef} onMouseLeave={leave}>
        <Menu id="plik" label={t.menu.file} openId={openMenu} onHover={hover} onClick={click} width={238}>
          <MenuItem label={t.menu.newProject} hint={t.dock.mail} onClick={actions.mail} />
          <MenuItem label={t.menu.downloadCv} hint={cv.size} href={cv.url} download={cv.download} />
          <span className="menu__sep" />
          <MenuItem label={t.menu.clearDesktop} hint="⌘⌫" onClick={actions.clear} />
        </Menu>

        <Menu id="proj" label={t.menu.projects} openId={openMenu} onHover={hover} onClick={click} width={252}>
          {menuProjects.map((p) => (
            <MenuItem key={p.key} label={p.slug} hint={p.meta} onClick={p.open} />
          ))}
        </Menu>

        <Menu id="about" label={t.menu.about} openId={openMenu} onHover={hover} onClick={click} width={224}>
          <MenuItem label={t.menu.bio} hint="bio.md" onClick={actions.bio} />
          <MenuItem label={t.menu.experience} hint={years} onClick={actions.exp} />
          <MenuItem label={t.menu.tools} hint={t.menu.toolsMeta} onClick={actions.tools} />
        </Menu>

        <Menu id="kont" label={t.menu.contact} openId={openMenu} onHover={hover} onClick={click} width={286}>
          <MenuItem label={t.menu.email} hint={email} onClick={actions.kontakt} />
          <MenuItem label="LinkedIn" hint={links.linkedinHandle} href={links.linkedin} external />
          <MenuItem label="GitHub" hint={links.githubHandle} href={links.github} external />
        </Menu>
      </nav>

      <span className="menubar__spacer" />

      <button type="button" className="langswitch" onClick={onToggleLang}>
        <span className={`langswitch__opt${lang === "pl" ? " is-active" : ""}`}>PL</span>
        <span className="langswitch__slash">/</span>
        <span className={`langswitch__opt${lang === "en" ? " is-active" : ""}`}>EN</span>
      </button>

      <span className="statuslamp">
        <span className="statuslamp__dot">●</span>
        <span className="statuslamp__label">{status}</span>
      </span>

      <span className="clocks">
        <span>WRO {clocks.wro}</span>
        <span className="clocks__slash">/</span>
        <span>SEL {clocks.sel}</span>
      </span>
    </div>
  );
}

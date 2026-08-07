/* @ds-bundle: {"format":4,"namespace":"NEONOSDesignSystem_004291","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"GLYPHS","sourcePath":"components/core/Glyph.jsx"},{"name":"Glyph","sourcePath":"components/core/Glyph.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatusDot","sourcePath":"components/core/StatusDot.jsx"},{"name":"DisplayHeading","sourcePath":"components/editorial/DisplayHeading.jsx"},{"name":"SectionLabel","sourcePath":"components/editorial/SectionLabel.jsx"},{"name":"DesktopIcon","sourcePath":"components/shell/DesktopIcon.jsx"},{"name":"Dock","sourcePath":"components/shell/Dock.jsx"},{"name":"MenuBar","sourcePath":"components/shell/MenuBar.jsx"},{"name":"Terminal","sourcePath":"components/terminal/Terminal.jsx"},{"name":"ProgressMeter","sourcePath":"components/window/ProgressMeter.jsx"},{"name":"Widget","sourcePath":"components/window/Widget.jsx"},{"name":"Window","sourcePath":"components/window/Window.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"866e0128f7d1","components/core/Button.jsx":"7430bf0b7c7f","components/core/Glyph.jsx":"8102c2ae3e35","components/core/IconButton.jsx":"16360eccdfb2","components/core/StatusDot.jsx":"3fa315b3d693","components/editorial/DisplayHeading.jsx":"68143d830773","components/editorial/SectionLabel.jsx":"a4f860927c4d","components/shell/DesktopIcon.jsx":"6950a3b663f4","components/shell/Dock.jsx":"a0207f49f5c0","components/shell/MenuBar.jsx":"38ffb10f6963","components/terminal/Terminal.jsx":"cc580f1d53cd","components/window/ProgressMeter.jsx":"a6b0da1404f4","components/window/Widget.jsx":"3e6214d3e0f0","components/window/Window.jsx":"262787541ddf","ui_kits/portfolio-desktop/CaseStudyWindow.jsx":"9cfe7b01cbb0","ui_kits/portfolio-desktop/Desktop.jsx":"dae143b65d2e","ui_kits/portfolio-desktop/PanelWindows.jsx":"4ab2239939a4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NEONOSDesignSystem_004291 = window.NEONOSDesignSystem_004291 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  tone = "system",
  pill = false,
  style,
  ...rest
}) {
  const tones = {
    live: {
      color: "var(--magenta)",
      border: "1px solid rgba(255,46,136,.45)",
      background: "var(--magenta-wash)"
    },
    system: {
      color: "var(--violet)",
      border: "1px solid rgba(107,77,255,.42)",
      background: "var(--violet-wash)"
    },
    identity: {
      color: "var(--gold)",
      border: "1px solid var(--gold-dim)",
      background: "var(--gold-wash)"
    },
    muted: {
      color: "var(--ivory-60)",
      border: "1px solid var(--ivory-12)",
      background: "transparent"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-xs)",
      letterSpacing: "var(--track-ui)",
      padding: "3px 9px",
      borderRadius: pill ? "var(--radius-pill)" : "var(--radius-control)",
      display: "inline-block",
      whiteSpace: "nowrap",
      ...tones[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const pads = {
    sm: "6px 12px",
    md: "9px 18px",
    lg: "12px 26px"
  };
  const sizes = {
    sm: "var(--size-ui-s)",
    md: "var(--size-ui-m)",
    lg: "var(--size-ui-l)"
  };
  const skins = {
    ghost: {
      border: "1px solid var(--ivory-12)",
      color: "var(--ivory-80)",
      background: "transparent"
    },
    focus: {
      border: "1px solid var(--magenta)",
      color: "var(--magenta)",
      background: "var(--magenta-wash)"
    },
    identity: {
      border: "1px solid var(--gold-dim)",
      color: "var(--gold)",
      background: "transparent"
    },
    system: {
      border: "1px solid var(--violet-dim)",
      color: "var(--violet)",
      background: "var(--violet-wash)"
    },
    bare: {
      border: "1px solid transparent",
      color: "var(--ivory-60)",
      background: "transparent"
    }
  };
  const hovers = {
    ghost: {
      borderColor: "var(--ivory-40)",
      color: "var(--ivory)"
    },
    focus: {
      boxShadow: "var(--glow-magenta-soft)",
      color: "var(--ivory)"
    },
    identity: {
      borderColor: "var(--gold)",
      color: "var(--ivory)"
    },
    system: {
      boxShadow: "var(--glow-violet-soft)",
      color: "var(--ivory)"
    },
    bare: {
      color: "var(--ivory)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      font: "inherit",
      fontFamily: "var(--font-mono)",
      fontSize: sizes[size],
      letterSpacing: "var(--track-ui)",
      textTransform: "lowercase",
      padding: pads[size],
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "color var(--dur-fast) var(--ease-os), border-color var(--dur-fast) var(--ease-os), box-shadow var(--dur-fast) var(--ease-os), opacity var(--dur-fast) var(--ease-os), transform var(--dur-instant) var(--ease-os)",
      opacity: disabled ? .38 : 1,
      transform: press && !disabled ? "translateY(1px)" : "none",
      ...skins[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Glyph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GLYPHS = {
  diamond: "\u25C6",
  dot: "\u25CF",
  square: "\u25A1",
  minimize: "\u2500",
  close: "\u00D7",
  caret: "\u258C",
  arrow: "\u2192",
  arrowUp: "\u2197",
  chevron: "\u203A",
  bullet: "\u00B7",
  folder: "\u25A4",
  file: "\u25A5",
  split: "\u25A7",
  panel: "\u25E7",
  panelFull: "\u25E8",
  terminal: "\u203A_",
  star: "\u2726",
  plus: "+",
  check: "\u2713",
  ellipsis: "\u2026"
};
function Glyph({
  name,
  size = 13,
  tone = "inherit",
  glow = false,
  style,
  ...rest
}) {
  const tones = {
    inherit: "inherit",
    gold: "var(--gold)",
    magenta: "var(--magenta)",
    violet: "var(--violet)",
    ivory: "var(--ivory)",
    muted: "var(--ivory-40)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: size,
      lineHeight: 1,
      color: tones[tone] || tone,
      textShadow: glow ? "0 0 8px currentColor" : "none",
      display: "inline-block",
      ...style
    }
  }), GLYPHS[name] || name);
}
Object.assign(__ds_scope, { GLYPHS, Glyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Glyph.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  active = false,
  size = 40,
  radius = "var(--radius-control)",
  onClick,
  tone = "gold",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
      borderRadius: radius,
      background: active ? "var(--magenta-wash)" : hover ? "var(--ivory-06)" : "transparent",
      border: active ? "1px solid var(--magenta)" : "1px solid var(--ivory-12)",
      boxShadow: active ? "var(--glow-magenta-soft)" : "none",
      transition: "all var(--dur-fast) var(--ease-os)",
      ...style
    }
  }, rest), typeof icon === "string" ? /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: icon,
    size: Math.round(size * .42),
    tone: active ? "magenta" : tone
  }) : icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatusDot({
  tone = "live",
  label,
  size = 6,
  pulse = true,
  style,
  ...rest
}) {
  const tones = {
    live: "var(--magenta)",
    idle: "var(--gold)",
    system: "var(--violet)",
    off: "var(--ivory-22)"
  };
  const c = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      letterSpacing: "var(--track-ui)",
      color: "var(--ivory-60)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-pill)",
      background: c,
      color: c,
      boxShadow: pulse && tone !== "off" ? "var(--glow-dot)" : "none",
      flex: "0 0 auto"
    }
  }), label);
}
Object.assign(__ds_scope, { StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/editorial/DisplayHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DisplayHeading({
  children,
  italic,
  size = "l",
  as = "h2",
  align = "left",
  style,
  ...rest
}) {
  const sizes = {
    xl: ["var(--size-display-xl)", "var(--lh-display-xl)"],
    l: ["var(--size-display-l)", "var(--lh-display-l)"],
    m: ["var(--size-display-m)", "var(--lh-display-m)"],
    s: ["var(--size-display-s)", "var(--lh-display-s)"]
  };
  const Tag = as;
  const [fs, lh] = sizes[size];
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-display)",
      fontSize: fs,
      lineHeight: lh,
      letterSpacing: "var(--track-display)",
      color: "var(--ivory)",
      margin: 0,
      textAlign: align,
      textWrap: "pretty",
      ...style
    }
  }), children, italic && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      fontWeight: "var(--weight-display-light)"
    }
  }, italic)));
}
Object.assign(__ds_scope, { DisplayHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/DisplayHeading.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionLabel({
  index,
  children,
  rule = true,
  tone = "identity",
  style,
  ...rest
}) {
  const tones = {
    identity: "var(--gold)",
    muted: "var(--ivory-40)",
    live: "var(--magenta)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-5)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      letterSpacing: "var(--track-ui-wide)",
      textTransform: "uppercase",
      color: tones[tone],
      whiteSpace: "nowrap"
    }
  }, index ? index + " \u2014 " : "", children), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--rule-identity)"
    }
  }));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/shell/DesktopIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DesktopIcon({
  icon = "folder",
  label,
  meta,
  selected = false,
  onOpen,
  onSelect,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const on = selected || hover;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onSelect,
    onDoubleClick: onOpen,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      width: 104,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--sp-2)",
      padding: "var(--sp-3) var(--sp-2)",
      background: selected ? "var(--magenta-wash)" : "transparent",
      border: "1px solid " + (selected ? "var(--magenta)" : "transparent"),
      borderRadius: "var(--radius-control)",
      cursor: "pointer",
      transition: "all var(--dur-fast) var(--ease-os)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 38,
      display: "grid",
      placeItems: "center",
      border: "1px solid " + (on ? "var(--gold)" : "var(--gold-dim)"),
      borderRadius: "2px",
      background: "var(--ink-800)",
      boxShadow: on ? "inset 0 0 22px rgba(156,131,85,.14)" : "none",
      transition: "all var(--dur-fast) var(--ease-os)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: icon,
    tone: on ? "gold" : "muted",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      letterSpacing: "var(--track-ui)",
      color: on ? "var(--ivory)" : "var(--ivory-60)",
      textAlign: "center",
      wordBreak: "break-all"
    }
  }, label), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-xs)",
      color: "var(--ivory-40)"
    }
  }, meta));
}
Object.assign(__ds_scope, { DesktopIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/DesktopIcon.jsx", error: String((e && e.message) || e) }); }

// components/shell/Dock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dock({
  items = [],
  activeId,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      padding: "var(--sp-3)",
      background: "var(--bg-dock)",
      backdropFilter: "var(--blur-dock)",
      WebkitBackdropFilter: "var(--blur-dock)",
      border: "1px solid var(--ivory-12)",
      borderRadius: "var(--radius-dock)",
      boxShadow: "var(--shadow-dock)",
      ...style
    }
  }), items.map(it => /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: it.id,
    icon: it.icon,
    label: it.label,
    active: activeId === it.id,
    size: 52,
    radius: "var(--radius-dock-icon)",
    onClick: () => onSelect && onSelect(it.id)
  })));
}
Object.assign(__ds_scope, { Dock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/Dock.jsx", error: String((e && e.message) || e) }); }

// components/shell/MenuBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MenuBar({
  items = [],
  active,
  onSelect,
  status = "available_q4",
  statusTone = "live",
  clock,
  mark = "diamond",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      height: "var(--menubar-h)",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-6)",
      padding: "0 var(--sp-6)",
      background: "var(--bg-menubar)",
      backdropFilter: "var(--blur-chrome)",
      WebkitBackdropFilter: "var(--blur-chrome)",
      borderBottom: "1px solid var(--ink-600)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-m)",
      letterSpacing: "var(--track-ui)",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: mark,
    tone: "gold",
    size: 13
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--sp-6)"
    }
  }, items.map(it => {
    const id = it.id || it.label || it;
    const label = it.label || it;
    const on = active === id || hover === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onSelect && onSelect(id),
      onMouseEnter: () => setHover(id),
      onMouseLeave: () => setHover(null),
      style: {
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        color: on ? "var(--ivory)" : "var(--ivory-60)",
        transition: "color var(--dur-fast) var(--ease-os)"
      }
    }, label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.StatusDot, {
    tone: statusTone,
    label: status
  }), clock && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ivory-60)",
      letterSpacing: "var(--track-ui)"
    }
  }, clock));
}
Object.assign(__ds_scope, { MenuBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/MenuBar.jsx", error: String((e && e.message) || e) }); }

// components/terminal/Terminal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PREFIX = {
  log: "::",
  ok: "::",
  prompt: ">>",
  err: "!!",
  bare: ""
};
function Terminal({
  lines = [],
  prompt,
  caret = true,
  typing = false,
  speed = 260,
  dense = false,
  style,
  ...rest
}) {
  const [shown, setShown] = React.useState(typing ? 0 : lines.length);
  React.useEffect(() => {
    if (!typing) {
      setShown(lines.length);
      return;
    }
    setShown(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [typing, speed, lines.length]);
  const rows = lines.slice(0, shown);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-m)",
      lineHeight: dense ? 1.65 : 1.95,
      letterSpacing: "var(--track-ui)",
      color: "var(--ivory-60)",
      ...style
    }
  }), rows.map((l, i) => {
    const kind = l.kind || "log";
    const pre = PREFIX[kind];
    const preColor = kind === "prompt" ? "var(--magenta)" : kind === "err" ? "var(--magenta)" : "var(--violet)";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: "var(--sp-2)",
        whiteSpace: "pre-wrap"
      }
    }, pre && /*#__PURE__*/React.createElement("span", {
      style: {
        color: preColor,
        flex: "0 0 auto"
      }
    }, pre), /*#__PURE__*/React.createElement("span", {
      style: {
        color: kind === "prompt" ? "var(--ivory)" : "var(--ivory-60)"
      }
    }, l.text), l.status && /*#__PURE__*/React.createElement("span", {
      style: {
        color: l.status === "ok" ? "var(--violet)" : "var(--magenta)"
      }
    }, l.status));
  }), prompt !== undefined && shown >= lines.length && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--magenta)"
    }
  }, ">>"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ivory)"
    }
  }, prompt), caret && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 15,
      background: "var(--caret)",
      display: "inline-block",
      animation: "neon-caret var(--caret-blink) steps(1,end) infinite",
      marginTop: 2
    }
  })));
}
Object.assign(__ds_scope, { Terminal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/terminal/Terminal.jsx", error: String((e && e.message) || e) }); }

// components/window/ProgressMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressMeter({
  label,
  value = 0,
  tone = "system",
  rule = true,
  style,
  ...rest
}) {
  const tones = {
    system: "var(--violet)",
    live: "var(--magenta)",
    identity: "var(--gold)"
  };
  const v = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      ...style
    }
  }), rule && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--gold-dim)",
      opacity: .7,
      marginBottom: "var(--sp-4)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--sp-4)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-m)",
      letterSpacing: "var(--track-ui)",
      marginBottom: "var(--sp-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ivory-60)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: tones[tone]
    }
  }, v, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "var(--meter-track)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: v + "%",
      height: "100%",
      background: tones[tone],
      boxShadow: "0 0 12px " + tones[tone],
      transition: "width var(--dur-slow) var(--ease-os)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/window/ProgressMeter.jsx", error: String((e && e.message) || e) }); }

// components/window/Widget.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Widget({
  title,
  action,
  children,
  tone = "panel",
  onAction,
  style,
  bodyStyle,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    panel: "var(--bg-panel)",
    sunken: "var(--bg-sunken)",
    raised: "var(--bg-raised)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: tones[tone],
      border: "1px solid " + (hover ? "var(--ink-500)" : "var(--ink-600)"),
      borderRadius: "var(--radius-panel)",
      padding: "var(--panel-pad)",
      transition: "border-color var(--dur-fast) var(--ease-os)",
      ...style
    }
  }), (title || action) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      marginBottom: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-m)",
      letterSpacing: "var(--track-ui)",
      color: "var(--gold)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), (action || onAction) && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: hover ? "var(--magenta)" : "var(--ivory-40)",
      transition: "color var(--dur-fast) var(--ease-os)"
    }
  }, action || /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: "arrow",
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: bodyStyle
  }, children));
}
Object.assign(__ds_scope, { Widget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/window/Widget.jsx", error: String((e && e.message) || e) }); }

// components/window/Window.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Window({
  title,
  children,
  footer,
  focused = false,
  draggable = true,
  x = 0,
  y = 0,
  width,
  height,
  controls = true,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  bodyStyle,
  style,
  ...rest
}) {
  const [pos, setPos] = React.useState({
    x,
    y
  });
  const drag = React.useRef(null);
  React.useEffect(() => {
    setPos({
      x,
      y
    });
  }, [x, y]);
  const down = e => {
    if (!draggable) return;
    onFocus && onFocus();
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: pos.x,
      oy: pos.y
    };
    const move = ev => {
      if (!drag.current) return;
      setPos({
        x: drag.current.ox + ev.clientX - drag.current.sx,
        y: drag.current.oy + ev.clientY - drag.current.sy
      });
    };
    const up = () => {
      drag.current = null;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const positioned = draggable;
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    onMouseDown: onFocus,
    style: {
      position: positioned ? "absolute" : "relative",
      left: positioned ? pos.x : undefined,
      top: positioned ? pos.y : undefined,
      width,
      height,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-panel)",
      border: "1px solid " + (focused ? "var(--magenta)" : "var(--ink-600)"),
      borderRadius: "var(--radius-window)",
      boxShadow: focused ? "var(--shadow-window), var(--glow-focus)" : "var(--shadow-window)",
      animation: "neon-window-in var(--dur-base) var(--ease-os) both",
      overflow: "hidden",
      ...style
    }
  }), /*#__PURE__*/React.createElement("header", {
    onMouseDown: down,
    style: {
      height: "var(--titlebar-h)",
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-3)",
      padding: "0 var(--sp-4)",
      borderBottom: "1px solid " + (focused ? "rgba(255,46,136,.35)" : "var(--ink-600)"),
      background: focused ? "rgba(255,46,136,.05)" : "transparent",
      cursor: draggable ? "grab" : "default",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-m)",
      letterSpacing: "var(--track-ui)",
      color: focused ? "var(--ivory)" : "var(--ivory-40)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), controls && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      color: "var(--ivory-40)"
    }
  }, /*#__PURE__*/React.createElement(WinCtl, {
    glyph: "minimize",
    onClick: onMinimize
  }), /*#__PURE__*/React.createElement(WinCtl, {
    glyph: "square",
    onClick: onMaximize
  }), /*#__PURE__*/React.createElement(WinCtl, {
    glyph: "close",
    onClick: onClose
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "auto",
      padding: "var(--window-pad)",
      ...bodyStyle
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: "0 0 auto",
      borderTop: "1px solid var(--ink-600)",
      padding: "10px var(--window-pad)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      color: "var(--ivory-40)",
      letterSpacing: "var(--track-ui)",
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)"
    }
  }, footer));
}
function WinCtl({
  glyph,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      lineHeight: 1,
      color: h ? "var(--magenta)" : "var(--ivory-40)",
      transition: "color var(--dur-fast) var(--ease-os)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: glyph,
    size: 12
  }));
}
Object.assign(__ds_scope, { Window });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/window/Window.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-desktop/CaseStudyWindow.jsx
try { (() => {
const {
  Window: OSWindow,
  DisplayHeading,
  SectionLabel,
  ProgressMeter,
  Badge,
  Button
} = window.NEONOSDesignSystem_004291;
const CASES = {
  suoh: {
    title: "case_study — suoh",
    label: "01",
    kicker: "e-commerce / identyfikacja",
    head: "Art you can",
    italic: "carry.",
    body: "Sklep dla jednoosobowej pracowni rękodzieła z Wrocławia. Ciemna, editorialowa oprawa dla produktu, który jest za każdym razem inny — katalog, lookbook i koszyk trzymane w jednym rytmie typograficznym.",
    shot: "../../assets/work/suoh-hero.png",
    shot2: "../../assets/work/suoh-about.png",
    meta: [["rola", "projekt + front"], ["rok", "2026"], ["zakres", "shop · lookbook · about"]],
    progress: 100,
    progressLabel: "shipped"
  },
  logtxt: {
    title: "case_study — log.txt",
    label: "02",
    kicker: "narzędzie / dashboard",
    head: "Dziennik",
    italic: "w terminalu",
    body: "Osobisty dziennik pisany tak, jak pisze się kod: wpisy, nastrój, zadania i notatki głosowe w jednym pulpicie. Cała nawigacja jest ścieżką pliku, cały stan jest komendą.",
    shot: "../../assets/work/logtxt-dashboard.png",
    meta: [["rola", "produkt + UI"], ["rok", "2026"], ["zakres", "dashboard · entries · mood"]],
    progress: 72,
    progressLabel: "render_progress"
  },
  solna: {
    title: "case_study — kwartał solna",
    label: "03",
    kicker: "identyfikacja / wayfinding",
    head: "Kwartał",
    italic: "Solna",
    body: "Identyfikacja i system nawigacji dla kwartału mieszkaniowego. Treść zostaje w kości słoniowej — neon oświetla tylko interfejs wokół niej.",
    shot: null,
    meta: [["rola", "identyfikacja"], ["rok", "2025"], ["zakres", "znak · tablice · siatka"]],
    progress: 72,
    progressLabel: "render_progress"
  }
};
function CaseStudyWindow({
  id,
  focused,
  onFocus,
  onClose,
  x,
  y,
  width = 640
}) {
  const c = CASES[id];
  return /*#__PURE__*/React.createElement(OSWindow, {
    title: c.title,
    focused: focused,
    onFocus: onFocus,
    onClose: onClose,
    x: x,
    y: y,
    width: width,
    height: 520,
    bodyStyle: {
      padding: 0
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, c.progressLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        color: "var(--violet)"
      }
    }, c.progress, "%"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--window-pad)"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: c.label
  }, c.kicker), /*#__PURE__*/React.createElement(DisplayHeading, {
    size: "m",
    italic: c.italic,
    style: {
      margin: "22px 0 16px"
    }
  }, c.head), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-body-m)",
      lineHeight: "var(--lh-body-m)",
      color: "var(--ivory-80)",
      maxWidth: "52ch",
      margin: "0 0 22px",
      textWrap: "pretty"
    }
  }, c.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      marginBottom: "var(--sp-6)",
      flexWrap: "wrap"
    }
  }, c.meta.map(([k, v]) => /*#__PURE__*/React.createElement(Badge, {
    key: k,
    tone: "muted"
  }, k, ": ", v)))), c.shot ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 1,
      background: "var(--ink-600)",
      borderTop: "1px solid var(--ink-600)",
      borderBottom: "1px solid var(--ink-600)",
      gridTemplateColumns: c.shot2 ? "1fr 1fr" : "1fr"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.shot,
    alt: "",
    style: {
      width: "100%",
      display: "block",
      background: "var(--ink-900)"
    }
  }), c.shot2 && /*#__PURE__*/React.createElement("img", {
    src: c.shot2,
    alt: "",
    style: {
      width: "100%",
      display: "block",
      background: "var(--ink-900)"
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 var(--window-pad)",
      height: 150,
      border: "1px dashed var(--ink-500)",
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      letterSpacing: "var(--track-ui)",
      color: "var(--ivory-40)"
    }
  }, "// brak materia\u0142u w \u017Ar\xF3dle \u2014 miejsce na zdj\u0119cia"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--window-pad)"
    }
  }, /*#__PURE__*/React.createElement(ProgressMeter, {
    label: c.progressLabel,
    value: c.progress
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      marginTop: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "focus"
  }, "otw\xF3rz pe\u0142ne case study"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "nast\u0119pny projekt"))));
}
Object.assign(window, {
  CaseStudyWindow,
  CASES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-desktop/CaseStudyWindow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-desktop/Desktop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  MenuBar,
  Dock,
  DesktopIcon,
  Terminal
} = window.NEONOSDesignSystem_004291;
const ICONS = [{
  id: "suoh",
  label: "suoh/",
  meta: "8 plików"
}, {
  id: "logtxt",
  label: "log_txt/",
  meta: "4 pliki"
}, {
  id: "solna",
  label: "kwartal_solna/",
  meta: "12 plików"
}, {
  id: "about",
  label: "about.md",
  meta: "",
  icon: "file"
}];
const SPAWN = {
  suoh: {
    x: 300,
    y: 88
  },
  logtxt: {
    x: 340,
    y: 118
  },
  solna: {
    x: 320,
    y: 100
  },
  about: {
    x: 150,
    y: 300
  },
  terminal: {
    x: 980,
    y: 96
  },
  projekty: {
    x: 190,
    y: 150
  },
  status: {
    x: 980,
    y: 380
  }
};
function useClock() {
  const [t, setT] = React.useState(() => new Date());
  React.useEffect(() => {
    const i = setInterval(() => setT(new Date()), 15000);
    return () => clearInterval(i);
  }, []);
  return String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0");
}
function Desktop() {
  const [booted, setBooted] = React.useState(false);
  const [open, setOpen] = React.useState(["terminal", "solna"]);
  const [focus, setFocus] = React.useState("solna");
  const [sel, setSel] = React.useState(null);
  const [dock, setDock] = React.useState("solna");
  const clock = useClock();
  React.useEffect(() => {
    const t = setTimeout(() => setBooted(true), 2100);
    return () => clearTimeout(t);
  }, []);
  const openWin = id => {
    setOpen(o => o.includes(id) ? o : [...o, id]);
    setFocus(id);
    setDock(id);
  };
  const close = id => setOpen(o => o.filter(w => w !== id));
  const z = id => ({
    zIndex: 10 + open.indexOf(id) + (focus === id ? 50 : 0)
  });
  if (!booted) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "var(--void)",
        backgroundImage: "var(--bloom-desktop)",
        display: "grid",
        placeItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 420
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-ui-s)",
        letterSpacing: "var(--track-ui-wide)",
        color: "var(--gold)",
        marginBottom: "var(--sp-6)"
      }
    }, "NEON OS"), /*#__PURE__*/React.createElement(Terminal, {
      lines: BOOT,
      prompt: "ready",
      typing: true,
      speed: 420
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "var(--void)",
      backgroundImage: "var(--bloom-desktop)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--scanline)",
      pointerEvents: "none",
      opacity: .8
    }
  }), /*#__PURE__*/React.createElement(MenuBar, {
    items: ["plik", "widok", "projekt"],
    active: "projekt",
    status: "available_q4",
    clock: clock,
    style: {
      position: "relative",
      zIndex: 400
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(var(--menubar-h) + var(--gutter-desktop))",
      left: "var(--gutter-desktop)",
      display: "grid",
      gap: "var(--sp-2)",
      zIndex: 1
    }
  }, ICONS.map(i => /*#__PURE__*/React.createElement(DesktopIcon, {
    key: i.id,
    icon: i.icon || "folder",
    label: i.label,
    meta: i.meta,
    selected: sel === i.id,
    onSelect: () => setSel(i.id),
    onOpen: () => openWin(i.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "var(--menubar-h) 0 0 0"
    }
  }, open.includes("terminal") && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...z("terminal")
    }
  }, /*#__PURE__*/React.createElement(TerminalWindow, _extends({
    focused: focus === "terminal",
    onFocus: () => setFocus("terminal"),
    onClose: () => close("terminal")
  }, SPAWN.terminal))), open.includes("about") && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...z("about")
    }
  }, /*#__PURE__*/React.createElement(AboutWindow, _extends({
    focused: focus === "about",
    onFocus: () => setFocus("about"),
    onClose: () => close("about")
  }, SPAWN.about))), open.includes("projekty") && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...z("projekty")
    }
  }, /*#__PURE__*/React.createElement(ProjectsWindow, _extends({
    focused: focus === "projekty",
    onFocus: () => setFocus("projekty"),
    onClose: () => close("projekty"),
    onOpen: openWin
  }, SPAWN.projekty))), open.includes("status") && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...z("status")
    }
  }, /*#__PURE__*/React.createElement(StatsWindow, _extends({
    focused: focus === "status",
    onFocus: () => setFocus("status"),
    onClose: () => close("status")
  }, SPAWN.status))), ["suoh", "logtxt", "solna"].filter(id => open.includes(id)).map(id => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      position: "absolute",
      ...z(id)
    }
  }, /*#__PURE__*/React.createElement(CaseStudyWindow, _extends({
    id: id,
    focused: focus === id,
    onFocus: () => setFocus(id),
    onClose: () => close(id)
  }, SPAWN[id]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 26,
      transform: "translateX(-50%)",
      zIndex: 500
    }
  }, /*#__PURE__*/React.createElement(Dock, {
    activeId: dock,
    onSelect: id => openWin(id),
    items: [{
      id: "projekty",
      icon: "folder",
      label: "projekty"
    }, {
      id: "solna",
      icon: "file",
      label: "case study"
    }, {
      id: "terminal",
      icon: "terminal",
      label: "terminal"
    }, {
      id: "status",
      icon: "panel",
      label: "status"
    }, {
      id: "about",
      icon: "star",
      label: "about"
    }]
  })));
}
Object.assign(window, {
  Desktop
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-desktop/Desktop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-desktop/PanelWindows.jsx
try { (() => {
const {
  Window: OSWindow,
  Terminal,
  Widget,
  Badge,
  Button,
  DisplayHeading,
  SectionLabel,
  StatusDot,
  Glyph
} = window.NEONOSDesignSystem_004291;
const BOOT = [{
  text: "mount /portfolio …",
  status: "ok"
}, {
  text: "load typefaces …",
  status: "ok"
}, {
  text: "index 24 projects"
}, {
  text: "auth designer=joanna",
  status: "ok"
}];
function TerminalWindow({
  focused,
  onFocus,
  onClose,
  x,
  y
}) {
  return /*#__PURE__*/React.createElement(OSWindow, {
    title: "terminal \u2014 boot.log",
    focused: focused,
    onFocus: onFocus,
    onClose: onClose,
    x: x,
    y: y,
    width: 370,
    height: 250
  }, /*#__PURE__*/React.createElement(Terminal, {
    lines: BOOT,
    prompt: "ready",
    typing: true,
    speed: 380
  }));
}
function AboutWindow({
  focused,
  onFocus,
  onClose,
  x,
  y
}) {
  return /*#__PURE__*/React.createElement(OSWindow, {
    title: "about \u2014 joanna_zuczkowska",
    focused: focused,
    onFocus: onFocus,
    onClose: onClose,
    x: x,
    y: y,
    width: 430,
    height: 330,
    footer: /*#__PURE__*/React.createElement(StatusDot, {
      tone: "live",
      label: "available_q4"
    })
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    index: "00"
  }, "kto"), /*#__PURE__*/React.createElement(DisplayHeading, {
    size: "s",
    italic: "\u017Buczkowska",
    style: {
      margin: "18px 0 14px"
    }
  }, "Joanna"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--size-body-s)",
      lineHeight: "var(--lh-body-s)",
      color: "var(--ivory-80)",
      margin: "0 0 18px",
      textWrap: "pretty"
    }
  }, "Projektantka produktowa i UX. Buduj\u0119 interfejsy, kt\xF3re zachowuj\u0105 si\u0119 jak narz\u0119dzia \u2014 precyzyjne, ciemne, bez ozd\xF3b."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-2)",
      flexWrap: "wrap"
    }
  }, ["produkt", "ux", "design systems", "front-end"].map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "identity"
  }, t))));
}
const FILES = [{
  name: "suoh/",
  id: "suoh",
  meta: "8 plików",
  tag: "shipped",
  tone: "system"
}, {
  name: "log_txt/",
  id: "logtxt",
  meta: "4 pliki",
  tag: "in_progress",
  tone: "live"
}, {
  name: "kwartal_solna/",
  id: "solna",
  meta: "12 plików",
  tag: "in_progress",
  tone: "live"
}, {
  name: "archiwum_2024/",
  id: null,
  meta: "31 plików",
  tag: "archiwum",
  tone: "muted"
}];
function ProjectsWindow({
  focused,
  onFocus,
  onClose,
  onOpen,
  x,
  y
}) {
  const [sel, setSel] = React.useState("suoh");
  return /*#__PURE__*/React.createElement(OSWindow, {
    title: "projekty/ \u2014 24 pozycje",
    focused: focused,
    onFocus: onFocus,
    onClose: onClose,
    x: x,
    y: y,
    width: 430,
    height: 330,
    bodyStyle: {
      padding: 0
    },
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, FILES.length, " folder\xF3w"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto"
      }
    }, "sortuj: rok \u2193"))
  }, FILES.map(f => {
    const on = sel === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.name,
      type: "button",
      onClick: () => setSel(f.id),
      onDoubleClick: () => f.id && onOpen(f.id),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "var(--sp-3)",
        padding: "13px var(--window-pad)",
        background: on ? "var(--magenta-wash)" : "transparent",
        border: "none",
        borderBottom: "1px solid var(--ink-600)",
        borderLeft: "2px solid " + (on ? "var(--magenta)" : "transparent"),
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-ui-m)",
        letterSpacing: "var(--track-ui)",
        color: on ? "var(--ivory)" : "var(--ivory-60)",
        textAlign: "left",
        transition: "all var(--dur-fast) var(--ease-os)"
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      name: "folder",
      tone: on ? "magenta" : "gold",
      size: 13
    }), /*#__PURE__*/React.createElement("span", null, f.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ivory-40)",
        fontSize: "var(--size-ui-s)"
      }
    }, f.meta), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: f.tone
    }, f.tag)));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--window-pad)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => sel && onOpen(sel)
  }, "otw\xF3rz zaznaczony")));
}
function StatsWindow({
  focused,
  onFocus,
  onClose,
  x,
  y
}) {
  return /*#__PURE__*/React.createElement(OSWindow, {
    title: "widget \u2014 status",
    focused: focused,
    onFocus: onFocus,
    onClose: onClose,
    x: x,
    y: y,
    width: 330,
    height: 260,
    bodyStyle: {
      padding: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement(Widget, {
    title: "projekty/",
    onAction: () => {}
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 26,
      color: "var(--ivory)"
    }
  }, "24"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      color: "var(--ivory-40)"
    }
  }, "zaindeksowane"))), /*#__PURE__*/React.createElement(Widget, {
    title: "odpowied\u017A",
    onAction: () => {}
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 26,
      color: "var(--ivory)"
    }
  }, "<24h"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-ui-s)",
      color: "var(--ivory-40)"
    }
  }, "// pisz \u015Bmia\u0142o")))));
}
Object.assign(window, {
  TerminalWindow,
  AboutWindow,
  ProjectsWindow,
  StatsWindow,
  BOOT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-desktop/PanelWindows.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.Glyph = __ds_scope.Glyph;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.DisplayHeading = __ds_scope.DisplayHeading;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.DesktopIcon = __ds_scope.DesktopIcon;

__ds_ns.Dock = __ds_scope.Dock;

__ds_ns.MenuBar = __ds_scope.MenuBar;

__ds_ns.Terminal = __ds_scope.Terminal;

__ds_ns.ProgressMeter = __ds_scope.ProgressMeter;

__ds_ns.Widget = __ds_scope.Widget;

__ds_ns.Window = __ds_scope.Window;

})();

import ProgressMeter from "./ProgressMeter.jsx";
import SectionLabel from "./SectionLabel.jsx";

/* Small always-on panels pinned to the right of the desktop. */

export function BuildingWidget({ label, name, meta, log, percent }) {
  return (
    <div className="widget">
      <SectionLabel>{label}</SectionLabel>
      <div className="widget__title">{name}</div>
      <div className="widget__meta">{meta}</div>
      <ProgressMeter percent={percent} />
      <div className="widget__meta" style={{ marginTop: 10 }}>
        {log}
      </div>
    </div>
  );
}

export function LearningWidget({ label, subject, percent, day }) {
  return (
    <div className="widget">
      <SectionLabel>{label}</SectionLabel>
      <div className="widget__row">
        <span className="widget__big">{subject}</span>
        <span className="widget__pct">{percent}%</span>
      </div>
      <ProgressMeter percent={percent} />
      <div className="widget__meta" style={{ marginTop: 10 }}>
        {day}
      </div>
    </div>
  );
}

export function StickyNote({ lines }) {
  return (
    <div className="sticky">
      <div className="sticky__line">
        {lines[0]}
        <br />
        {lines[1]}
      </div>
      <div className="sticky__rule" />
      <div className="sticky__line sticky__line--dim">
        {lines[2]}
        <br />
        {lines[3]}
      </div>
    </div>
  );
}

export function Polaroid({ src, caption }) {
  return (
    <div className="polaroid">
      <img
        className="polaroid__img"
        src={src}
        alt={caption}
        width="190"
        height="196"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div className="polaroid__caption">
        <span>{caption}</span>
      </div>
    </div>
  );
}

import SectionLabel from "../SectionLabel.jsx";

/* bio.md, doswiadczenie.md, kontakt.txt, cv, README.txt, kosz —
   a section is either a paragraph or a key/value table. */
export default function DocWindow({ sections }) {
  return (
    <div className="doc">
      {sections.map((sec, i) => (
        <div className="doc__section" key={sec.label || i}>
          <SectionLabel>{sec.label}</SectionLabel>
          {sec.text ? <p className="doc__text">{sec.text}</p> : null}
          {sec.rows?.length ? (
            <div className="doc__rows">
              {sec.rows.map((r) => (
                <div className="doc__row" key={r.k}>
                  <span className="doc__k">{r.k}</span>
                  <span className="doc__v">{r.v}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

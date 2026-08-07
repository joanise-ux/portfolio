/* Gold uppercase label + a rule that fades to nothing.
   The identity mark of the system — used above every content section. */
export default function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="section-label__text">{children}</span>
      <span className="section-label__rule" />
    </div>
  );
}

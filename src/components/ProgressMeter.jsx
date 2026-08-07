/* Violet meter on a sunken track. Glow sits on the fill, never behind text. */
export default function ProgressMeter({ percent }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="meter">
      <div className="meter__fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export default function QuickLook({ t, ql }) {
  const { shots, index, dragY, isDragging, hint, close, step, onPointerDown, onPointerMove, onPointerUp } =
    ql;

  const shot = shots[index];

  return (
    <div className="ql" onClick={close}>
      <div
        className={`ql__frame${isDragging ? "" : " is-settling"}`}
        style={{
          backgroundImage: shot ? `url(${shot.src})` : undefined,
          transform: `translateY(${dragY}px)`,
          // swipe-to-dismiss fades the sheet as it travels
          opacity: dragY > 0 ? Math.max(0.25, 1 - dragY / 320) : 1,
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      <div className="ql__caption">
        <div className="ql__name">{shot?.file}</div>
        <div className="ql__count">
          {index + 1} / {shots.length}
        </div>
      </div>

      {index > 0 ? (
        <div
          className="ql__edge ql__edge--left"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
        >
          <span className="ql__orb">‹</span>
        </div>
      ) : null}

      {index < shots.length - 1 ? (
        <div
          className="ql__edge ql__edge--right"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
        >
          <span className="ql__orb">›</span>
        </div>
      ) : null}

      <button type="button" className="ql__orb ql__close" aria-label={t.ql.close} onClick={close}>
        ×
      </button>

      {hint ? <div className={`ql__hint${hint === 2 ? " is-fading" : ""}`}>{t.ql.hint}</div> : null}
    </div>
  );
}

/* A loose image file on the desktop: the thumbnail *is* the icon.

   `w`/`h` are the authored on-screen size — the WebP behind `thumb` is
   cut to exactly twice that, so the browser never scales a full-size
   export down to a stamp. The full crop is fetched only when Quick Look
   opens. */
export default function PhotoFile({ name, thumb, w, h }) {
  return (
    <div className="photo">
      <div className="photo__frame" style={{ width: w, height: h }}>
        <img
          className="photo__img"
          src={thumb}
          alt={name}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </div>
      <div className="photo__name">{name}</div>
    </div>
  );
}

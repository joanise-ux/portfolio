"""Cut the loose desktop image files out of the project exports.

For every entry two WebPs land in public/assets/desk/:

  <slug>.webp        the full crop (max 1600px wide) — Quick Look only
  <slug>-thumb.webp  exactly 2x the box it renders in on the desktop

The desktop never touches the first one. Keep the display sizes here in
step with DESK_IMAGES in src/content/data.js, otherwise the thumbnails
stop matching their boxes.

    python scripts/desk-assets.py
"""
import os
from PIL import Image, ImageFile

# the SUOH exports are partial files — read what is there rather than fail
ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "assets")
OUT = os.path.join(ROOT, "desk")

SOURCES = {
    "about": "suoh-about.png",
    "log": "logtxt-dashboard.png",
}

# slug, source, crop box, displayed size on the desktop
ITEMS = [
    ("suoh_detail_04", "about", (252, 272, 850, 530), (176, 76)),
    ("suoh_studio_02", "about", (594, 272, 850, 530), (132, 136)),
    ("logtxt_dash_v3", "log", (0, 0, 1794, 883), (172, 85)),
    ("logtxt_cards", "log", (620, 222, 1140, 470), (152, 72)),
    ("nav_dark", "log", (0, 0, 220, 520), (72, 147)),
    ("logtxt_activity", "log", (620, 480, 1400, 790), (168, 67)),
    # polaroids — the paper holds a 190x196 window
    ("about_me", "about", (252, 272, 510, 530), (190, 196)),
    ("logtxt_polaroid", "log", (620, 60, 1140, 580), (190, 196)),
]

FULL_MAX = 1600


def main():
    os.makedirs(OUT, exist_ok=True)
    src = {}
    for key, name in SOURCES.items():
        im = Image.open(os.path.join(ROOT, name))
        im.load()
        src[key] = im

    for slug, source, box, (dw, dh) in ITEMS:
        crop = src[source].crop(box).convert("RGB")

        full = crop
        if full.width > FULL_MAX:
            full = full.resize((FULL_MAX, round(full.height * FULL_MAX / full.width)), Image.LANCZOS)
        full.save(os.path.join(OUT, f"{slug}.webp"), "WEBP", quality=80, method=6)

        # cover-crop to 2x the box, so the browser has no scaling left to do
        tw, th = dw * 2, dh * 2
        k = max(tw / crop.width, th / crop.height)
        resample = Image.LANCZOS if k < 1 else Image.BICUBIC
        fit = crop.resize((max(1, round(crop.width * k)), max(1, round(crop.height * k))), resample)
        left = (fit.width - tw) // 2
        top = (fit.height - th) // 2
        fit.crop((left, top, left + tw, top + th)).save(
            os.path.join(OUT, f"{slug}-thumb.webp"), "WEBP", quality=78, method=6
        )
        print(f"{slug}: {dw}x{dh} @2x")


if __name__ == "__main__":
    main()

/* ProjectList — the home page as a plain list, the other half of the
   orbit / list switch (design/v2/Lista projektów.dc.html).

   It reads in full with no motion at all: the thumbnail that slides out
   next to a hovered or focused name is only an extra, and on a narrow
   screen it is simply always there. */

import { cardStyle, cardSpot } from "./tiles.js";

export class ProjectList {
  /* `shotOf(project)` is the card that stands for a project on the wall. */
  constructor({ root, projects, shotOf, onOpen }) {
    this.root = root;
    root.inert = true;
    root.innerHTML = `<ol>${projects
      .map(
        (p, i) => `<li>
          <a class="list__row" href="#" data-key="${p.key}">
            <span class="list__num">0${i + 1}</span>
            <span class="list__main">
              <span class="list__name">${p.name}</span>
              <span class="list__slide"><span class="list__thumb" ${cardStyle(shotOf(p))}>${cardSpot(shotOf(p))}</span></span>
            </span>
            <span class="list__meta"><span>${p.cat}</span><span class="list__year">${p.year}</span></span>
          </a>
        </li>`
      )
      .join("")}</ol>`;

    root.addEventListener("click", (e) => {
      const row = e.target.closest(".list__row");
      if (!row) return;
      e.preventDefault();
      this.last = row;
      onOpen(projects.find((p) => p.key === row.dataset.key));
    });
  }

  show() {
    this.root.classList.add("is-open");
    this.root.inert = false;
  }

  hide() {
    this.root.classList.remove("is-open");
    this.root.inert = true;
    this.last = null;
  }

  /* Back from a case study: the keyboard lands on the row it left. */
  refocus() {
    if (this.last) this.last.focus({ preventScroll: true });
  }
}

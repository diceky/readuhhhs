import { useEffect, useRef } from "react";
import { useLang } from "../i18n";
import Reveal from "./Reveal";

export default function Papers() {
  const { t } = useLang();
  const rowRef = useRef(null);

  // Drag-to-scroll for the mouse; touch already scrolls natively.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let target = 0;
    let raf = null;

    const onPointerDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startScroll = row.scrollLeft;
      row.classList.add("is-dragging");
      // Snap-fighting programmatic scrollLeft is the main source of jank.
      row.style.scrollSnapType = "none";
      if (row.setPointerCapture) row.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      target = startScroll - (e.clientX - startX);
      if (raf == null) {
        raf = requestAnimationFrame(() => {
          raf = null;
          row.scrollLeft = target;
        });
      }
    };

    const endDrag = () => {
      dragging = false;
      if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      row.classList.remove("is-dragging");
      row.style.scrollSnapType = "";
    };

    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", endDrag);
    row.addEventListener("pointercancel", endDrag);
    return () => {
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", endDrag);
      row.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <section className="papers" id="papers">
      <div className="papers-head">
        <Reveal as="h2" className="papers-heading">
          {t.papers.heading}
        </Reveal>
        <p className="papers-hint">{t.papers.hint}</p>
      </div>
      <div ref={rowRef} className="papers-row">
        {t.papers.items.map((item, i) => (
          <div
            key={i}
            className={`papers-card cat-${i + 1}`}
          >
            <p className="papers-meta">
              <span className="papers-index">{item.index}</span>
              <span className="papers-category">{item.category}</span>
            </p>
            <h3 className="papers-title">{item.title}</h3>
            <a
              className="papers-source is-link"
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              link
              <svg
                className="papers-source-arrow"
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M4.5 2.5h5v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
      <Reveal className="papers-footnote" delay={100}>
        {t.papers.footnote}
      </Reveal>
    </section>
  );
}

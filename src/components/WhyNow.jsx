import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";
import Reveal from "./Reveal";
import whynowDeco from "../assets/whynow-deco.svg";

// ~15ms per character, so the full heading types in in roughly a second.
const TYPE_MS = 50;

export default function WhyNow() {
  const { t } = useLang();
  const lines = t.whyNow.heading;
  const total = lines.reduce((n, l) => n + l.length, 0);
  const [typed, setTyped] = useState(0);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !el || !("IntersectionObserver" in window)) {
      setTyped(total);
      return;
    }

    let timer = null;
    let progress = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          progress += 1;
          if (progress >= total) {
            clearInterval(timer);
            timer = null;
          }
          setTyped(Math.min(progress, total));
        }, TYPE_MS);
      },
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [total]);

  // Distribute the typed character budget across the lines, left to right.
  let remaining = typed;
  const shown = lines.map((line) => {
    const take = Math.max(0, Math.min(line.length, remaining));
    remaining -= take;
    return line.slice(0, take);
  });

  return (
    <section className="whynow">
      <div className="whynow-grid">
        <Reveal className="whynow-left">
          <p className="section-label">{t.whyNow.label}</p>
          <h2
            className="whynow-heading"
            ref={headingRef}
            aria-label={lines.filter(Boolean).join(" ")}
          >
            {shown.map((line, i) => (
              <span
                className="whynow-heading-line"
                key={i}
                aria-hidden="true"
              >
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal className="whynow-right" delay={120}>
          {t.whyNow.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="whynow-claim">{t.whyNow.claim}</p>
        </Reveal>
      </div>
      <img className="whynow-deco" src={whynowDeco} alt="" aria-hidden="true" />
    </section>
  );
}

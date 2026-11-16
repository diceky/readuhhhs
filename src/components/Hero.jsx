import { useEffect, useRef } from "react";
import { useLang } from "../i18n";
import Nav from "./Nav";
import Reveal from "./Reveal";
import heroBook from "../assets/hero-book.svg";

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const sunRef = useRef(null);

  // The sun rotates around its own center to keep facing the cursor.
  useEffect(() => {
    const section = sectionRef.current;
    const sun = sunRef.current;
    if (!section || !sun) return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let raf = null;
    let angle = 0; // cumulative degrees, so transitions never take the long way
    const apply = () => {
      section.style.setProperty("--sun-angle", `${angle.toFixed(2)}deg`);
    };

    const onMove = (e) => {
      const rect = sun.getBoundingClientRect();
      const target =
        (Math.atan2(
          e.clientY - (rect.top + rect.height / 2),
          e.clientX - (rect.left + rect.width / 2)
        ) *
          180) /
        Math.PI;
      angle += ((target - angle + 540) % 360) - 180;
      if (raf == null) {
        raf = requestAnimationFrame(() => {
          raf = null;
          apply();
        });
      }
    };

    const onLeave = () => {
      if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      angle = ((angle % 360) + 360) % 360;
      if (angle > 180) angle -= 360;
      apply();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);
  const accent = t.hero.highlight;
  const renderLine = (line) =>
    accent && line.includes(accent)
      ? line.split(accent).flatMap((part, i) =>
          i === 0 ? [part] : [<span key={i} className="hero-title-accent">{accent}</span>, part]
        )
      : line;

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <Nav />
      <div className="hero-inner">
        <Reveal as="p" className="hero-eyebrow" immediate>
          {t.hero.eyebrow}
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={100} immediate>
          {t.hero.title.map((line, i) => (
            <span className="hero-title-line" key={i}>
              {renderLine(line)}
            </span>
          ))}
        </Reveal>
        <Reveal delay={220} immediate>
          <a className="pill pill-cream hero-cta" href={t.hero.ctaHref}>
            {t.hero.cta}
          </a>
        </Reveal>
      </div>
      <div className="hero-book-wrap" aria-hidden="true">
        <div className="hero-book-stage">
          <span className="hero-sun" ref={sunRef} />
          <img className="hero-book" src={heroBook} alt="" />
        </div>
      </div>
    </section>
  );
}

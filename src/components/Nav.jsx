import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import logoMark from "../assets/logo-mark-combined.svg";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = (
    <>
      <a href="#readtalk" onClick={() => setOpen(false)}>
        {t.nav.howItWorks}
      </a>
      <a href="#rules" onClick={() => setOpen(false)}>
        {t.nav.houseRules}
      </a>
      <a href="#papers" onClick={() => setOpen(false)}>
        {t.nav.materials}
      </a>
    </>
  );

  const langToggle = (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === "ja" ? "active" : ""}
        aria-pressed={lang === "ja"}
        onClick={() => setLang("ja")}
      >
        JP
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );

  return (
    <header className={`hero-nav${open ? " is-open" : ""}`}>
      <a className="brand" href="#top" aria-label={t.nav.brand}>
        <span className="brand-logo">
          <img src={logoMark} alt="" />
        </span>
        <span className="brand-name">{t.nav.brand}</span>
      </a>

      {/* <nav className="nav-links" aria-label="Sections">
        {links}
      </nav> */}

      <div className="nav-right">
        {langToggle}
        <a className="pill pill-peach nav-cta" href={t.nav.ctaHref}>
          {t.nav.cta}
        </a>
      </div>

      <button
        type="button"
        className="nav-burger"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="nav-mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-burger-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="nav-menu" id="nav-mobile-menu" hidden={!open}>
        <nav className="nav-menu-links" aria-label="Sections">
          {links}
        </nav>
        <div className="nav-menu-footer">
          {langToggle}
          <a
            className="pill pill-peach nav-menu-cta"
            href={t.nav.ctaHref}
            onClick={() => setOpen(false)}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

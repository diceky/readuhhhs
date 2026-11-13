import { useLang } from "../i18n";
import Reveal from "./Reveal";
import themesTop from "../assets/themes-top.svg";
import themesFrame from "../assets/themes-frame.svg";

export default function KeyThemes() {
  const { t } = useLang();
  return (
    <section className="themes">
      <img className="themes-top" src={themesTop} alt="" aria-hidden="true" />
      <div className="themes-inner">
        <Reveal as="h2" className="themes-heading">
          {t.keyThemes.label}
        </Reveal>
        <div className="themes-grid">
          {t.keyThemes.themes.map((theme, i) => (
            <Reveal key={i} delay={i * 120}>
              <h3 className="themes-title">{theme.title}</h3>
              <p className="themes-body">{theme.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="themes-closing" delay={150}>
          {t.keyThemes.closing.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </Reveal>
      </div>
      <Reveal
        as="img"
        className="themes-frame"
        src={themesFrame}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

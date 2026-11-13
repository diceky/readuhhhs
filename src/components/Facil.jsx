import { useLang } from "../i18n";
import Reveal from "./Reveal";
import facilitator from "../assets/facilitator.png";

export default function Facil() {
  const { t } = useLang();
  return (
    <section className="facil">
      <div className="facil-grid">
        <Reveal>
          <img className="facil-photo" src={facilitator} alt={t.facil.name} />
        </Reveal>
        <Reveal className="facil-info" delay={120}>
          <h2 className="facil-heading">{t.facil.heading}</h2>
          <p className="facil-name">{t.facil.name}</p>
          {t.facil.bio.map((p, i) => (
            <p className="facil-bio" key={i}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

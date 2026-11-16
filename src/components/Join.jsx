import { useLang } from "../i18n";
import Reveal from "./Reveal";
import joinDeco from "../assets/join-deco.svg";

export default function Join() {
  const { t } = useLang();
  return (
    <section className="join">
      <Reveal
        as="img"
        className="join-deco"
        src={joinDeco}
        alt=""
        aria-hidden="true"
      />
      <div className="join-inner">
        <Reveal as="p" className="join-eyebrow">
          {t.join.eyebrow}
        </Reveal>
        <Reveal as="h2" className="join-heading" delay={100}>
          {t.join.heading}
        </Reveal>
        <Reveal className="join-body" delay={180}>
          {t.join.body}
        </Reveal>
        <Reveal className="join-details" delay={260}>
          <h3 className="join-details-title">{t.join.detailsTitle}</h3>
          <dl className="join-details-table">
            {t.join.details.map((row) => (
              <div className="join-details-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={340}>
          <a className="pill pill-cream join-cta" href={t.join.ctaHref}>
            {t.join.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

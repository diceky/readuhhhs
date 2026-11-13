import { useLang } from "../i18n";
import Reveal from "./Reveal";
import divider from "../assets/isnot-divider.svg";

export default function IsNot() {
  const { t } = useLang();
  return (
    <section className="isnot">
      <Reveal className="isnot-grid">
        <div className="isnot-col">
          <p className="isnot-head-side isnot-head-is">
            {t.isNot.brand} <span>{t.isNot.isTitle}</span>
          </p>
          <img
            className="isnot-divider"
            src={divider}
            alt=""
            aria-hidden="true"
          />
          {t.isNot.is.map((item, i) => (
            <p className="isnot-item isnot-item-is" key={i}>
              {item}
            </p>
          ))}
        </div>
        <div className="isnot-col">
          <p className="isnot-head-side isnot-head-not">
            {t.isNot.brand} <span>{t.isNot.notTitle}</span>
          </p>
          <img
            className="isnot-divider"
            src={divider}
            alt=""
            aria-hidden="true"
          />
          {t.isNot.not.map((item, i) => (
            <p className="isnot-item isnot-item-not" key={i}>
              {item}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

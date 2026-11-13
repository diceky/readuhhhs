import { useLang } from "../i18n";
import Reveal from "./Reveal";
import rule1Outer from "../assets/rule1-outer-arc.svg";
import rule1Inner from "../assets/rule1-inner-arc.svg";
import rule2Circle from "../assets/rule2-circle.svg";
import rule2Square from "../assets/rule2-square.svg";
import rule2Triangle from "../assets/rule2-triangle.svg";
import rule3Disk from "../assets/rule3-disk.svg";
import rule3Bars from "../assets/rule3-bars.svg";
import rule4First from "../assets/rule4-square-first.svg";
import rule4Middle from "../assets/rule4-square-middle.svg";
import rule4Final from "../assets/rule4-square-final.svg";

const cardArt = [
  [rule1Outer, rule1Inner],
  [rule2Circle, rule2Square, rule2Triangle],
  [rule3Disk, rule3Bars],
  [rule4First, rule4Middle, rule4Final],
];

export default function Rules() {
  const { t } = useLang();
  return (
    <section className="rules" id="rules">
      <Reveal as="h2" className="rules-heading">
        {t.rules.label}
      </Reveal>
      <div className="rules-grid">
        {t.rules.cards.map((card, i) => (
          <Reveal key={i} className={`rules-card rules-card-${i + 1} ${i < 2 ? "band-navy" : "band-teal"}`} delay={(i % 2) * 100}>
            <div className="rules-band" aria-hidden="true">
              {cardArt[i].map((src, j) => (
                <img
                  key={j}
                  src={src}
                  alt=""
                  className={`rules-icon rules-card-${i + 1}-icon-${j + 1}`}
                />
              ))}
            </div>
            <div className="rules-card-body">
              <h3 className="rules-card-title">{card.title}</h3>
              <p className="rules-card-text">{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

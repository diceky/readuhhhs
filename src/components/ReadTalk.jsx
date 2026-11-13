import { useLang } from "../i18n";
import Reveal from "./Reveal";
import panelLeft from "../assets/readtalk-panel-left.svg";
import panelRight from "../assets/readtalk-panel-right.svg";
import readtalkDot from "../assets/readtalk-dot.svg";

export default function ReadTalk() {
  const { t } = useLang();
  return (
    <section className="readtalk" id="readtalk">
      <Reveal as="h2" className="readtalk-heading">
        {t.readTalk.heading}
      </Reveal>
      <div className="readtalk-grid">
        <Reveal className="readtalk-col readtalk-read">
          <div className="readtalk-circle">
            <img src={panelLeft} alt="" aria-hidden="true" />
            <span className="readtalk-char">{t.readTalk.read.char}</span>
          </div>
          <p className="readtalk-label">{t.readTalk.read.label}</p>
          <p className="readtalk-body">{t.readTalk.read.body}</p>
        </Reveal>
        <Reveal className="readtalk-col readtalk-talk" delay={120}>
          <div className="readtalk-circle">
            <img src={panelRight} alt="" aria-hidden="true" />
            <span className="readtalk-char">{t.readTalk.talk.char}</span>
          </div>
          <p className="readtalk-label">{t.readTalk.talk.label}</p>
          <p className="readtalk-body">{t.readTalk.talk.body}</p>
        </Reveal>
      </div>
      <Reveal delay={80}>
        <img className="readtalk-dot" src={readtalkDot} alt="" aria-hidden="true" />
      </Reveal>
      <Reveal className="readtalk-pills" delay={140}>
        {t.readTalk.pills.map((pill, i) => (
          <span className="readtalk-pill" key={i}>
            {pill}
          </span>
        ))}
      </Reveal>
    </section>
  );
}

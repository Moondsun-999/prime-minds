import type { PlaybookCopy } from "@/content/playbook";
import { CtaButton } from "./CtaButton";
import { CycleDiagram } from "./CycleDiagram";
import { DifferentCards } from "./DifferentCards";
import { HowItWorks } from "./HowItWorks";
import { RichText } from "./RichText";
import styles from "./PlaybookLetter.module.css";

export function PlaybookLetter({ copy }: { copy: PlaybookCopy }) {
  const l = copy.letter;
  return (
    <section className={styles.section}>
      <div className={styles.letter}>
        <p className={styles.lead} data-reveal="">{l.greeting}</p>
        <p data-reveal="">
          {l.situation.map((line, i) => (
            <span key={i} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <p className={styles.strong} data-reveal="">
          <mark className="hl" style={{ color: "inherit", backgroundColor: "transparent" }}>
            {l.forYou}
          </mark>
        </p>
        <p data-reveal="">{l.want}</p>
        <p className={styles.semi} data-reveal="">{l.tenMinutes}</p>
        <p data-reveal="">{l.notYourWork}</p>
        <p data-reveal="">
          <RichText parts={l.gap} />
        </p>

        <div className={styles.strip} data-reveal="zoom">
          {l.gapStrip.map((step, i) => (
            <div key={step} className={styles.stripItem}>
              {i > 0 && (
                <span className={styles.arrow} aria-hidden="true">
                  ←
                </span>
              )}
              <span className={`${styles.chip} ${i === 2 ? styles.chipGap : ""} ${i === 3 ? styles.chipMuted : ""}`}>{step}</span>
            </div>
          ))}
        </div>

        <p data-reveal="">
          <span className={styles.tag}>{l.cycleIntro}</span>
        </p>
        <CycleDiagram center={l.cycleCenter} steps={l.cycle} />
        {l.afterCycle.map((line) => (
          <p key={line} data-reveal="">
            {line}
          </p>
        ))}

        <p className={styles.lead} data-reveal="">{l.goodNews}</p>
        <p data-reveal="">
          <RichText parts={l.guide} />
        </p>
        <p data-reveal="">
          <RichText parts={l.apply} />
        </p>
        <div className={styles.ctaRow} data-reveal="">
          <CtaButton cta={l.cta} />
        </div>

        <DifferentCards copy={copy} />
        <HowItWorks copy={copy} />
      </div>
    </section>
  );
}

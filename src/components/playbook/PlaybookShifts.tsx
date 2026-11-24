import type { PlaybookCopy } from "@/content/playbook";
import { CtaButton } from "./CtaButton";
import styles from "./PlaybookShifts.module.css";

/** The 3 shifts: big gradient numbers, a before → after chip that strikes through on reveal, a closing callout. */
export function PlaybookShifts({ copy }: { copy: PlaybookCopy }) {
  const s = copy.shifts;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow} data-reveal="">{s.eyebrow}</p>
        <h2 className={styles.title} data-reveal="">{s.title}</h2>
        <p className={styles.intro} data-reveal="">{s.intro}</p>
        <div className={styles.list}>
          {s.items.map((item, i) => (
            <article
              key={item.n}
              className={`${styles.card} ${"rose" in item && item.rose ? styles.rose : ""}`}
              data-reveal=""
              style={{ ["--d" as string]: i }}
            >
              <span className={`n ${styles.num}`}>{item.n}</span>
              <div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                <p className={styles.ba}>
                  <span className={styles.before}>{item.before}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ←
                  </span>
                  <span className={styles.after}>{item.after}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.callout} data-reveal="zoom">
          {s.closingA}
          <span>{s.closingB}</span>
        </p>
        <div className={styles.ctaRow} data-reveal="">
          <CtaButton cta={s.cta} />
        </div>
      </div>
    </section>
  );
}

import { playbook } from "@/content/playbook";
import { CtaButton } from "./CtaButton";
import styles from "./PlaybookClose.module.css";

export function PlaybookClose() {
  const c = playbook.close;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title} data-reveal="">{c.title}</h2>
        <p data-reveal="">{c.how}</p>
        <p data-reveal="">{c.why}</p>
        <div className={styles.ctaRow} data-reveal="zoom">
          <CtaButton cta={c.cta} />
        </div>
        <p className={styles.privacy}>{playbook.privacy}</p>
        <p className={styles.footer}>{playbook.footer}</p>
      </div>
    </section>
  );
}

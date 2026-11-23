import Image from "next/image";
import { playbook } from "@/content/playbook";
import { CtaButton } from "./CtaButton";
import { PlaybookIcon } from "./PlaybookIcon";
import styles from "./PlaybookBullets.module.css";

export function PlaybookBullets() {
  const b = playbook.bullets;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.book} data-reveal="zoom">
            <Image src="/images/playbook/book.webp" alt="" width={900} height={1303} sizes="180px" />
          </div>
          <div className={styles.headText} data-reveal="">
            <p className={styles.eyebrow}>{b.eyebrow}</p>
            <h2 className={styles.title}>{b.title}</h2>
            <p className={styles.meta}>{b.meta}</p>
          </div>
        </div>
        <ul className={styles.grid}>
          {b.items.map((item, i) => (
            <li
              key={`${item.step}-${item.lead}`}
              className={`${styles.item} ${"featured" in item && item.featured ? styles.featured : ""}`}
              data-reveal=""
              style={{ ["--d" as string]: i % 2 }}
            >
              <span className={styles.check}>
                <PlaybookIcon name="check" size={14} />
              </span>
              <div>
                <span className={styles.step}>{item.step}</span>
                <p>
                  <b>{item.lead}</b>
                  {item.rest}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.more} data-reveal="">{b.more}</p>
        <div className={styles.ctaRow} data-reveal="">
          <CtaButton cta={b.cta} />
        </div>
      </div>
    </section>
  );
}

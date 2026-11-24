import Image from "next/image";
import type { PlaybookCopy } from "@/content/playbook";
import { CtaButton } from "./CtaButton";
import { FunnelStack } from "./FunnelStack";
import { PlaybookIcon, type PlaybookIconName } from "./PlaybookIcon";
import styles from "./HowItWorks.module.css";

/** The three stages as equal cards with a drawn connector, then the full funnel (image on desktop, stacked on phones). */
export function HowItWorks({ copy }: { copy: PlaybookCopy }) {
  const h = copy.how;
  return (
    <>
      <h2 className={styles.title} data-reveal="">{h.title}</h2>
      <p data-reveal="">{h.intro}</p>
      <ol className={styles.steps}>
        {h.steps.map((s, i) => (
          <li key={s.title} className={`${styles.step} ${i === 1 ? styles.rose : ""}`} data-reveal="right" style={{ ["--d" as string]: i }}>
            <span className={`${styles.icon} ${styles[`icon${i}`]}`}>
              <PlaybookIcon name={s.icon as PlaybookIconName} size={24} />
            </span>
            <div>
              <b>
                <span className="n">{i + 1}</span>. {s.title}
              </b>{" "}
              {s.text}
            </div>
          </li>
        ))}
      </ol>
      <p data-reveal="">{h.tracking}</p>
      <p className={styles.funnelIntro} data-reveal="">{h.funnelIntro}</p>
      <div className={styles.funnelDesktop} data-reveal="zoom">
        <Image src="/images/playbook/funnel.webp" alt={h.funnelAlt} width={1600} height={1306} sizes="680px" />
      </div>
      <FunnelStack />
      <p className={styles.caption}>{h.funnelCaption}</p>
      <div className={styles.ctaRow} data-reveal="">
        <CtaButton cta={h.cta} />
      </div>
    </>
  );
}

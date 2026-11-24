import { playbook } from "@/content/playbook";
import { PlaybookIcon, type PlaybookIconName } from "./PlaybookIcon";
import { RichText } from "./RichText";
import styles from "./DifferentCards.module.css";

/** "What's different here?": three equal cards and the $1.6M card (counts up), then the proof block. */
export function DifferentCards() {
  const d = playbook.different;
  const p = playbook.proof;
  return (
    <>
      <h2 className={styles.title} data-reveal="">{d.title}</h2>
      <div className={styles.grid}>
        {d.cards.map((c, i) => (
          <div key={c.tag} className={styles.card} data-reveal="" style={{ ["--d" as string]: i }}>
            <span className={`${styles.pill} ${i === 0 ? styles.pillRose : ""}`}>
              <PlaybookIcon name={c.icon as PlaybookIconName} size={16} />
              {c.tag}
            </span>
            <p>{c.text}</p>
          </div>
        ))}
        <div className={`${styles.card} ${styles.dark}`} data-reveal="" style={{ ["--d" as string]: 3 }}>
          <span className={styles.big}>
            {d.figure.prefix}
            <span data-count={d.figure.value} data-decimals="1">
              {d.figure.value.toFixed(1)}
            </span>
            {d.figure.suffix}
          </span>
          <p>{d.figure.text}</p>
        </div>
      </div>

      <h2 className={styles.title} data-reveal="">{p.title}</h2>
      <div className={styles.placeholder} data-reveal="">[ {p.chartPlaceholder} ]</div>
      <p data-reveal="">
        <RichText parts={p.text} />
        <br />
        {p.text2}
      </p>
      <div className={styles.placeholder} data-reveal="">[ {p.photoPlaceholder} ]</div>
    </>
  );
}

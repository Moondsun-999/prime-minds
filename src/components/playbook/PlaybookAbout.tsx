import { playbook } from "@/content/playbook";
import styles from "./PlaybookAbout.module.css";

/** Abdallah's story: each line reveals in turn down a thin timeline. */
export function PlaybookAbout() {
  const a = playbook.about;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title} data-reveal="">{a.title}</h2>
        <ol className={styles.timeline}>
          {a.story.map((line) => (
            <li key={line} data-reveal="right">
              {line}
            </li>
          ))}
        </ol>
        <p className={styles.figure} data-reveal="zoom">
          {a.figureLine[0]}
          <span className="n">{a.figureLine[1]}</span>
          {a.figureLine[2]}
        </p>
        <div className={styles.placeholder} data-reveal="">[ {a.photoPlaceholder} ]</div>
        {a.after.map((line) => (
          <p key={line} data-reveal="">
            {line}
          </p>
        ))}
        <div className={styles.promise} data-reveal="">
          <p className={styles.promiseTitle}>{a.promiseTitle}</p>
          <p>{a.promise}</p>
        </div>
      </div>
    </section>
  );
}

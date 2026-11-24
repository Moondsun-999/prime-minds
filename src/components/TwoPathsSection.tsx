import React from "react";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import type { HomeCopy } from "@/content/home";
import styles from "./TwoPathsSection.module.css";

interface TwoPathsSectionProps {
  copy: HomeCopy["paths"];
}

export default function TwoPathsSection({ copy }: TwoPathsSectionProps) {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.section} id="paths">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">{copy.eyebrow}</span>
          <h2 className="section__title">
            {copy.titleA}
            <br />
            <span className="text-gradient">{copy.titleB}</span>
          </h2>
        </div>

        <div className={styles.paths}>
          <div className={`${styles.card} ${styles.cardOld}`}>
            <div className={styles.cardIcon}>
              <AppleEmoji emoji="❌" size={28} />
            </div>
            <h3 className={styles.cardTitle}>{copy.oldTitle}</h3>
            <ul className={styles.list}>
              {copy.oldItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className={styles.cardBottom}>
              <span className={styles.faded}>{copy.oldBottom}</span>
            </div>
          </div>

          <div className={styles.vsCircle}>
            <span>{copy.vs}</span>
          </div>

          <div className={`${styles.card} ${styles.cardNew}`}>
            <div className={styles.cardIcon}>
              <AppleEmoji emoji="✅" size={28} />
            </div>
            <h3 className={styles.cardTitle}>{copy.newTitle}</h3>
            <ul className={styles.list}>
              {copy.newItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className={styles.cardBottom}>
              <Button href={skoolUrl} variant="primary" size="lg">
                {copy.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import type { HomeCopy } from "@/content/home";
import styles from "./FinalCTA.module.css";

interface FinalCTAProps {
  copy: HomeCopy["finalCta"];
}

export default function FinalCTA({ copy }: FinalCTAProps) {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.section} id="join">
      <div className={`container ${styles.content}`}>
        <div className={`glow-orb glow-orb--primary ${styles.orb1}`} />
        <div className={`glow-orb glow-orb--accent ${styles.orb2}`} />

        <div className={styles.inner}>
          <span className="section__eyebrow">{copy.eyebrow}</span>
          <h2>
            {copy.titleA} <span className="text-gradient">{copy.titleB}</span>
          </h2>

          <div className={styles.paths}>
            <div className={styles.path}>
              <h4 className={styles.pathLabel}>
                <AppleEmoji emoji="✅" size={20} /> {copy.bestLabel}
              </h4>
              <p>{copy.best}</p>
            </div>
            <div className={styles.path}>
              <h4 className={styles.pathLabel}>
                <AppleEmoji emoji="🔥" size={20} /> {copy.worstLabel}
              </h4>
              <p>{copy.worst}</p>
            </div>
          </div>

          <div className={styles.orText}>
            <span>{copy.orLabel}</span>
            <p className={styles.orDesc}>{copy.orText}</p>
          </div>

          <div className={styles.ctas}>
            <Button href={skoolUrl} variant="primary" size="xl">
              {copy.cta}
            </Button>
            <p className={styles.ctaNote}>{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

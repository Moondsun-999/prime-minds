import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import AppleEmoji from "./ui/AppleEmoji";
import type { HomeCopy } from "@/content/home";
import styles from "./GuaranteeSection.module.css";

interface GuaranteeSectionProps {
  copy: HomeCopy["guarantee"];
}

export default function GuaranteeSection({ copy }: GuaranteeSectionProps) {
  return (
    <SectionWrapper id="guarantee">
      <div className={styles.wrapper}>
        <div className={styles.shield}>
          <AppleEmoji emoji="🛡️" size={64} />
        </div>
        <span className="section__eyebrow">{copy.eyebrow}</span>
        <h2>
          {copy.titleA} <span className="text-gradient">{copy.titleAccent}</span>
        </h2>

        <div className={styles.guaranteeText}>
          <p className={styles.bold}>{copy.bold}</p>
          <p>{copy.text}</p>
        </div>

        <div className={styles.reasons}>
          {copy.reasons.map((reason, i) => (
            <div key={i} className={styles.reason}>
              <h4>{reason.title}</h4>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>

        <p className={styles.closing}>{copy.closing}</p>
      </div>
    </SectionWrapper>
  );
}

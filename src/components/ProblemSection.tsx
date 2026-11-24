import React from "react";
import { TrendingDown, RefreshCw, Brain, Wallet, HeartCrack, Battery } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import type { HomeCopy } from "@/content/home";
import styles from "./ProblemSection.module.css";

// Icons and card widths are layout, not copy: they follow the order of `copy.points`.
const pointLayout = [
  { icon: TrendingDown, colSpan: 1 },
  { icon: RefreshCw, colSpan: 2 },
  { icon: Brain, colSpan: 1 },
  { icon: Wallet, colSpan: 2 },
  { icon: HeartCrack, colSpan: 1 },
  { icon: Battery, colSpan: 2 },
];

interface ProblemSectionProps {
  copy: HomeCopy["problem"];
}

export default function ProblemSection({ copy }: ProblemSectionProps) {
  return (
    <SectionWrapper id="problem">
      <div className="section__header">
        <span className="section__eyebrow">{copy.eyebrow}</span>
        <h2 className="section__title">
          {copy.titleA}
          <br />
          <span className="text-gradient">{copy.titleB}</span>
        </h2>
        <p className="section__subtitle">{copy.subtitle}</p>
      </div>

      <div className={styles.bentoGrid}>
        {copy.points.map((point, i) => {
          const layout = pointLayout[i];
          const Icon = layout.icon;
          return (
            <div
              key={i}
              className={`${styles.featureCard} ${layout.colSpan === 2 ? styles.colSpan2 : ""}`}
            >
              {/* Dot pattern overlay */}
              <div className={styles.dotPattern} />

              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className={styles.tag}>#{point.tag}</span>
                </div>

                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDesc}>{point.description}</p>
              </div>

              {/* Corner accents */}
              <span className={styles.cornerTL} />
              <span className={styles.cornerTR} />
              <span className={styles.cornerBL} />
              <span className={styles.cornerBR} />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

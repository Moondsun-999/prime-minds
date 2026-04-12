import React from "react";
import { TrendingDown, RefreshCw, Brain, Wallet, HeartCrack, Battery } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import styles from "./ProblemSection.module.css";

const painPoints = [
  {
    icon: TrendingDown,
    title: "M9ayed f Nafs La Place",
    description:
      "You wake up, go to work, come back exhausted. Months pass — nothing changes. L7ayat kat doz o nta wa9ef.",
    tag: "Stagnation",
  },
  {
    icon: RefreshCw,
    title: "Jerebt Kolchi, Walou Ma Khdem",
    description:
      "Trading, ecom, dropshipping — you put money in and watched it vanish. Daba makat3refch chno t trust.",
    tag: "Failed Attempts",
    colSpan: 2,
  },
  {
    icon: Brain,
    title: "Overthinking = Zero Action",
    description:
      "Every week it's a new idea. You research for hours, get excited, then freeze. L'analyse paralysie kat qtelk.",
    tag: "Analysis Paralysis",
  },
  {
    icon: Wallet,
    title: "L Flous 3merha Makatkafi",
    description:
      "10,000-17,000 MAD/month sounds okay until rent, transport, food, and life eat it all. Zero savings.",
    tag: "Financial Trap",
    colSpan: 2,
  },
  {
    icon: HeartCrack,
    title: "L'avenir Wa9ef",
    description:
      "You can't plan a future — no marriage, no car, no apartment. Mkatqderch tplanifié walou.",
    tag: "No Future",
  },
  {
    icon: Battery,
    title: "Qrib T Laisser Tomber",
    description:
      "\"Rbbi 3tani had l9isma.\" That thought hits every night. You scroll seeing others succeed while you stand still.",
    tag: "Burnout",
    colSpan: 2,
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem">
      <div className="section__header">
        <span className="section__eyebrow">Wach Katban Lik Familiar?</span>
        <h2 className="section__title">
          You Know Something Has to Change.
          <br />
          <span className="text-gradient">But Makat3refch Chno Exactly.</span>
        </h2>
        <p className="section__subtitle">
          If you&apos;re a 23-31 year old professional in Morocco making 10K-17K MAD,
          working a job you&apos;re tired of, and scrolling through success stories that
          feel impossible — this is for you.
        </p>
      </div>

      <div className={styles.bentoGrid}>
        {painPoints.map((point, i) => {
          const Icon = point.icon;
          return (
            <div
              key={i}
              className={`${styles.featureCard} ${point.colSpan === 2 ? styles.colSpan2 : ""}`}
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

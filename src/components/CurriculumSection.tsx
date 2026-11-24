"use client";

import React, { useState } from "react";
import { BookOpen, Brain, Briefcase, Layers, Bot, Rocket, Scale, Archive, Phone, Users, Zap, ChevronDown } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import type { HomeCopy } from "@/content/home";
import styles from "./CurriculumSection.module.css";

// Icons, numbering and highlights are layout: they follow the order of `copy.modules`.
const moduleLayout = [
  { icon: BookOpen },
  { icon: Brain },
  { icon: Briefcase },
  { icon: Layers },
  { icon: Bot, highlight: true },
  { icon: Rocket, highlight: true },
  { icon: Scale },
  { icon: Archive },
];

const bonusIcons = [Phone, Users, Zap];

interface CurriculumSectionProps {
  copy: HomeCopy["curriculum"];
}

export default function CurriculumSection({ copy }: CurriculumSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <SectionWrapper id="curriculum">
      <div className="section__header">
        <span className="section__eyebrow">{copy.eyebrow}</span>
        <h2 className="section__title">
          {copy.titleA}
          <br />
          <span className="text-gradient">{copy.titleB}</span>
        </h2>
        <p className="section__subtitle">{copy.subtitle}</p>
      </div>

      <div className={styles.moduleGrid}>
        {copy.modules.map((mod, i) => {
          const layout = moduleLayout[i];
          const Icon = layout.icon;
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`${styles.moduleCard} ${layout.highlight ? styles.highlighted : ""} ${isOpen ? styles.open : ""}`}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.moduleTop}>
                <div className={styles.moduleLeft}>
                  <div className={styles.moduleIcon}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className={styles.moduleNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                />
              </div>
              <div className={`${styles.moduleBody} ${isOpen ? styles.moduleBodyOpen : ""}`}>
                <p>{mod.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.bonusRow}>
        <div className={styles.bonusLabel}>{copy.bonusLabel}</div>
        <div className={styles.bonuses}>
          {copy.bonuses.map((bonus, i) => {
            const Icon = bonusIcons[i];
            return (
              <div key={i} className={styles.bonusCard}>
                <div className={styles.bonusIcon}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h4>{bonus.title}</h4>
                <p>{bonus.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

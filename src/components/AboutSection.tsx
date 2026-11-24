import React from "react";
import { MapPin, Briefcase, Cpu, Target, Quote, TrendingUp } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import type { HomeCopy } from "@/content/home";
import styles from "./AboutSection.module.css";

const highlightIcons = [MapPin, Briefcase, Cpu, Target, Quote, TrendingUp];

interface AboutSectionProps {
  copy: HomeCopy["about"];
}

export default function AboutSection({ copy }: AboutSectionProps) {
  return (
    <SectionWrapper id="about">
      <div className={styles.layout}>
        <div className={styles.story}>
          <span className="section__eyebrow">{copy.eyebrow}</span>
          <h2>
            {copy.titleA} <span className="text-gradient">{copy.titleAccent}</span>
            <br />
            {copy.titleB}
          </h2>
          <div className={styles.text}>
            {copy.paragraphs.map((p, i) => (
              <p key={i}>
                {"strong" in p && p.strong ? <strong>{p.strong}</strong> : null}
                {p.text}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.highlights}>
          {copy.highlights.map((item, i) => {
            const Icon = highlightIcons[i];
            return (
              <div key={i} className={styles.highlightItem}>
                <div className={styles.highlightIcon}>
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className={styles.highlightLabel}>{item.label}</span>
                  <span className={styles.highlightValue}>{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

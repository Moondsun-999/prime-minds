import React from "react";
import { MapPin, Briefcase, Cpu, Target, Quote, TrendingUp } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import styles from "./AboutSection.module.css";

const highlights = [
  { icon: MapPin, label: "Based in", value: "Morocco" },
  { icon: Briefcase, label: "Day job", value: "Sales (9-to-5)" },
  { icon: Cpu, label: "Building", value: "AI Agency" },
  { icon: Target, label: "Businesses tried", value: "9+" },
  { icon: Quote, label: "Philosophy", value: "Ana real." },
  { icon: TrendingUp, label: "Goal", value: "50K MAD/mo" },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className={styles.layout}>
        <div className={styles.story}>
          <span className="section__eyebrow">Chkoun Ana?</span>
          <h2>
            I&apos;m Abdallah. <span className="text-gradient">Ana Real.</span>
            <br />
            Social Media Machi Real.
          </h2>
          <div className={styles.text}>
            <p>
              I&apos;m 26, working a 9-to-5 sales job in Morocco. Since 2022,
              I&apos;ve started 9 different businesses — Trading, Ecom local, Dropshipping,
              SMMA — o failit fihom kamlin.
            </p>
            <p>
              But mabghitch n stop. Every failure taught me something no course
              or guru ever could. Daba I&apos;m building an AI Agency while documenting
              every single step.
            </p>
            <p>
              <strong>Ana mashi guru.</strong> I&apos;m not going to show you
              lamborghinis and fake screenshots. I&apos;m going to show you what I&apos;m
              actually doing, what&apos;s actually working, and what&apos;s actually failing.
            </p>
            <p>
              Had community hiya dial bnadeam li serious. Machi dial li kaydowrou
              3la shortcuts.
            </p>
          </div>
        </div>

        <div className={styles.highlights}>
          {highlights.map((item, i) => {
            const Icon = item.icon;
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

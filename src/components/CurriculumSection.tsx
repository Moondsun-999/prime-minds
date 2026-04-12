"use client";

import React, { useState } from "react";
import { BookOpen, Brain, Briefcase, Layers, Bot, Rocket, Scale, Archive, Phone, Users, Zap, ChevronDown } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import styles from "./CurriculumSection.module.css";

const modules = [
  {
    num: "01",
    title: "Introduction",
    icon: BookOpen,
    description: "How to use the program, what you need to get started, and the community rules. N7etou l'assas hna.",
  },
  {
    num: "02",
    title: "Mindset & Money Principles",
    icon: Brain,
    description: "Your current situation, paradigm shifts, comfort zone, discipline, goals, and 5 core money principles.",
  },
  {
    num: "03",
    title: "Business Models",
    icon: Briefcase,
    description: "E-commerce, services, investing — all models explained. Chno yn3es lik o chno la.",
  },
  {
    num: "04",
    title: "How to Build Any Business",
    icon: Layers,
    description: "The universal framework: product, market, offer, clients, sales. Khdem 3la any business.",
  },
  {
    num: "05",
    title: "AI Foundations",
    icon: Bot,
    description: "LLMs, prompting, n8n, Make, AI agents, vibe coding. Skills li ma kanoch men 2 ans.",
    highlight: true,
  },
  {
    num: "06",
    title: "AI Agency Course",
    icon: Rocket,
    description: "Finding clients, pricing, delivery — men l'expérience, mashi théorie.",
    highlight: true,
  },
  {
    num: "07",
    title: "Software & Legal in Morocco",
    icon: Scale,
    description: "Stripe, Mercury, payment processing, legal structure. Kolchi bach tkhdem légalement.",
  },
  {
    num: "08",
    title: "Resources",
    icon: Archive,
    description: "Curated tools, templates, scripts. Kolchi li kankhdem bih — walou ma7bess.",
  },
];

const bonuses = [
  {
    icon: Phone,
    title: "Weekly Community Calls",
    description: "Live Q&A every week. Get unstuck fast.",
  },
  {
    icon: Users,
    title: "Private Community",
    description: "Serious people 3la nafs la route.",
  },
  {
    icon: Zap,
    title: "Exclusive Content",
    description: "New strategies. Nta awal li kat3ref.",
  },
];

export default function CurriculumSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <SectionWrapper id="curriculum">
      <div className="section__header">
        <span className="section__eyebrow">Chno Kayn Dakhel?</span>
        <h2 className="section__title">
          8 Modules. Zero Fluff.
          <br />
          <span className="text-gradient">Kolchi Li Khtassk Bach Tbda.</span>
        </h2>
        <p className="section__subtitle">
          From mindset to making money — everything you need to go from
          confused employee to confident business builder.
        </p>
      </div>

      <div className={styles.moduleGrid}>
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`${styles.moduleCard} ${mod.highlight ? styles.highlighted : ""} ${isOpen ? styles.open : ""}`}
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
                    <span className={styles.moduleNum}>{mod.num}</span>
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
        <div className={styles.bonusLabel}>Included with every plan</div>
        <div className={styles.bonuses}>
          {bonuses.map((bonus, i) => {
            const Icon = bonus.icon;
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

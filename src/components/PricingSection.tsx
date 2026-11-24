import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import Card from "./ui/Card";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import type { HomeCopy } from "@/content/home";
import styles from "./PricingSection.module.css";

// Highlight and badge emoji are layout: they follow the order of `copy.plans`.
const planLayout = [
  { highlighted: true, badgeEmoji: "🔥" },
  { highlighted: false, badgeEmoji: "" },
  { highlighted: false, badgeEmoji: "👑" },
];

interface PricingSectionProps {
  copy: HomeCopy["pricing"];
}

export default function PricingSection({ copy }: PricingSectionProps) {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <SectionWrapper id="pricing">
      <div className="section__header">
        <span className="section__eyebrow">{copy.eyebrow}</span>
        <h2 className="section__title">
          {copy.titleA}
          <br />
          <span className="text-gradient">{copy.titleB}</span>
        </h2>
        <p className="section__subtitle">{copy.subtitle}</p>
      </div>

      <div className={`grid grid--3 ${styles.grid}`}>
        {copy.plans.map((plan, i) => {
          const layout = planLayout[i];
          return (
            <Card key={i} highlighted={layout.highlighted} className={styles.pricingCard}>
              {plan.badge && (
                <span className={styles.badge}>
                  {layout.badgeEmoji && <AppleEmoji emoji={layout.badgeEmoji} size={14} />}
                  {plan.badge}
                </span>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceBlock}>
                <span className={`${styles.price} ltr`}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <p className={styles.description}>{plan.description}</p>

              <ul className={styles.features}>
                {plan.features.map((feature, j) => (
                  <li key={j} className={styles.feature}>
                    <span className={styles.check}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={skoolUrl}
                variant={layout.highlighted ? "primary" : "secondary"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

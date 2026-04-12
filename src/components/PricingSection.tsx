import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import Card from "./ui/Card";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import styles from "./PricingSection.module.css";

const plans = [
  {
    name: "Pre-Launch",
    price: "Free",
    period: "Yearly Access",
    description: "Join now while it's free. Hbess blasstek daba.",
    features: [
      "Community Access",
      "All 8 Training Modules",
      "AI Foundations + AI Agency Course",
      "Software & Payments in Morocco",
      "Weekly Community Calls",
      "Exclusive Content & Updates",
    ],
    cta: "Join Free →",
    highlighted: true,
    badge: "FREE DURING PRE-LAUNCH",
    badgeEmoji: "🔥",
  },
  {
    name: "Community",
    price: "$152",
    period: "/year",
    description: "Full access. Same as Pre-Launch, after launch. ~125 MAD/month.",
    features: [
      "Community Access",
      "All 8 Training Modules",
      "AI Foundations + AI Agency Course",
      "Software & Payments in Morocco",
      "Weekly Community Calls",
      "Exclusive Content & Updates",
    ],
    cta: "Join Community →",
    highlighted: false,
    badge: null,
    badgeEmoji: null,
  },
  {
    name: "1:1 Coaching",
    price: "$350",
    period: "/year",
    description: "Everything above + personal attention. Dial li baghyin y sériousaw bzzaf. ~290 MAD/month.",
    features: [
      "Everything in Community",
      "Customized 90-Day Business Plan",
      "Weekly 1:1 Calls with Abdallah",
      "Direct Access & Priority Support",
      "Custom AI Workflow Setup",
      "Personal Accountability",
    ],
    cta: "Apply for Coaching →",
    highlighted: false,
    badge: "PREMIUM",
    badgeEmoji: "👑",
  },
];

export default function PricingSection() {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <SectionWrapper id="pricing">
      <div className="section__header">
        <span className="section__eyebrow">Simple Pricing</span>
        <h2 className="section__title">
          Invest in Rassek.
          <br />
          <span className="text-gradient">Mashi f Another Course.</span>
        </h2>
        <p className="section__subtitle">
          While fake gurus charge $500-$1,500 for video courses with zero access,
          you get everything plus a real community and a real mentor. For less than
          2 dinners per month.
        </p>
      </div>

      <div className={`grid grid--3 ${styles.grid}`}>
        {plans.map((plan, i) => (
          <Card key={i} highlighted={plan.highlighted} className={styles.pricingCard}>
            {plan.badge && (
              <span className={styles.badge}>
                {plan.badgeEmoji && <AppleEmoji emoji={plan.badgeEmoji} size={14} />}
                {plan.badge}
              </span>
            )}
            <h3 className={styles.planName}>{plan.name}</h3>
            <div className={styles.priceBlock}>
              <span className={styles.price}>{plan.price}</span>
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
              variant={plan.highlighted ? "primary" : "secondary"}
              size="lg"
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

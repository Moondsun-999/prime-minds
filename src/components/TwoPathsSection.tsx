import React from "react";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import styles from "./TwoPathsSection.module.css";

export default function TwoPathsSection() {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.section} id="paths">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Two Paths. One Choice.</span>
          <h2 className="section__title">
            The Same Salary. The Same Job.
            <br />
            <span className="text-gradient">Or Something Different.</span>
          </h2>
        </div>

        <div className={styles.paths}>
          <div className={`${styles.card} ${styles.cardOld}`}>
            <div className={styles.cardIcon}>
              <AppleEmoji emoji="❌" size={28} />
            </div>
            <h3 className={styles.cardTitle}>Stay Where You Are</h3>
            <ul className={styles.list}>
              <li>Continue making 10K-17K MAD</li>
              <li>Keep scrolling success stories</li>
              <li>Try another course that doesn&apos;t work</li>
              <li>Wait for &quot;the right time&quot; (it never comes)</li>
              <li>Same salary in 2027 as 2025</li>
            </ul>
            <div className={styles.cardBottom}>
              <span className={styles.faded}>Keep the same results</span>
            </div>
          </div>

          <div className={styles.vsCircle}>
            <span>VS</span>
          </div>

          <div className={`${styles.card} ${styles.cardNew}`}>
            <div className={styles.cardIcon}>
              <AppleEmoji emoji="✅" size={28} />
            </div>
            <h3 className={styles.cardTitle}>Take the First Step</h3>
            <ul className={styles.list}>
              <li>Learn AI skills that didn&apos;t exist 2 years ago</li>
              <li>Join serious people on the same path</li>
              <li>Get a real plan — not a motivational PDF</li>
              <li>Build while working your 9&#8209;to&#8209;5</li>
              <li>Invest the price of 2 dinners per month</li>
            </ul>
            <div className={styles.cardBottom}>
              <Button href={skoolUrl} variant="primary" size="lg">
                Join Prime Minds Free →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

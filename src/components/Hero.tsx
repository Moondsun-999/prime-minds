import React from "react";
import Button from "./ui/Button";
import VideoEmbed from "./VideoEmbed";
import styles from "./Hero.module.css";

export default function Hero() {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.hero} id="hero">
      {/* Background effects */}
      <div className={`glow-orb glow-orb--primary ${styles.orb1}`} />
      <div className={`glow-orb glow-orb--accent ${styles.orb2}`} />
      <div className={styles.gridBg} />

      <div className={`container ${styles.content}`}>
        <span className={`section__eyebrow animate-fade-in-up`}>
          FOR SERIOUS PEOPLE ONLY
        </span>

        <h1 className={`animate-fade-in-up delay-1`}>
          From 9&#8209;to&#8209;5 Frustration
          <br />
          <span className="text-gradient">to Building Your First Business.</span>
        </h1>

        <p className={`${styles.subtitle} animate-fade-in-up delay-2`}>
          I failed at 9 businesses — Trading, Ecom, Dropshipping, SMMA — and I&apos;m
          still here. Now I&apos;m building an AI Agency while working a day job, and
          I&apos;m documenting every step. Machi l guru flous, mashi 7ilm — just real
          work with real people.
        </p>

        <div className={`${styles.video} animate-fade-in-up delay-3`}>
          <VideoEmbed videoId="dQw4w9WgXcQ" title="Prime Minds Introduction" />
        </div>

        <div className={`${styles.cta} animate-fade-in-up delay-4`}>
          <Button href={skoolUrl} variant="primary" size="xl">
            Join Prime Minds Free →
          </Button>
          <p className={styles.ctaNote}>
            Pre-launch access. Free for early members. La carte mahtajhach.
          </p>
        </div>
      </div>
    </section>
  );
}

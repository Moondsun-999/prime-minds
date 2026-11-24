import React from "react";
import Button from "./ui/Button";
import VideoEmbed from "./VideoEmbed";
import type { HomeCopy } from "@/content/home";
import styles from "./Hero.module.css";

interface HeroProps {
  copy: HomeCopy["hero"];
}

export default function Hero({ copy }: HeroProps) {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.hero} id="hero">
      {/* Background effects */}
      <div className={`glow-orb glow-orb--primary ${styles.orb1}`} />
      <div className={`glow-orb glow-orb--accent ${styles.orb2}`} />
      <div className={styles.gridBg} />

      <div className={`container ${styles.content}`}>
        <span className={`section__eyebrow animate-fade-in-up`}>{copy.eyebrow}</span>

        <h1 className={`animate-fade-in-up delay-1`}>
          {copy.titleA}
          <br />
          <span className="text-gradient">{copy.titleB}</span>
        </h1>

        <p className={`${styles.subtitle} animate-fade-in-up delay-2`}>{copy.subtitle}</p>

        <div className={`${styles.video} animate-fade-in-up delay-3`}>
          <VideoEmbed videoId="dQw4w9WgXcQ" title={copy.videoTitle} />
        </div>

        <div className={`${styles.cta} animate-fade-in-up delay-4`}>
          <Button href={skoolUrl} variant="primary" size="xl">
            {copy.cta}
          </Button>
          <p className={styles.ctaNote}>{copy.note}</p>
        </div>
      </div>
    </section>
  );
}

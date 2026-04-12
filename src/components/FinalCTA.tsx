import React from "react";
import Button from "./ui/Button";
import AppleEmoji from "./ui/AppleEmoji";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <section className={styles.section} id="join">
      <div className={`container ${styles.content}`}>
        <div className={`glow-orb glow-orb--primary ${styles.orb1}`} />
        <div className={`glow-orb glow-orb--accent ${styles.orb2}`} />

        <div className={styles.inner}>
          <span className="section__eyebrow">The Decision Is Yours</span>
          <h2>
            Two Futures. Same You.{" "}
            <span className="text-gradient">Ash Ghadi Tkhtar?</span>
          </h2>

          <div className={styles.paths}>
            <div className={styles.path}>
              <h4 className={styles.pathLabel}>
                <AppleEmoji emoji="✅" size={20} /> Best Case
              </h4>
              <p>
                You invest ~$280. We build a highly customized plan li kat nase9
                m3a l 9-to-5 dialek. F 90 days, you master AI and marketing skills,
                you launch outreach, you land your first client, o tat bda t dakhel
                flous on the side toward 50,000 MAD/month.
              </p>
            </div>
            <div className={styles.path}>
              <h4 className={styles.pathLabel}>
                <AppleEmoji emoji="🔥" size={20} /> Worst Case
              </h4>
              <p>
                You invest ~$280. You struggle f l&apos;awal. B le guarantee,
                3endek 60 days ziyada dial 1:1 free. Wakha tfalé completely, tat
                mchi b skills universally valuable li worth 10x l&apos;investissement
                dialek.
              </p>
            </div>
          </div>

          <div className={styles.orText}>
            <span>Ola...</span>
            <p className={styles.orDesc}>
              Tat sed had la page. Walou mat beddel. F 90 days, ghadi tkoun f nafs
              la place, kat scrolla nafs les feeds, kat tse9si nafs le question.
            </p>
          </div>

          <div className={styles.ctas}>
            <Button href={skoolUrl} variant="primary" size="xl">
              Join Prime Minds Free →
            </Button>
            <p className={styles.ctaNote}>
              Pre-launch access. Free for early members. La carte mahtajhach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

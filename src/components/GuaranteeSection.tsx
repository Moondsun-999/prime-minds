import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import AppleEmoji from "./ui/AppleEmoji";
import styles from "./GuaranteeSection.module.css";

export default function GuaranteeSection() {
  return (
    <SectionWrapper id="guarantee">
      <div className={styles.wrapper}>
        <div className={styles.shield}>
          <AppleEmoji emoji="🛡️" size={64} />
        </div>
        <span className="section__eyebrow">Risk Reversal</span>
        <h2>
          The &quot;No-Excuses Execution&quot;{" "}
          <span className="text-gradient">Guarantee.</span>
        </h2>

        <div className={styles.guaranteeText}>
          <p className={styles.bold}>
            If you execute your custom 90-day action plan and don&apos;t see results,
            I will work with you 1-on-1 for completely free for another 60 days.
          </p>
          <p>
            Ghadi ndkhel m3ak f les tranchées, n check les systèmes dialek,
            o n fix l problems hta ykhdem.
          </p>
        </div>

        <div className={styles.reasons}>
          <div className={styles.reason}>
            <h4>My Time is On the Line.</h4>
            <p>
              If you fail, I lose my most valuable asset — l&apos;we9t diali li 3andi
              bra lkhedma. Had shi kat forcer-ni bach n3tik plan li reellement khdam.
            </p>
          </div>
          <div className={styles.reason}>
            <h4>I Need Your Success.</h4>
            <p>
              N7taj success stories dialek bach n scale. 3endi every incentive bach
              had shi ykhdem lik.
            </p>
          </div>
        </div>

        <p className={styles.closing}>
          &quot;Ana ghir kan rbe7 ila nta bditi tat khdem.&quot;
        </p>
      </div>
    </SectionWrapper>
  );
}

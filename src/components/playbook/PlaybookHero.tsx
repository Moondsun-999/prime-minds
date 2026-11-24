import Image from "next/image";
import type { PlaybookCopy } from "@/content/playbook";
import type { Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BookStack } from "./BookStack";
import { CtaButton } from "./CtaButton";
import styles from "./PlaybookHero.module.css";

export function PlaybookHero({ copy, locale }: { copy: PlaybookCopy; locale: Locale }) {
  const h = copy.hero;
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.lang}>
          <LanguageSwitcher current={locale} label={copy.langLabel} path="/playbook" />
        </div>
        <Image src="/images/brand/logo-dark-bg.svg" alt="Prime Minds" width={168} height={24} className={styles.logo} />
        <p className={styles.badge}>
          <span className={styles.badgeNew}>{h.badge}</span>
          <span>{h.badgeText}</span>
        </p>
        <p className={styles.eyebrow}>{h.eyebrow}</p>
        <h1 className={styles.title}>
          {h.headlineBefore}
          <span className={`n ${styles.figure}`}>{h.headlineFigure}</span>
          {h.headlineAfter}
        </h1>
        <p className={styles.sub}>{h.sub}</p>
        <BookStack alt={h.bookAlt} />
        <p className={styles.preCta}>{h.preCta}</p>
        {h.langNote && <p className={styles.langNote}>{h.langNote}</p>}
        <CtaButton cta={h.cta} id="hero-cta" />
        <p className={styles.privacy}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {copy.privacy}
        </p>
      </div>
    </section>
  );
}

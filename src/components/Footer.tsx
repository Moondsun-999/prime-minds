import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_URL || "#";
  const x = process.env.NEXT_PUBLIC_X_URL || "#";

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image
            src="/images/brand/logo-dark-bg.svg"
            alt="Prime Minds"
            width={150}
            height={22}
          />
          <p className={styles.tagline}>
            I&apos;m real. Social media is not.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Navigate</h4>
            <a href="#curriculum">Curriculum</a>
            <a href="#pricing">Pricing</a>
            <a href="#guarantee">Guarantee</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Follow</h4>
            <a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={x} target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          </div>
        </div>

        <div className={`divider divider--gradient ${styles.divider}`} />

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Prime Minds — Abdallah Khalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

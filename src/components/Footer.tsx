import React from "react";
import Image from "next/image";
import type { HomeCopy } from "@/content/home";
import en from "@/content/home/en";
import styles from "./Footer.module.css";

const navAnchors = ["#curriculum", "#pricing", "#guarantee", "#faq"];

interface FooterProps {
  copy?: HomeCopy["footer"];
}

export default function Footer({ copy = en.footer }: FooterProps) {
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
          <p className={styles.tagline}>{copy.tagline}</p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{copy.navigate}</h4>
            {copy.navLinks.map((label, i) => (
              <a key={i} href={navAnchors[i]}>
                {label}
              </a>
            ))}
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{copy.follow}</h4>
            <a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={x} target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          </div>
        </div>

        <div className={`divider divider--gradient ${styles.divider}`} />

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Prime Minds — {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}

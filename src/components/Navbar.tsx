"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import type { HomeCopy } from "@/content/home";
import type { Locale } from "@/i18n/config";
import styles from "./Navbar.module.css";

interface NavbarProps {
  copy: HomeCopy["nav"];
  locale: Locale;
}

export default function Navbar({ copy, locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "#";

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.spacer}>
          <LanguageSwitcher current={locale} label={copy.languageLabel} />
        </div>

        <Link href={`/${locale}`} className={styles.logo}>
          <Image
            src="/images/brand/logo-dark-bg.svg"
            alt="Prime Minds"
            width={200}
            height={28}
            priority
            className={styles.logoImg}
          />
        </Link>

        <div className={styles.cta}>
          <Button href={skoolUrl} variant="primary" size="default">
            {copy.join}
          </Button>
        </div>
      </div>
    </nav>
  );
}

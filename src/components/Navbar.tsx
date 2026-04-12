"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import styles from "./Navbar.module.css";

export default function Navbar() {
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
        {/* Empty spacer for flex layout balance */}
        <div className={styles.spacer} />

        <a href="/" className={styles.logo}>
          <Image
            src="/images/brand/logo-dark-bg.svg"
            alt="Prime Minds"
            width={160}
            height={22}
            priority
            style={{ width: "260px", height: "auto" }}
          />
        </a>

        <div className={styles.cta}>
          <Button href={skoolUrl} variant="primary" size="default">
            Join Free
          </Button>
        </div>
      </div>
    </nav>
  );
}

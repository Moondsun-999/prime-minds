import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FunnelHeader.module.css";

// Logo-only header for the guide and coaching pages, so nothing competes with the page's one action.
export default function FunnelHeader() {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link href="/" className={styles.logo} aria-label="Prime Minds home">
          <Image
            src="/images/brand/logo-dark-bg.svg"
            alt="Prime Minds"
            width={160}
            height={22}
            priority
          />
        </Link>
      </div>
    </header>
  );
}

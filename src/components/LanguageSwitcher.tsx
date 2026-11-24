"use client";

import React from "react";
import Link from "next/link";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { rememberLocale } from "@/i18n/rememberLocale";
import styles from "./LanguageSwitcher.module.css";

interface LanguageSwitcherProps {
  current: Locale;
  label: string;
  /** Page to switch within, e.g. "/playbook". Defaults to the home page. */
  path?: string;
}

export default function LanguageSwitcher({ current, label, path = "" }: LanguageSwitcherProps) {
  return (
    <div className={styles.switcher} role="group" aria-label={label}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${path}`}
          hrefLang={localeMeta[locale].htmlLang}
          lang={localeMeta[locale].htmlLang}
          className={`${styles.option} ${locale === current ? styles.active : ""}`}
          aria-current={locale === current ? "true" : undefined}
          onClick={() => rememberLocale(locale)}
        >
          {localeMeta[locale].label}
        </Link>
      ))}
    </div>
  );
}

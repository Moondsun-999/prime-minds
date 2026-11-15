import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Alexandria, Tajawal } from "next/font/google";
import { OnboardingForm } from "@/components/OnboardingForm";
import { onboarding } from "@/content/onboarding";
import { clientForCode } from "@/lib/onboarding";
import styles from "./page.module.css";

const display = Alexandria({ subsets: ["arabic"], weight: ["600", "700", "800"], variable: "--font-ar-display", display: "swap" });
const body = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-ar-body", display: "swap" });

export const metadata: Metadata = {
  title: "استمارة البداية — Prime Minds",
  robots: { index: false, follow: false, nocache: true },
};

export default async function OnboardingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!clientForCode(code)) notFound();

  return (
    <div dir="rtl" lang="ar" className={`${display.variable} ${body.variable} ${styles.page}`}>
      <header className={styles.header}>
        <Image src="/images/brand/logo-dark-bg.svg" alt="Prime Minds" width={168} height={24} priority />
        <span className={styles.tag}>{onboarding.title}</span>
      </header>
      <main className={styles.main}>
        <OnboardingForm code={code} />
      </main>
    </div>
  );
}

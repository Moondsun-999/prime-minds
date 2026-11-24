import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import { playbook } from "@/content/playbook";
import { PlaybookHero } from "@/components/playbook/PlaybookHero";
import { PlaybookLetter } from "@/components/playbook/PlaybookLetter";
import { PlaybookBullets } from "@/components/playbook/PlaybookBullets";
import { PlaybookShifts } from "@/components/playbook/PlaybookShifts";
import { PlaybookClose } from "@/components/playbook/PlaybookClose";
import { OptInModal } from "@/components/playbook/OptInModal";
import { PlaybookEffects } from "@/components/playbook/PlaybookEffects";
import styles from "./page.module.css";

const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-ar", display: "swap" });

export const metadata: Metadata = {
  title: playbook.meta.title,
  description: playbook.meta.description,
  // Kept out of search until the guide itself is ready and the page is launched.
  robots: { index: false, follow: false },
  openGraph: {
    title: playbook.meta.title,
    description: playbook.meta.description,
    url: "https://khalk.co/playbook",
    siteName: "Prime Minds",
    locale: "ar_MA",
    type: "website",
  },
};

export default function PlaybookPage() {
  return (
    <div dir="rtl" lang="ar" className={`${amiri.variable} ${styles.page}`}>
      <PlaybookEffects />
      <main>
        <PlaybookHero />
        <PlaybookLetter />
        <PlaybookBullets />
        <PlaybookShifts />
        {/* The "who am I" section (PlaybookAbout) is hidden until its photo and chart exist.
            Full version: branch keep/playbook-full-story. */}
        <PlaybookClose />
      </main>
      <OptInModal />
    </div>
  );
}

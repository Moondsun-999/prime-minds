import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Amiri } from "next/font/google";
import { getPlaybookCopy } from "@/content/playbook";
import { hasLocale, locales, localeMeta } from "@/i18n/config";
import { PlaybookHero } from "@/components/playbook/PlaybookHero";
import { PlaybookLetter } from "@/components/playbook/PlaybookLetter";
import { PlaybookBullets } from "@/components/playbook/PlaybookBullets";
import { PlaybookShifts } from "@/components/playbook/PlaybookShifts";
import { PlaybookClose } from "@/components/playbook/PlaybookClose";
import { OptInModal } from "@/components/playbook/OptInModal";
import { PlaybookEffects } from "@/components/playbook/PlaybookEffects";
import styles from "./page.module.css";

const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-ar", display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/playbook">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getPlaybookCopy(lang);

  return {
    title: meta.title,
    description: meta.description,
    // Kept out of search until the guide itself is ready and the page is launched.
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${lang}/playbook`,
      languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}/playbook`])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://khalk.co/${lang}/playbook`,
      siteName: "Prime Minds",
      locale: localeMeta[lang].ogLocale,
      type: "website",
    },
  };
}

export default async function PlaybookPage({ params }: PageProps<"/[lang]/playbook">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const copy = getPlaybookCopy(lang);
  const { htmlLang, dir } = localeMeta[lang];

  // Arabic keeps Amiri. English and Darija use the site's Latin body font.
  const fontClass = lang === "ar" ? amiri.variable : styles.latin;

  return (
    <div dir={dir} lang={htmlLang} className={`${fontClass} ${styles.page}`}>
      <PlaybookEffects copy={copy} />
      <main>
        <PlaybookHero copy={copy} locale={lang} />
        <PlaybookLetter copy={copy} />
        <PlaybookBullets copy={copy} />
        <PlaybookShifts copy={copy} />
        {/* The "who am I" section (PlaybookAbout) is hidden until its photo and chart exist.
            Full version: branch keep/playbook-full-story. */}
        <PlaybookClose copy={copy} />
      </main>
      <OptInModal copy={copy} locale={lang} />
    </div>
  );
}

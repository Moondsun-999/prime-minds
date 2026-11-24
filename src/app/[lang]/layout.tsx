import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { playfair, jakarta, readex } from "../fonts";
import { getHomeCopy } from "@/content/home";
import { hasLocale, locales, localeMeta } from "@/i18n/config";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getHomeCopy(lang);

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "online business Morocco",
      "AI agency Morocco",
      "business while working 9-5",
      "Prime Minds",
      "Abdallah Khalk",
    ],
    authors: [{ name: "Abdallah Khalk" }],
    creator: "Abdallah Khalk",
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(
        locales.map((l) => [localeMeta[l].htmlLang, `/${l}`]),
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `https://khalk.co/${lang}`,
      siteName: "Prime Minds",
      locale: localeMeta[lang].ogLocale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.twitterDescription,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    metadataBase: new URL("https://khalk.co"),
    icons: {
      icon: [
        { url: "/images/brand/favicon-light.png", media: "(prefers-color-scheme: light)" },
        { url: "/images/brand/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { htmlLang, dir } = localeMeta[lang];

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${playfair.variable} ${jakarta.variable} ${readex.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

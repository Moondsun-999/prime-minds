import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { playfair, jakarta, readex } from "../fonts";
import "../globals.css";

// English-only pages (lead-magnet funnel, coaching page). They are not translated yet,
// so the proxy leaves them alone and they keep their own root layout.
export const metadata: Metadata = {
  title: "Prime Minds — Build a Business While Working Your 9-to-5",
  description:
    "Failed many times. Never gave up. Join a community of serious people building AI businesses while working 9-to-5 in Morocco. Mindset, business models, AI skills, and 1:1 coaching.",
  keywords: [
    "online business Morocco",
    "AI agency Morocco",
    "make money online Morocco",
    "business while working 9-5",
    "Prime Minds",
    "Abdallah Khalk",
  ],
  authors: [{ name: "Abdallah Khalk" }],
  creator: "Abdallah Khalk",
  openGraph: {
    title: "Prime Minds — Build a Business While Working Your 9-to-5",
    description:
      "Failed many times. Never gave up. Join a community of serious people building real businesses.",
    url: "https://khalk.co",
    siteName: "Prime Minds",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prime Minds — Join the Path",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Minds — Build a Business While Working Your 9-to-5",
    description:
      "Community for serious people building AI businesses while working 9-to-5.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://khalk.co"),
  icons: {
    icon: [
      { url: "/images/brand/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/brand/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function EnglishOnlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${readex.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

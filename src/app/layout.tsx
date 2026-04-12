import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Prime Minds — Join the Path to Financial Freedom",
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
    title: "Prime Minds — Join the Path to Financial Freedom",
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
    title: "Prime Minds — Join the Path to Financial Freedom",
    description:
      "Community for serious people building AI businesses while working 9-to-5.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://khalk.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link rel="icon" href="/images/brand/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/images/brand/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

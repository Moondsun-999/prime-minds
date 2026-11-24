import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import TwoPathsSection from "@/components/TwoPathsSection";
import AboutSection from "@/components/AboutSection";
import CurriculumSection from "@/components/CurriculumSection";
import PricingSection from "@/components/PricingSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { getHomeCopy } from "@/content/home";
import { hasLocale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const copy = getHomeCopy(lang);

  return (
    <>
      <Navbar copy={copy.nav} locale={lang} />
      <main>
        <Hero copy={copy.hero} />
        <div className="divider divider--gradient" />
        <ProblemSection copy={copy.problem} />
        <TwoPathsSection copy={copy.paths} />
        <div className="divider divider--gradient" />
        <AboutSection copy={copy.about} />
        <CurriculumSection copy={copy.curriculum} />
        <div className="divider divider--gradient" />
        <PricingSection copy={copy.pricing} />
        <GuaranteeSection copy={copy.guarantee} />
        <div className="divider divider--gradient" />
        <FAQSection copy={copy.faq} />
        <FinalCTA copy={copy.finalCta} />
      </main>
      <Footer copy={copy.footer} />
    </>
  );
}

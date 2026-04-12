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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider divider--gradient" />
        <ProblemSection />
        <TwoPathsSection />
        <div className="divider divider--gradient" />
        <AboutSection />
        <CurriculumSection />
        <div className="divider divider--gradient" />
        <PricingSection />
        <GuaranteeSection />
        <div className="divider divider--gradient" />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

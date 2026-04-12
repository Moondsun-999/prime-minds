import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import { AnimatedFeatureCarousel } from "./ui/AnimatedFeatureCarousel";

const images = {
  alt: "Prime Minds Workflow",
  step1img1: "https://images.unsplash.com/photo-1517502474497-6a9ea1525015?q=80&w=1740&auto=format&fit=crop", 
  step1img2: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1740&auto=format&fit=crop", 
  step2img1: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1740&auto=format&fit=crop", 
  step2img2: "https://images.unsplash.com/photo-1507925922837-326f12d9348e?q=80&w=1740&auto=format&fit=crop", 
  step3img: "https://images.unsplash.com/photo-1621503373738-9cb5bc43bf08?q=80&w=1740&auto=format&fit=crop", 
  step4img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1742&auto=format&fit=crop", 
};

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem">
      <div className="section__header">
        <span className="section__eyebrow">Wach Katban Lik Familiar?</span>
        <h2 className="section__title">
          You Know Something Has to Change.
          <br />
          <span className="text-gradient">But Makat3refch Chno Exactly.</span>
        </h2>
        <p className="section__subtitle">
          If you&apos;re a 23-31 year old professional in Morocco making 10K-17K MAD,
          working a job you&apos;re tired of, and scrolling through success stories that
          feel impossible — this is for you.
        </p>
      </div>

      <AnimatedFeatureCarousel image={images} />
    </SectionWrapper>
  );
}

import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import Accordion from "./ui/Accordion";
import type { HomeCopy } from "@/content/home";

interface FAQSectionProps {
  copy: HomeCopy["faq"];
}

export default function FAQSection({ copy }: FAQSectionProps) {
  return (
    <SectionWrapper id="faq" narrow>
      <div className="section__header">
        <span className="section__eyebrow">{copy.eyebrow}</span>
        <h2 className="section__title">
          {copy.titleA} <span className="text-gradient">{copy.titleB}</span>
        </h2>
      </div>

      <Accordion items={copy.items} />
    </SectionWrapper>
  );
}

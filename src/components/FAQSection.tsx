import React from "react";
import SectionWrapper from "./ui/SectionWrapper";
import Accordion from "./ui/Accordion";

const faqs = [
  {
    title: "Ana deja khedam 9-to-5. Wach nqder n dir had shi?",
    content:
      "Oui — had shi tsaweb specifically l bnadeam li khedemin. Hta ana kan dir had shi o ana khedam khedma. L curriculum, les stratégies, o AI tools kolhom designed bach t maximize l few hours li 3endek.",
  },
  {
    title: "Jerebt ecom/trading/dropshipping o failit. Chno different hna?",
    content:
      "Hit hna mashi 3la specific business model — hna 3la building SKILLS and MINDSET li kat5edmo f any business. Ghadi tat3lem kifach t think, kifach t sell, kifach t use AI, o ghadi ykoun 3endek community kat hold-ek accountable.",
  },
  {
    title: "Wach just another course online?",
    content:
      "La. Hada community m3a weekly calls, 1:1 access (coaching tier), o bnadm real li kat build m3ak — mashi chi 7ed li \"réussit\" men 5 snin o kat bi3 recycled advice. Ana f nafs les tranchées.",
  },
  {
    title: "3lach l Pre-Launch offer free?",
    content:
      "Hit ana ghir badi. Les premiers membres kat 3awnouni n build la culture, n test l curriculum, o kat 3tiwni feedback. F l'échange, you get lifetime access free. Ghadi tweli b $152/year bientôt.",
  },
  {
    title: "O ila ma khedemch lia?",
    content:
      "Ila sevrit l 90-day plan o ma banlch résultats, ghadi nkhdem m3ak 1:1 free 60 yom zayda. Dak \"No-Excuses Execution\" Guarantee. Ana literally ma nqderch n afford bach tfalé.",
  },
  {
    title: "Ma3ndich compétences techniques. Wach n9der?",
    content:
      "Absolument. Module 5 (AI Foundations) kat bda men zéro — ma7tajch coding. Ghadi tat3lem prompting, automation, o vibe coding. Had les skills ma kanoch possible men 2 ans. Kolchi kat bda f l même point.",
  },
  {
    title: "Wach l contenu b English ola Darija?",
    content:
      "YouTube videos o community calls b Darija. L curriculum modules o written resources b English. 3endek best of both worlds.",
  },
  {
    title: "Wach n9der n récupère les flous diali?",
    content:
      "La refund. Offering refund kat 3tik easy \"out\" melli kat w9a3 lkhdem. L'objectif howa n fix la paralysie dialek, mashi n3tik escape hatch. Blaçtha, 3endek l guarantee: n5dem m3ak free ila dert l effort o ma banlch résultats.",
  },
];

export default function FAQSection() {
  return (
    <SectionWrapper id="faq" narrow>
      <div className="section__header">
        <span className="section__eyebrow">Questions?</span>
        <h2 className="section__title">
          Answers to Everything{" "}
          <span className="text-gradient">Li Kat Feker Fih.</span>
        </h2>
      </div>

      <Accordion items={faqs} />
    </SectionWrapper>
  );
}

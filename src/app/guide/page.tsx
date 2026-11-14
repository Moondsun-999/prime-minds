import type { Metadata } from "next";
import FunnelHeader from "@/components/FunnelHeader";
import Footer from "@/components/Footer";
import OptInForm from "@/components/OptInForm";
import { guide } from "@/content/pickOne";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pick One — a free workbook from Prime Minds",
  description:
    "Choose the one business that fits your job, your hours and your budget. A free one-evening workbook. No income promises.",
  alternates: { canonical: "/guide" },
};

const inside = [
  "Your three numbers: the hours, money and months you really have",
  "Six ways to start beside a job, with their honest costs and the hard part of each",
  "A scorecard and four rules that leave you with one choice",
  "Five checks to run before you pay anyone to teach you, including me",
  "What to do in your first week",
];

export default function GuideOptInPage() {
  return (
    <>
      <FunnelHeader />
      <main className={styles.main}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.copy}>
            <span className="section__eyebrow">Free workbook</span>
            <h1 className={styles.title}>
              Stop collecting ideas.{" "}
              <span className="text-gradient">{guide.title}.</span>
            </h1>
            <p className={styles.lead}>{guide.subtitle}</p>
            <a href="#get" className={`btn btn--primary ${styles.jump}`}>
              Get the workbook ↓
            </a>

            <p>
              You know people make money online. What you don&apos;t know is
              which business is worth <strong>your</strong> evenings, and every
              week another video changes the answer.
            </p>
            <p>
              This workbook makes you choose, using your own numbers. It takes
              about 45 minutes and a pen.
            </p>

            <h2 className={styles.h2}>What&apos;s inside</h2>
            <ul className={styles.list}>
              {inside.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.honest}>
              <h2 className={styles.h2}>What it won&apos;t do</h2>
              <p>
                It won&apos;t promise you an income, and it won&apos;t tell you
                there&apos;s quick money. I&apos;m 26, I work a 9-to-5 sales
                job in Morocco, and I failed at nine businesses before I
                learned to choose properly. That&apos;s what this is: the
                choosing part, written down.
              </p>
              <p className={styles.sign}>Abdallah Khalk</p>
            </div>
          </div>

          <aside id="get" className={styles.formCol}>
            <h2 className={styles.formTitle}>Get the workbook</h2>
            <OptInForm />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import FunnelHeader from "@/components/FunnelHeader";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import { optInPath } from "@/lib/links";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Prime Minds 1:1 — one business beside your job, until the first client",
  description:
    "90 days of 1:1 coaching for Moroccans with a job. We choose one business that fits your hours and budget and work on it every week until your first paying client. No income promises.",
  alternates: { canonical: "/coaching" },
};

const stuck = [
  "You have a degree and a job, and the salary doesn't match either.",
  "You've watched the videos. You may have tried a store, trading or a course. Nothing got 90 real days.",
  "Every week a new business is “the one”, and last week's is “dead”.",
  "And you don't trust anyone selling this, because most of them are selling illusions.",
];

const phases = [
  {
    when: "Weeks 1–2",
    name: "Business Fit",
    body: "We choose one business against your real hours, the money you can lose, what you already know and where you live. The others get crossed out, with reasons.",
  },
  {
    when: "Weeks 3–5",
    name: "Offer and assets",
    body: "One paragraph that says what you sell and to whom, a price, and the minimum you need to show a buyer. Nothing more.",
  },
  {
    when: "Weeks 6–12",
    name: "First-client sprint",
    body: "A weekly outreach target. I review your messages, we practise the calls, and we fix what isn't working each week.",
  },
];

const included = [
  "One 1:1 call with me every week for 12 weeks",
  "Answers on WhatsApp between calls, within one working day",
  "Help with the practical side in Morocco: registering, invoicing, getting paid",
  "The real numbers at every step, including mine",
];

const notFor = [
  "You need income this month. This takes months, and you need your salary while it does.",
  "You want a list of ideas. This is about picking one and doing the uncomfortable part: contacting buyers.",
  "You can't give it 6–8 hours a week.",
];

const faqs = [
  {
    q: "Why do you teach this instead of just doing it?",
    a: "I do both. I work a 9-to-5 sales job and I'm building an AI agency beside it. I coach a few people because choosing and selling are the parts I got wrong nine times, and they're faster to fix with someone watching.",
  },
  {
    q: "What results have your clients had?",
    a: "I coach two people right now and neither has finished their 90 days, so I have no client results to show you yet. When I do, they'll be here with their permission. If that's a reason to wait, wait.",
  },
  {
    q: "Communities cost 350 dirhams a month. Why is this 5,000?",
    a: "Because it isn't a community or a course library. It's my time, with you, every week, on your business. If you'd rather learn in a group, a community is the right choice and I'll say so on the call.",
  },
  {
    q: "Do I need money to start the business itself?",
    a: "It depends on what we pick, and your budget is one of the things we pick against. Several options need close to nothing except tools. I'll tell you the costs before you commit to one.",
  },
  {
    q: "I don't live in Casablanca. Does this work?",
    a: "Some businesses only work in big cities and some work anywhere. Where you live is part of the choice in the first two weeks.",
  },
];

export default function CoachingPage() {
  return (
    <>
      <FunnelHeader />
      <main>
        <section className={`section section--lg ${styles.hero}`}>
          <div className="container container--narrow">
            <span className="section__eyebrow">Prime Minds 1:1</span>
            <h1 className={styles.title}>
              One business beside your job.{" "}
              <span className={styles.accent}>
                Worked on every week until your first paying client.
              </span>
            </h1>
            <p className={styles.lead}>
              90 days of 1:1 coaching for Moroccans with a 9-to-5. We pick one
              business that fits your evenings and your budget, then we work
              on it together, every week. No income promises.
            </p>
            <BookCallButton />
            <p className={styles.small}>
              Free, 30 minutes. You leave with a written note of what fits you
              and what doesn&apos;t, whether or not we work together.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <h2 className={styles.h2}>If this is you</h2>
            <ul className={styles.list}>
              {stuck.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className={styles.para}>
              I was there. Since 2022 I started nine businesses beside my job
              and failed at all of them, mostly because I picked them from a
              video and not from my own hours and money. The idea was never
              the hard part. Choosing one, and then finding the first person
              to pay, was.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className={`${styles.h2} ${styles.center}`}>
              How the 90 days work
            </h2>
            <div className={styles.phases}>
              {phases.map((p) => (
                <div key={p.name} className={styles.phase}>
                  <span className={styles.when}>{p.when}</span>
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`container ${styles.two}`}>
            <div>
              <h2 className={styles.h2}>What you get</h2>
              <ul className={styles.list}>
                {included.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className={styles.terms}>
              <h2 className={styles.h2}>What it asks of you</h2>
              <dl>
                <div>
                  <dt>Price</dt>
                  <dd>5,000 MAD for the 90 days</dd>
                </div>
                <div>
                  <dt>Your time</dt>
                  <dd>6–8 hours a week, after work</dd>
                </div>
                <div>
                  <dt>You need</dt>
                  <dd>A job or steady income, a laptop, and the nerve to contact buyers</dd>
                </div>
                <div>
                  <dt>Places</dt>
                  <dd>A few at a time. I have a job too.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <h2 className={styles.h2}>Who this is not for</h2>
            <ul className={`${styles.list} ${styles.no}`}>
              {notFor.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <h2 className={styles.h2}>Questions you should ask me</h2>
            <div className={styles.faqs}>
              {faqs.map((f) => (
                <details key={f.q} className={styles.faq}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`section section--lg ${styles.final}`}>
          <div className="container container--narrow">
            <h2 className={styles.h2}>Start with the free call</h2>
            <p className={styles.para}>
              On the Business Fit Call we go through your hours, your budget
              and what you&apos;ve tried. You leave with a short written note
              of what fits and what doesn&apos;t. If coaching makes sense
              we&apos;ll talk about it. If it doesn&apos;t, I&apos;ll tell you.
            </p>
            <BookCallButton />
            <p className={styles.small}>
              Not ready to talk?{" "}
              <Link href={optInPath}>
                Do the free Pick One workbook first
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

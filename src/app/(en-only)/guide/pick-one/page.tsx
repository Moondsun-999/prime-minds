import type { Metadata } from "next";
import Link from "next/link";
import FunnelHeader from "@/components/FunnelHeader";
import Footer from "@/components/Footer";
import { guide } from "@/content/pickOne";
import { coachingPath } from "@/lib/links";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pick One — the workbook",
  description: guide.subtitle,
  robots: { index: false, follow: false },
};

export default function PickOnePage() {
  return (
    <>
      <FunnelHeader />
      <main className={styles.main}>
        <article className={`container container--narrow ${styles.article}`}>
          <header className={styles.cover}>
            <span className="section__eyebrow">Prime Minds workbook</span>
            <h1 className={styles.title}>{guide.title}</h1>
            <p className={styles.subtitle}>{guide.subtitle}</p>
            <p className={styles.meta}>
              {guide.readTime} · by Abdallah Khalk
            </p>
            <p className={styles.promise}>{guide.promise}</p>
          </header>

          <section>
            <h2>
              <span className={styles.num}>1</span> Why you&apos;re stuck
            </h2>
            {guide.why.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>

          <section>
            <h2>
              <span className={styles.num}>2</span> Your three numbers
            </h2>
            <p>Write these down before you read any further. Be honest.</p>
            <div className={styles.numbers}>
              {guide.numbers.map((n) => (
                <div key={n.label} className={styles.numberCard}>
                  <h3>{n.label}</h3>
                  <p className={styles.question}>{n.question}</p>
                  <p>{n.help}</p>
                  <div className={styles.blank} aria-hidden="true">
                    My answer:
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>
              <span className={styles.num}>3</span> Six ways to start, with
              honest costs
            </h2>
            <p>
              These are my own judgements from trying four of the six and
              watching the others closely. They are ranges, not guarantees.
              Your city, your skill and your luck will move them.
            </p>
            <div className={styles.models}>
              {guide.models.map((m) => (
                <div key={m.name} className={styles.model}>
                  <h3>
                    {m.name}
                    {m.triedByAbdallah && (
                      <span className={styles.tried}>I tried this</span>
                    )}
                  </h3>
                  <p>{m.what}</p>
                  <dl>
                    <div>
                      <dt>Hours</dt>
                      <dd>{m.hours}</dd>
                    </div>
                    <div>
                      <dt>Money to start</dt>
                      <dd>{m.money}</dd>
                    </div>
                    <div>
                      <dt>First money</dt>
                      <dd>{m.firstMoney}</dd>
                    </div>
                    <div>
                      <dt>Outside big cities?</dt>
                      <dd>{m.outsideBigCities}</dd>
                    </div>
                    <div className={styles.full}>
                      <dt>The hard part</dt>
                      <dd>{m.hardPart}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>
              <span className={styles.num}>4</span> The scorecard
            </h2>
            <p>{guide.scoreIntro}</p>
            <ol className={styles.questions}>
              {guide.scoreQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            <h3>Then apply four rules, in this order</h3>
            <ol className={styles.rules}>
              {guide.scoreRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </section>

          <section className={styles.example}>
            <h2>
              <span className={styles.num}>5</span> {guide.example.label}
            </h2>
            <p>{guide.example.person}</p>
            <ul>
              {guide.example.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>
              <span className={styles.num}>6</span> Five checks before you pay
              anyone to teach you
            </h2>
            <p>{guide.checksIntro}</p>
            <ol className={styles.checks}>
              {guide.checks.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.body}</span>
                </li>
              ))}
            </ol>
            <p className={styles.note}>{guide.checksNote}</p>
          </section>

          <section>
            <h2>
              <span className={styles.num}>7</span> Your first week
            </h2>
            <ul>
              {guide.firstWeek.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className={styles.invite}>
            <h2>{guide.invite.heading}</h2>
            {guide.invite.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link href={coachingPath} className="btn btn--primary btn--lg">
              {guide.invite.cta} →
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

import styles from "./FunnelStack.module.css";

type Kind = "ig" | "yt" | "pg" | "call" | "ok" | "wa";

interface Node {
  kind: Kind;
  title: string;
  lines: string[];
  cta?: string;
}

interface Step {
  node: Node;
  arrow?: string;
}

// Same text as the funnel diagram in the guide (English on purpose: these terms are universal).
const BANDS: { stage: string; steps: Step[]; note?: string }[] = [
  {
    stage: "AWARENESS · COLD",
    steps: [
      { node: { kind: "ig", title: "Awareness reels", lines: ["Text-led, one idea, aimed at coaches"], cta: "Follow" }, arrow: "follow" },
      { node: { kind: "yt", title: "YouTube long-form", lines: ["Trust and search. Talks to coaches, one keyword per video"], cta: "DM the word X on Instagram" }, arrow: "DM the word X" },
    ],
    note: "Followers → Stories + carousels",
  },
  {
    stage: "NURTURE",
    steps: [
      { node: { kind: "ig", title: "Information reels", lines: ["Tactical, one problem per reel"], cta: "Keyword" }, arrow: "keyword" },
      { node: { kind: "ig", title: "Keyword DM", lines: ["ManyChat sends the lead magnet and asks one question"], cta: "Their reply opens the 24h window" }, arrow: "ask permission" },
    ],
  },
  {
    stage: "CONVERSION",
    steps: [
      { node: { kind: "ig", title: "Stories + carousels", lines: ["To followers, 1 to 2 a week"], cta: "Story link · carousel keyword" }, arrow: "keyword / link" },
      { node: { kind: "pg", title: "Mini discovery / VSL", lines: ["Ask permission, then send the VSL and the sales page"], cta: "Book the call" }, arrow: "booked" },
      { node: { kind: "call", title: "Call, 30 minutes", lines: ["Questionnaire captures email + phone"], cta: "Offer stated plainly" }, arrow: "yes" },
      { node: { kind: "ok", title: "Paid start", lines: [] } },
    ],
  },
];

const ICON: Record<Kind, React.ReactNode> = {
  ig: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="url(#pb-ig)" />
      <rect x="6.5" y="6.5" width="19" height="19" rx="6" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="16" cy="16" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="22" cy="10" r="1.3" fill="#fff" />
    </svg>
  ),
  yt: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect y="5" width="32" height="22" rx="7" fill="#FF0000" />
      <path d="M13 10.5v11l9.5-5.5z" fill="#fff" />
    </svg>
  ),
  pg: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#5B35C8" />
      <path d="M12.5 9.5v13l10-6.5z" fill="#fff" />
    </svg>
  ),
  call: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#A0558F" />
      <path d="M11 8.5h4l1.6 4.2-2.1 1.4a9.5 9.5 0 0 0 4.4 4.4l1.4-2.1 4.2 1.6v4c0 1.1-.9 2-2 2C13.7 24 8 18.3 8 11.5c0-1.7 1.3-3 3-3z" fill="#fff" />
    </svg>
  ),
  ok: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#2E9E6B" />
      <path d="M9.5 16.5l4.2 4.2 8.8-9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path d="M16 6.5a9.5 9.5 0 0 0-8.2 14.3L6.5 25.5l4.8-1.3A9.5 9.5 0 1 0 16 6.5z" fill="#fff" />
    </svg>
  ),
};

function Card({ node }: { node: Node }) {
  return (
    <div className={`${styles.card} ${styles[node.kind]}`} data-reveal="">
      <div className={styles.head}>
        <span className={styles.icon}>{ICON[node.kind]}</span>
        <b>{node.title}</b>
      </div>
      {node.lines.map((l) => (
        <div key={l} className={styles.line}>
          {l}
        </div>
      ))}
      {node.cta && (
        <div className={styles.cta}>
          <span className={styles.k}>CTA </span>
          {node.cta}
        </div>
      )}
    </div>
  );
}

/** Phone version of the funnel diagram: one column, stages as bands, arrows drawn between cards. */
export function FunnelStack() {
  return (
    <div className={styles.funnel} dir="ltr">
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="pb-ig" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset=".25" stopColor="#FA7E1E" />
            <stop offset=".5" stopColor="#D62976" />
            <stop offset=".75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      </svg>
      {BANDS.map((band) => (
        <div key={band.stage} className={styles.band}>
          <div className={styles.stage}>{band.stage}</div>
          {band.steps.map((s) => (
            <div key={s.node.title}>
              <Card node={s.node} />
              {s.arrow && (
                <div className={styles.arrow} data-reveal="">
                  <span className={styles.rail} />
                  <span className={styles.label}>{s.arrow}</span>
                </div>
              )}
            </div>
          ))}
          {band.note && <div className={styles.note}>{band.note}</div>}
        </div>
      ))}
      <div className={`${styles.arrow} ${styles.side}`} data-reveal="">
        <span className={styles.rail} />
        <span className={styles.label}>VSL, not booked · no sale · not ready: stories and carousel followers who never booked</span>
      </div>
      <div className={`${styles.card} ${styles.wa}`} data-reveal="">
        <div className={styles.head}>
          <span className={styles.icon}>{ICON.wa}</span>
          <b>
            WhatsApp group
            <br />
            Magic Lantern
          </b>
        </div>
        <div className={styles.line}>3 videos, 5 to 10 min</div>
        <div className={styles.line}>80% value, soft call invite</div>
        <div className={styles.line}>Self-join link, admins post</div>
        <div className={styles.line}>Cohorts with start dates</div>
        <div className={styles.chips}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div className={styles.back}>books → Call, 30 minutes</div>
      </div>
    </div>
  );
}

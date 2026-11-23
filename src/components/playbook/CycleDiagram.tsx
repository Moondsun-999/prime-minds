import styles from "./CycleDiagram.module.css";

interface CycleDiagramProps {
  center: readonly string[];
  steps: readonly string[];
}

// Clockwise from the top; positions are % of the square. The 5th step (the quiet launch) is tinted rose.
const SPOTS = [
  { left: 50, top: 12 },
  { left: 83, top: 31 },
  { left: 83, top: 69 },
  { left: 50, top: 88 },
  { left: 17, top: 69 },
  { left: 17, top: 31 },
] as const;

/** The vicious cycle: six steps around a slowly turning dashed ring; steps pop in one after another. */
export function CycleDiagram({ center, steps }: CycleDiagramProps) {
  return (
    <div className={styles.cycle} data-reveal="zoom">
      <svg className={styles.ring} aria-hidden="true" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#E4CBD9" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
      <svg className={styles.arrows} aria-hidden="true" viewBox="0 0 100 100">
        <defs>
          <marker id="pb-cy" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#DA8690" />
          </marker>
        </defs>
        <path d="M68 17 A38 38 0 0 1 83 33" markerEnd="url(#pb-cy)" />
        <path d="M88 58 A38 38 0 0 1 80 74" markerEnd="url(#pb-cy)" />
        <path d="M62 86 A38 38 0 0 1 38 86" markerEnd="url(#pb-cy)" />
        <path d="M20 74 A38 38 0 0 1 12 58" markerEnd="url(#pb-cy)" />
        <path d="M17 33 A38 38 0 0 1 32 17" markerEnd="url(#pb-cy)" />
      </svg>
      <p className={styles.center}>
        {center.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </p>
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li
            key={s}
            className={`${styles.step} ${i === 4 ? styles.rose : ""} ${i === 0 || i === 3 ? styles.wide : ""}`}
            style={{ left: `${SPOTS[i].left}%`, top: `${SPOTS[i].top}%`, ["--i" as string]: i }}
          >
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

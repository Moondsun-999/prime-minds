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

// One short clockwise arrow in each gap between two steps (ring radius 38, centre 50,50).
const ARCS = [
  "M73.4 20.1 A38 38 0 0 1 79.1 25.6",
  "M87.6 44.7 A38 38 0 0 1 87.6 55.3",
  "M73.4 79.9 A38 38 0 0 1 66.7 84.2",
  "M33.3 84.2 A38 38 0 0 1 26.6 79.9",
  "M12.4 55.3 A38 38 0 0 1 12.4 44.7",
  "M20.9 25.6 A38 38 0 0 1 26.6 20.1",
] as const;

/** The vicious cycle: six steps around a dashed ring whose dashes flow clockwise; steps pop in one after another. */
export function CycleDiagram({ center, steps }: CycleDiagramProps) {
  return (
    <div className={styles.cycle} data-reveal="zoom">
      <svg className={styles.ring} aria-hidden="true" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#E4CBD9" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
      <svg className={styles.arrows} aria-hidden="true" viewBox="0 0 100 100">
        <defs>
          <marker id="pb-cy" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#DA8690" />
          </marker>
        </defs>
        {ARCS.map((d, i) => (
          <path key={d} d={d} className={styles.arc} markerEnd="url(#pb-cy)" style={{ ["--i" as string]: i }} />
        ))}
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

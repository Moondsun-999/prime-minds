import type { Cta } from "@/content/playbook";
import styles from "./CtaButton.module.css";

interface CtaButtonProps {
  cta: Cta;
  id?: string;
}

/** The rose call-to-action. Every one opens the opt-in pop-up through the #optin hash. */
export function CtaButton({ cta, id }: CtaButtonProps) {
  return (
    <a href="#optin" id={id} className={styles.cta}>
      <span className={styles.label}>{cta.label}</span>
      <span className={styles.sub}>{cta.sub}</span>
    </a>
  );
}

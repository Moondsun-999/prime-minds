"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./BookStack.module.css";

interface BookStackProps {
  alt: string;
}

const PAGES = [
  { src: "/images/playbook/page-step5.webp", slot: "lt" },
  { src: "/images/playbook/page-funnel.webp", slot: "lb" },
  { src: "/images/playbook/page-contents.webp", slot: "rt" },
  { src: "/images/playbook/page-step6.webp", slot: "rb" },
] as const;

/**
 * The 3D book with four real guide pages behind it: an overlapping pair on each side at mid-height.
 * On load the pages fan out from behind the book; on desktop the stack tilts toward the pointer.
 */
export function BookStack({ alt }: BookStackProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={styles.wrap} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={styles.stage} role="img" aria-label={alt}>
        <div className={styles.glow} aria-hidden="true" />
        {PAGES.map((p) => (
          <div key={p.slot} className={`${styles.page} ${styles[p.slot]}`} aria-hidden="true">
            <Image src={p.src} alt="" width={560} height={791} sizes="(max-width: 768px) 35vw, 240px" />
          </div>
        ))}
        <div className={styles.book} aria-hidden="true">
          <Image
            src="/images/playbook/book.webp"
            alt=""
            width={900}
            height={1303}
            sizes="(max-width: 768px) 50vw, 340px"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}

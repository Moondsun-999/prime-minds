"use client";

import { useEffect, useState } from "react";
import { playbook } from "@/content/playbook";
import styles from "./PlaybookEffects.module.css";

/**
 * Page-wide UX effects for /playbook, in one observer instead of one per section:
 * scroll reveals ([data-reveal]), count-ups ([data-count]), a reading-progress bar,
 * and a sticky call-to-action on phones once the hero button has scrolled away.
 */
export function PlaybookEffects() {
  const [progress, setProgress] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals ?? 0);
      if (reduced || !Number.isFinite(target)) {
        el.textContent = target.toFixed(decimals);
        return;
      }
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-shown", "");
          if (el.dataset.count) countUp(el);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    let pending = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]")];
    pending.forEach((el) => observer.observe(el));

    // A fast fling can carry an element past the viewport between two observer checks:
    // anything already above the bottom edge of the screen is revealed here instead.
    const sweep = () => {
      if (!pending.length) return;
      const limit = window.innerHeight;
      pending = pending.filter((el) => {
        if (el.hasAttribute("data-shown")) return false;
        if (el.offsetParent === null) return true;
        if (el.getBoundingClientRect().top > limit) return true;
        el.setAttribute("data-shown", "");
        if (el.dataset.count) countUp(el);
        observer.unobserve(el);
        return false;
      });
    };

    const heroCta = document.getElementById("hero-cta");
    const onScroll = () => {
      sweep();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const formOpen = window.location.hash === "#optin";
      const pastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const nearEnd = window.scrollY > max - 400;
      setShowSticky(pastHero && !nearEnd && !formOpen);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <a href="#optin" className={styles.sticky} data-visible={showSticky || undefined} tabIndex={showSticky ? 0 : -1}>
        {playbook.stickyCta}
      </a>
    </>
  );
}

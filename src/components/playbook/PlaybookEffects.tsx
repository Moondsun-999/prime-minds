"use client";

import { useEffect, useRef } from "react";
import { playbook } from "@/content/playbook";
import styles from "./PlaybookEffects.module.css";

const PHONE = "(max-width: 768px)";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/**
 * Page-wide UX effects for /playbook, in one place instead of one per section:
 * - scroll reveals ([data-reveal]) and count-ups ([data-count]);
 * - a reading-progress bar;
 * - on phones, a sticky call-to-action that flies into each page button ([data-cta]) as it
 *   comes into view (the button squishes as it "catches" it) and bubbles back up from the
 *   bottom once that button has scrolled away. Never shown while a page button is on screen.
 */
export function PlaybookEffects() {
  const barRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia(PHONE);

    /* ---------- count-up + reveals ---------- */
    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals ?? 0);
      if (reduced || !Number.isFinite(target)) {
        el.textContent = target.toFixed(decimals);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        el.textContent = (target * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const reveal = (el: HTMLElement) => {
      el.setAttribute("data-shown", "");
      if (el.dataset.count) countUp(el);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    let pending = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]")];
    pending.forEach((el) => revealObserver.observe(el));

    // A fast fling can carry an element past the viewport between two observer checks.
    const sweep = () => {
      if (!pending.length) return;
      pending = pending.filter((el) => {
        if (el.hasAttribute("data-shown")) return false;
        if (el.offsetParent === null || el.getBoundingClientRect().top > window.innerHeight) return true;
        reveal(el);
        revealObserver.unobserve(el);
        return false;
      });
    };

    /* ---------- sticky CTA that merges into page buttons ---------- */
    const sticky = stickyRef.current;
    const ctas = [...document.querySelectorAll<HTMLElement>("[data-cta]")];
    const heroCta = document.getElementById("hero-cta");
    const inView = new Set<HTMLElement>();
    // `goal` is where the bar is heading; it flips as soon as a motion starts, so scrolling
    // during a 400 ms merge or bubble never restarts it.
    let goal = false;
    let running: Animation | null = null;

    const setShown = (value: boolean) => {
      if (!sticky) return;
      sticky.toggleAttribute("data-visible", value);
      sticky.tabIndex = value ? 0 : -1;
    };

    // Fly into the button that just came into view, then hide; the button squishes as it catches it.
    const mergeInto = (target: HTMLElement | null) => {
      if (!sticky) return;
      goal = false;
      running?.cancel();
      if (reduced || !target) {
        setShown(false);
        return;
      }
      const s = sticky.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const dx = t.left + t.width / 2 - (s.left + s.width / 2);
      const dy = t.top + t.height / 2 - (s.top + s.height / 2);
      const sx = t.width / s.width;
      const sy = t.height / s.height;
      running = sticky.animate(
        [
          { transform: "none", opacity: 1, borderRadius: "12px" },
          { opacity: 1, offset: 0.6 },
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0, borderRadius: "10px" },
        ],
        { duration: 380, easing: "cubic-bezier(0.5, 0, 0.2, 1)", fill: "forwards" },
      );
      const anim = running;
      anim.onfinish = () => {
        // Hide first, then drop the held end frame, so the bar never flashes back for a frame.
        setShown(false);
        anim.cancel();
        if (running === anim) running = null;
      };
      target.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.04, 0.94)" },
          { transform: "scale(0.98, 1.03)" },
          { transform: "scale(1)" },
        ],
        { duration: 480, delay: 260, easing: "ease-out" },
      );
    };

    // Bubble back up from the bottom with a soft overshoot.
    const bubbleUp = () => {
      if (!sticky) return;
      goal = true;
      running?.cancel();
      setShown(true);
      if (reduced) return;
      running = sticky.animate(
        [
          { transform: "translateY(120%) scale(0.6)", opacity: 0 },
          { transform: "translateY(-10%) scale(1.04)", opacity: 1, offset: 0.65 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 520, easing: SPRING },
      );
      running.onfinish = () => {
        running = null;
      };
    };

    let lastEntered: HTMLElement | null = null;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const nearEnd = window.scrollY > max - 400;
      const formOpen = window.location.hash === "#optin";
      const want = phone.matches && pastHero && !nearEnd && !formOpen && inView.size === 0;
      if (want === goal) return;
      if (want) bubbleUp();
      else if (inView.size > 0 && !formOpen) mergeInto(lastEntered);
      else mergeInto(null);
    };

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            inView.add(el);
            lastEntered = el;
          } else {
            inView.delete(el);
          }
        }
        update();
      },
      // A button counts as "arrived" once it clears the bottom strip where the sticky bar sits.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    ctas.forEach((el) => ctaObserver.observe(el));

    /* ---------- scroll: progress bar, reveal sweep, sticky state ---------- */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
        sweep();
        update();
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", update);
    phone.addEventListener("change", update);
    return () => {
      revealObserver.disconnect();
      ctaObserver.disconnect();
      running?.cancel();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", update);
      phone.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className={styles.progress} aria-hidden="true" />
      <a ref={stickyRef} href="#optin" className={styles.sticky} tabIndex={-1}>
        {playbook.stickyCta}
      </a>
    </>
  );
}

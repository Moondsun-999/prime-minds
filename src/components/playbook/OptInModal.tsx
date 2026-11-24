"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { playbook } from "@/content/playbook";
import styles from "./OptInModal.module.css";

type Status = "idle" | "sending" | "done" | "error";
type Field = "name" | "whatsapp" | "email" | "paid";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{7,18}$/;

/**
 * The opt-in pop-up. Opens when the URL hash is #optin (every CTA links there), closes on
 * Escape, the × button or a click on the backdrop. Posts to /api/playbook-optin.
 */
export function OptInModal() {
  const f = playbook.form;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    if (window.location.hash === "#optin") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    const sync = () => {
      const isOpen = window.location.hash === "#optin";
      if (isOpen) lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(isOpen);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) {
      lastFocus.current?.focus?.();
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("button, input, a[href]");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      whatsapp: String(data.get("whatsapp") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      paid: String(data.get("paid") ?? ""),
      company: String(data.get("company") ?? ""),
    };
    const next: Partial<Record<Field, string>> = {};
    if (!values.name) next.name = f.errors.name;
    if (!PHONE.test(values.whatsapp)) next.whatsapp = f.errors.whatsapp;
    if (!EMAIL.test(values.email)) next.email = f.errors.email;
    if (values.paid !== "yes" && values.paid !== "no") next.paid = f.errors.paid;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/playbook-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.modal} data-open={open || undefined} aria-hidden={!open}>
      <button type="button" className={styles.backdrop} onClick={close} aria-label={f.close} tabIndex={-1} />
      <div ref={dialogRef} className={styles.card} role="dialog" aria-modal="true" aria-labelledby="pb-form-title">
        <button type="button" className={styles.x} onClick={close} aria-label={f.close}>
          ×
        </button>
        <div className={styles.book}>
          <Image src="/images/playbook/book.webp" alt="" width={900} height={1303} sizes="84px" />
        </div>
        <p className={styles.eyebrow}>{f.eyebrow}</p>
        <p id="pb-form-title" className={styles.title}>
          {status === "done" ? f.doneTitle : f.title}
        </p>

        {status === "done" ? (
          <p className={styles.done}>{f.doneText}</p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <p className={styles.sub}>{f.sub}</p>
            <label className={styles.field}>
              {f.name}
              <input ref={firstFieldRef} name="name" type="text" autoComplete="name" maxLength={80} aria-invalid={!!errors.name} />
              {errors.name && <span className={styles.err}>{errors.name}</span>}
            </label>
            <label className={styles.field}>
              {f.whatsapp}
              <input name="whatsapp" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="+212 6XX XXX XXX" maxLength={22} aria-invalid={!!errors.whatsapp} />
              {errors.whatsapp && <span className={styles.err}>{errors.whatsapp}</span>}
            </label>
            <label className={styles.field}>
              {f.email}
              <input name="email" type="email" dir="ltr" autoComplete="email" maxLength={200} aria-invalid={!!errors.email} />
              {errors.email && <span className={styles.err}>{errors.email}</span>}
            </label>
            <fieldset className={styles.q}>
              <legend>{f.question}</legend>
              <label>
                <input type="radio" name="paid" value="yes" />
                <span>{f.yes}</span>
              </label>
              <label>
                <input type="radio" name="paid" value="no" />
                <span>{f.no}</span>
              </label>
              {errors.paid && <span className={styles.err}>{errors.paid}</span>}
            </fieldset>
            <input className={styles.hp} name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.submit}
            </button>
            {status === "error" && <p className={styles.err} role="alert">{f.errors.server}</p>}
            <p className={styles.privacy}>{playbook.privacy}</p>
          </form>
        )}
      </div>
    </div>
  );
}

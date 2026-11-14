"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { guidePath } from "@/lib/links";
import styles from "./OptInForm.module.css";

type Status = "idle" | "sending" | "error";

export default function OptInForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
        }),
      });
      if (res.status === 400) {
        setStatus("error");
        setMessage("That email doesn't look right. Check it and try again.");
        return;
      }
      // Any other outcome still opens the guide: the reader shouldn't pay for our outage.
      router.push(guidePath);
    } catch {
      router.push(guidePath);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span>First name</span>
        <input name="name" type="text" autoComplete="given-name" maxLength={80} />
      </label>
      <label className={styles.field}>
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          aria-describedby="optin-note"
        />
      </label>
      <label className={styles.honeypot} aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        className="btn btn--primary btn--lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Opening…" : "Open the guide →"}
      </button>

      {message && (
        <p className={styles.error} role="alert">
          {message}
        </p>
      )}
      <p id="optin-note" className={styles.note}>
        The guide opens right away in your browser. I&apos;ll email you when I
        publish something new. No spam, and you can unsubscribe.
      </p>
    </form>
  );
}

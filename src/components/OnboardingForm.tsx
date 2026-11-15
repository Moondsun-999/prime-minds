"use client";

import { useEffect, useRef, useState } from "react";
import { onboarding as t, screens, type Field } from "@/content/onboarding";
import styles from "./OnboardingForm.module.css";

type Value = string | string[];
type Answers = Record<string, Value>;
type Status = "editing" | "sending" | "done" | "error";

interface OnboardingFormProps {
  code: string;
}

const otherKey = (id: string) => `${id}__other`;

function isAnswered(f: Field, a: Answers): boolean {
  const v = a[f.id];
  const other = a[otherKey(f.id)];
  if (Array.isArray(v) && v.length) return true;
  if (typeof v === "string" && v.trim()) return true;
  return typeof other === "string" && other.trim() !== "";
}

function answersAsText(a: Answers): string {
  const out: string[] = [];
  for (const s of screens) {
    out.push(`— ${s.title} —`);
    for (const f of s.fields) {
      if (!isAnswered(f, a)) continue;
      const v = a[f.id];
      const parts = Array.isArray(v) ? [...v] : v ? [v] : [];
      const other = a[otherKey(f.id)];
      if (typeof other === "string" && other.trim()) parts.push(other.trim());
      out.push(`${f.label}\n${parts.join("، ")}`);
    }
  }
  return out.join("\n\n");
}

export function OnboardingForm({ code }: OnboardingFormProps) {
  const storageKey = `pm-onboarding-${code}`;
  const [step, setStep] = useState(0); // 0 = welcome, 1..n = screens
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("editing");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const total = screens.length;

  // Saving starts once she has pressed "start", so an empty form never overwrites a saved draft.
  useEffect(() => {
    if (step === 0 && status !== "done") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, step, done: status === "done" }));
    } catch {
      /* storage unavailable: the form still works */
    }
  }, [answers, step, status, storageKey]);

  const go = (n: number) => {
    setErrors([]);
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Picks up a draft saved on this device, if any, then opens the form where she left off.
  const start = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as { answers?: Answers; step?: number; done?: boolean } | null;
      if (saved?.answers) setAnswers(saved.answers);
      if (saved?.done) {
        setStatus("done");
        return;
      }
      if (typeof saved?.step === "number" && saved.step > 0 && saved.step <= total) {
        go(saved.step);
        return;
      }
    } catch {
      /* no saved draft */
    }
    go(1);
  };

  const set = (id: string, v: Value) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggle = (id: string, opt: string) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return { ...a, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const screen = step > 0 ? screens[step - 1] : null;

  const check = (): boolean => {
    if (!screen) return true;
    const missing = screen.fields.filter((f) => f.required && !isAnswered(f, answers)).map((f) => f.id);
    setErrors(missing);
    if (missing.length) document.getElementById(`f-${missing[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    return missing.length === 0;
  };

  const submit = async () => {
    if (!check()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, answers, website: honeypot }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyAnswers = async () => {
    try {
      await navigator.clipboard.writeText(answersAsText(answers));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (status === "done") {
    return (
      <div ref={topRef} className={styles.card}>
        <div className={styles.doneMark} aria-hidden="true">✓</div>
        <h1 className={styles.title}>{t.doneTitle}</h1>
        <p className={styles.lead}>{t.doneBody}</p>
      </div>
    );
  }

  return (
    <div ref={topRef} className={styles.wrap}>
      {step > 0 && (
        <div className={styles.progress} aria-label={t.stepLabel(step, total)}>
          <span className={styles.stepLabel}>{t.stepLabel(step, total)}</span>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${(step / total) * 100}%` }} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div className={styles.alert} role="alert">
          <strong>{t.errorTitle}</strong>
          <p>{t.errorBody}</p>
          <div className={styles.alertActions}>
            <button type="button" className="btn btn--primary" onClick={submit}>
              {t.retry}
            </button>
            <button type="button" className="btn btn--secondary" onClick={copyAnswers}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      )}

      {!screen ? (
        <div className={styles.card}>
          <h1 className={styles.title}>{t.title}</h1>
          {t.welcome.map((p) => (
            <p key={p} className={styles.lead}>
              {p}
            </p>
          ))}
          <div className={styles.nav}>
            <button type="button" className="btn btn--primary btn--lg" onClick={start}>
              {t.start}
            </button>
          </div>
        </div>
      ) : (
        <form
          className={styles.card}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (step < total) {
              if (check()) go(step + 1);
            } else {
              void submit();
            }
          }}
        >
          <h1 className={styles.title}>{screen.title}</h1>
          {screen.intro && <p className={styles.lead}>{screen.intro}</p>}

          <div className={styles.fields}>
            {screen.fields.map((f) => (
              <FieldInput
                key={f.id}
                field={f}
                value={answers[f.id]}
                other={answers[otherKey(f.id)]}
                invalid={errors.includes(f.id)}
                onText={(v) => set(f.id, v)}
                onOther={(v) => set(otherKey(f.id), v)}
                onToggle={(opt) => toggle(f.id, opt)}
              />
            ))}
          </div>

          <input
            className={styles.hp}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <div className={styles.nav}>
            <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
              {step < total ? t.next : status === "sending" ? t.sending : t.submit}
            </button>
            <button type="button" className={styles.back} onClick={() => go(step - 1)}>
              {t.back}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

interface FieldInputProps {
  field: Field;
  value: Value | undefined;
  other: Value | undefined;
  invalid: boolean;
  onText: (v: string) => void;
  onOther: (v: string) => void;
  onToggle: (opt: string) => void;
}

function FieldInput({ field: f, value, other, invalid, onText, onOther, onToggle }: FieldInputProps) {
  const id = `f-${f.id}`;
  const hintId = f.hint ? `${id}-hint` : undefined;
  const text = typeof value === "string" ? value : "";
  const picked = Array.isArray(value) ? value : [];

  const label = (
    <span className={styles.label}>
      {f.label}
      {!f.required && <em className={styles.opt}>{t.optional}</em>}
    </span>
  );

  if (f.type === "choice" || f.type === "multi") {
    const multi = f.type === "multi";
    return (
      <fieldset id={id} className={`${styles.field} ${invalid ? styles.invalid : ""}`} aria-describedby={hintId}>
        <legend>{label}</legend>
        {f.hint && <p id={hintId} className={styles.hint}>{f.hint}</p>}
        <div className={styles.options}>
          {(f.options ?? []).map((opt) => {
            const on = multi ? picked.includes(opt) : text === opt;
            return (
              <label key={opt} className={`${styles.option} ${on ? styles.on : ""}`}>
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={f.id}
                  checked={on}
                  onChange={() => (multi ? onToggle(opt) : onText(opt))}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
        {f.other && (
          <input
            className={styles.input}
            type="text"
            placeholder={t.otherLabel}
            aria-label={`${f.label}: ${t.otherLabel}`}
            value={typeof other === "string" ? other : ""}
            onChange={(e) => onOther(e.target.value)}
          />
        )}
        {invalid && <p className={styles.error}>{t.required}</p>}
      </fieldset>
    );
  }

  return (
    <div className={`${styles.field} ${invalid ? styles.invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      {f.hint && <p id={hintId} className={styles.hint}>{f.hint}</p>}
      {f.type === "textarea" ? (
        <textarea id={id} className={styles.input} rows={4} value={text} aria-describedby={hintId} onChange={(e) => onText(e.target.value)} />
      ) : (
        <input
          id={id}
          className={styles.input}
          type={f.type === "number" ? "text" : f.type === "url" ? "url" : "text"}
          inputMode={f.type === "number" ? "numeric" : f.type === "url" ? "url" : undefined}
          dir={f.type === "url" ? "ltr" : undefined}
          placeholder={f.type === "url" ? "https://" : undefined}
          value={text}
          aria-describedby={hintId}
          onChange={(e) => onText(e.target.value)}
        />
      )}
      {invalid && <p className={styles.error}>{t.required}</p>}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { groups, onboarding as t, screens, steps, type Field } from "@/content/onboarding";
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
  const total = steps.length;
  const [step, setStep] = useState(0); // 0 = welcome, 1..total = questions
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("editing");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const stageRef = useRef<HTMLFormElement>(null);

  // Saving starts once she has pressed "start", so an empty form never overwrites a saved draft.
  useEffect(() => {
    if (step === 0 && status !== "done") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, step, done: status === "done" }));
    } catch {
      /* storage unavailable: the form still works */
    }
  }, [answers, step, status, storageKey]);

  // Puts the cursor in the first box of each new question (not on dropdowns or option lists).
  useEffect(() => {
    if (step === 0) return;
    const el = stageRef.current?.querySelector<HTMLElement>("input[type=text], input[type=url], textarea");
    el?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [step]);

  const go = (n: number) => {
    setErrors([]);
    setStep(n);
  };

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

  const current = step > 0 ? steps[step - 1] : null;

  const check = (): boolean => {
    if (!current) return true;
    const missing = current.fields.filter((f) => f.required && !isAnswered(f, answers)).map((f) => f.id);
    setErrors(missing);
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
      <div className={`${styles.stage} ${styles.center}`}>
        <div className={styles.doneMark} aria-hidden="true">✓</div>
        <h1 className={styles.question}>{t.doneTitle}</h1>
        <p className={styles.hint}>{t.doneBody}</p>
      </div>
    );
  }

  if (!current) {
    return (
      <div className={styles.stage}>
        <h1 className={styles.welcomeTitle}>{t.title}</h1>
        {t.welcome.map((p) => (
          <p key={p} className={styles.welcomeText}>
            {p}
          </p>
        ))}
        <div className={styles.actions}>
          <button type="button" className={`btn btn--primary btn--lg ${styles.ok}`} onClick={start}>
            {t.start}
          </button>
        </div>
      </div>
    );
  }

  const group = current.group ? groups[current.group] : undefined;
  const single = current.fields.length === 1 ? current.fields[0] : null;
  const isLast = step === total;

  return (
    <>
      <div className={styles.progress} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${(step / total) * 100}%` }} />
      </div>

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

      <form
        key={step}
        ref={stageRef}
        className={styles.stage}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!check()) return;
          if (isLast) void submit();
          else go(step + 1);
        }}
      >
        <p className={styles.section}>
          <span>{current.screen.title}</span>
          <span className={styles.count}>{t.stepLabel(step, total)}</span>
        </p>

        {single ? (
          <FieldInput
            field={single}
            asQuestion
            value={answers[single.id]}
            other={answers[otherKey(single.id)]}
            invalid={errors.includes(single.id)}
            onText={(v) => set(single.id, v)}
            onOther={(v) => set(otherKey(single.id), v)}
            onToggle={(opt) => toggle(single.id, opt)}
          />
        ) : (
          <>
            <h1 className={styles.question}>{group?.title}</h1>
            {group?.hint && <p className={styles.hint}>{group.hint}</p>}
            <div className={styles.groupFields}>
              {current.fields.map((f) => (
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
          </>
        )}

        <input
          className={styles.hp}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <div className={styles.actions}>
          <button type="submit" className={`btn btn--primary btn--lg ${styles.ok}`} disabled={status === "sending"}>
            {isLast ? (status === "sending" ? t.sending : t.submit) : `${t.ok} ✓`}
          </button>
          {!isLast && <span className={styles.enter}>{t.enterHint}</span>}
        </div>
      </form>

      <nav className={styles.stepper} aria-label={t.stepLabel(step, total)}>
        <button type="button" className={styles.arrow} onClick={() => go(step - 1)} aria-label={t.back}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
        </button>
        <span>{t.stepLabel(step, total)}</span>
      </nav>
    </>
  );
}

interface FieldInputProps {
  field: Field;
  asQuestion?: boolean;
  value: Value | undefined;
  other: Value | undefined;
  invalid: boolean;
  onText: (v: string) => void;
  onOther: (v: string) => void;
  onToggle: (opt: string) => void;
}

function FieldInput({ field: f, asQuestion, value, other, invalid, onText, onOther, onToggle }: FieldInputProps) {
  const id = `f-${f.id}`;
  const hintId = f.hint ? `${id}-hint` : undefined;
  const text = typeof value === "string" ? value : "";
  const picked = Array.isArray(value) ? value : [];
  const Title = asQuestion ? "h1" : "span";

  const label = (
    <Title className={asQuestion ? styles.question : styles.label}>
      {f.label}
      {!f.required && <em className={styles.opt}>{t.optional}</em>}
    </Title>
  );
  const hint = f.hint ? <p id={hintId} className={styles.hint}>{f.hint}</p> : null;
  const error = invalid ? <p className={styles.error} role="alert">{t.required}</p> : null;

  if (f.type === "multi") {
    return (
      <fieldset className={styles.field} aria-describedby={hintId}>
        <legend>{label}</legend>
        {hint ?? (asQuestion && <p className={styles.hint}>{t.pickAny}</p>)}
        <div className={styles.options}>
          {(f.options ?? []).map((opt) => {
            const on = picked.includes(opt);
            return (
              <label key={opt} className={`${styles.option} ${on ? styles.on : ""}`}>
                <input type="checkbox" name={f.id} checked={on} onChange={() => onToggle(opt)} />
                <span className={styles.box} aria-hidden="true">{on ? "✓" : ""}</span>
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
        {error}
      </fieldset>
    );
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {hint}
      {f.type === "choice" ? (
        <div className={styles.selectWrap}>
          <select id={id} className={styles.select} value={text} aria-describedby={hintId} onChange={(e) => onText(e.target.value)}>
            <option value="" disabled>
              {t.choose}
            </option>
            {(f.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ) : f.type === "textarea" ? (
        <textarea id={id} className={styles.input} rows={3} value={text} aria-describedby={hintId} onChange={(e) => onText(e.target.value)} />
      ) : (
        <input
          id={id}
          className={styles.input}
          type={f.type === "url" ? "url" : "text"}
          inputMode={f.type === "url" ? "url" : undefined}
          dir={f.type === "url" ? "ltr" : undefined}
          placeholder={f.type === "url" ? "https://" : "اكتبي جوابكِ هنا…"}
          value={text}
          aria-describedby={hintId}
          onChange={(e) => onText(e.target.value)}
        />
      )}
      {error}
    </div>
  );
}

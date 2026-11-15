// Server-side helpers for the client onboarding form: private links, answer cleaning, and the
// Markdown file the answers are saved as (clients/<slug>/intake/ in the ops repo).
import { screens, allFields } from "@/content/onboarding";

export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

const MAX_TEXT = 4000;
const OTHER_SUFFIX = "__other";

/**
 * ONBOARDING_CODES maps private link codes to client folder slugs: "code1:kawtar,code2:nachwa".
 * Codes are long random strings; the page 404s for anything not listed.
 */
export function clientForCode(code: string): string | null {
  const raw = process.env.ONBOARDING_CODES ?? "";
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(code)) return null;
  for (const pair of raw.split(",")) {
    const [c, slug] = pair.split(":").map((s) => s.trim());
    if (c && slug && c === code && /^[a-z0-9-]{1,40}$/.test(slug)) return slug;
  }
  return null;
}

/** Keeps only known fields, trims and caps text, and drops options that aren't on the list. */
export function cleanAnswers(input: unknown): Answers {
  const out: Answers = {};
  if (!input || typeof input !== "object") return out;
  const src = input as Record<string, unknown>;
  for (const f of allFields) {
    const v = src[f.id];
    if (f.type === "multi") {
      if (Array.isArray(v)) {
        const picked = v.filter((x): x is string => typeof x === "string" && (f.options ?? []).includes(x));
        if (picked.length) out[f.id] = picked;
      }
      const other = src[f.id + OTHER_SUFFIX];
      if (f.other && typeof other === "string" && other.trim()) out[f.id + OTHER_SUFFIX] = other.trim().slice(0, MAX_TEXT);
    } else if (f.type === "choice") {
      if (typeof v === "string" && (f.options ?? []).includes(v)) out[f.id] = v;
    } else if (typeof v === "string" && v.trim()) {
      out[f.id] = v.trim().slice(0, MAX_TEXT);
    } else if (typeof v === "number" && Number.isFinite(v)) {
      out[f.id] = String(v);
    }
  }
  return out;
}

/** Ids of required questions that have no answer. */
export function missingRequired(a: Answers): string[] {
  return allFields
    .filter((f) => f.required)
    .filter((f) => {
      const v = a[f.id];
      const hasOther = typeof a[f.id + OTHER_SUFFIX] === "string";
      return !(Array.isArray(v) ? v.length > 0 : Boolean(v)) && !hasOther;
    })
    .map((f) => f.id);
}

function fmt(v: AnswerValue | undefined, other?: AnswerValue): string {
  const parts: string[] = [];
  if (Array.isArray(v)) parts.push(...v);
  else if (v) parts.push(v);
  if (typeof other === "string") parts.push(`غير ذلك: ${other}`);
  if (!parts.length) return "_(no answer)_";
  const text = parts.join(Array.isArray(v) ? ", " : "\n");
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

export function toMarkdown(slug: string, a: Answers, submittedAt: string): string {
  const lines: string[] = [
    `# ${slug} — onboarding answers`,
    "",
    `- Submitted: ${submittedAt}`,
    "- Source: khalk.co onboarding form (Arabic). Questions: `specs/onboarding-form.md` (v2).",
    "- Client data: internal only, never in anything shared.",
    "",
  ];
  for (const s of screens) {
    lines.push(`## ${s.en}`, "");
    for (const f of s.fields) {
      lines.push(`**${f.en}** · ${f.label}`, "", fmt(a[f.id], a[f.id + OTHER_SUFFIX]), "");
    }
  }
  return lines.join("\n");
}

export const otherKey = (id: string) => id + OTHER_SUFFIX;

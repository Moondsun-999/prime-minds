import type { Locale } from "@/i18n/config";
import ar from "./ar";
import en from "./en";
import ma from "./ma";
import type { PlaybookCopy } from "./ar";

export type { PlaybookCopy, Rich, Cta } from "./ar";

const copy: Record<Locale, PlaybookCopy> = { ar, en, ma };

export function getPlaybookCopy(locale: Locale): PlaybookCopy {
  return copy[locale];
}

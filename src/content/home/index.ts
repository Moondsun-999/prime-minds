import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "./en";
import en from "./en";
import ar from "./ar";
import ma from "./ma";

const copy: Record<Locale, HomeCopy> = { ar, en, ma };

export function getHomeCopy(locale: Locale): HomeCopy {
  return copy[locale];
}

export type { HomeCopy };

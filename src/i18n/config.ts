export const locales = ["ar", "en", "ma"] as const;
export type Locale = (typeof locales)[number];

/** ar = Arabic script (RTL), en = English, ma = Moroccan Darija in Latin letters. */
export const defaultLocale: Locale = "ar";

export const localeCookie = "pm_lang";

export const localeMeta: Record<
  Locale,
  { htmlLang: string; dir: "rtl" | "ltr"; label: string; ogLocale: string }
> = {
  ar: { htmlLang: "ar", dir: "rtl", label: "العربية", ogLocale: "ar_MA" },
  en: { htmlLang: "en", dir: "ltr", label: "English", ogLocale: "en_US" },
  ma: { htmlLang: "ary-Latn", dir: "ltr", label: "Darija", ogLocale: "ar_MA" },
};

export function hasLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Outside Morocco: Arabic. Inside Morocco: follow the phone language.
 * Arabic -> ar, English -> en, French -> ma (Darija in Latin letters),
 * anything else -> ar.
 */
export function detectLocale(
  country: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (country?.toUpperCase() !== "MA") return "ar";

  // First listed language wins; quality values are ignored on purpose,
  // browsers list the phone's primary language first.
  const first = (acceptLanguage ?? "").split(",")[0]?.trim().toLowerCase() ?? "";
  const base = first.split(/[-;]/)[0];

  if (base === "en") return "en";
  if (base === "fr") return "ma";
  return "ar";
}

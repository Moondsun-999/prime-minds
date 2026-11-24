import { localeCookie, type Locale } from "./config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Saves the visitor's language so "/" stops auto-detecting for them. Browser only. */
export function rememberLocale(locale: Locale): void {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

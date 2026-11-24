import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, detectLocale, hasLocale, localeCookie } from "@/i18n/config";

// Runs on "/" only: picks a language and redirects to /ar, /en or /ma.
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(localeCookie)?.value;
  const locale = hasLocale(saved)
    ? saved
    : detectLocale(
        request.headers.get("x-vercel-ip-country"),
        request.headers.get("accept-language"),
      ) ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url, 307);
  // The target depends on country and language headers: never cache it.
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "id"];
const defaultLocale = "id"; // bisa diubah

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip untuk file statis / API
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Cek apakah sudah ada locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}`)
  );

  if (!pathnameHasLocale) {
    const locale = defaultLocale;

    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
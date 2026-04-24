// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let defaultLocale = "id"; // Atau "en"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah pathname root atau tidak memiliki locale
  // Regex ini memastikan kita tidak me-redirect file statis (gambar, css, dll)
  const pathnameHasLocale = pathname.startsWith('/en') || pathname.startsWith('/id');

  if (!pathnameHasLocale && pathname === "/") {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  // Jalankan middleware ini di semua route, KECUALI api, _next/static, dll
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
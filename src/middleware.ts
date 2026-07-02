import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { COOKIE_NAME, verifySessionToken } from "@/lib/cms/session-edge";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

async function handleAdminAuth(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/login") ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/uploads")
  ) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      const adminResponse = await handleAdminAuth(request);
      if (adminResponse) return adminResponse;
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|es|fr|zh|en)/:path*",
    "/((?!api|_next|_vercel|uploads|.*\\..*).*)",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

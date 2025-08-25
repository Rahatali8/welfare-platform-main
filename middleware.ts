import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public pages that don't require login
  if (pathname.startsWith("/apply-form") || pathname === "/") {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value;

  // Admin dashboard: only users with role === 'admin'
  if (pathname.startsWith("/dashboard/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const decoded = verifyJWT(token as string);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Donor dashboard: only users with role === 'donor'
  if (pathname.startsWith("/dashboard/donor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/donor/login", request.url));
    }
    const decoded = verifyJWT(token as string);
    if (!decoded || decoded.role !== "donor") {
      return NextResponse.redirect(new URL("/donor/login", request.url));
    }
    return NextResponse.next();
  }

  // Survey team dashboard: only SURVEY_OFFICER
  if (pathname.startsWith("/dashboard/survey")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const decoded = verifyJWT(token as string);
    if (!decoded || decoded.role !== "SURVEY_OFFICER") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // User dashboard: require any valid authenticated token (any role)
  if (pathname.startsWith("/dashboard/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const decoded = verifyJWT(token as string);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // For other dashboard routes and protected pages: require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const decoded = verifyJWT(token as string);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apply",
    "/apply-form",
  ],
};

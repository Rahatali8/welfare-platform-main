import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasSubmittedApplication } from "./lib/helpers";

export const runtime = "nodejs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Public pages that don't require login
  if (pathname.startsWith("/apply-form")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value;

  // Remove authentication for /dashboard/user and /dashboard/donor
  if (pathname.startsWith("/dashboard/user") || pathname.startsWith("/dashboard/donor")) {
    return NextResponse.next();
  }

  // All other dashboards still require authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Edge-safe: don't verify JWT here (jsonwebtoken not supported in middleware).
  // Rely on API route guards for role authorization.
  // Only enforce that admin dashboard requires some auth cookie.
  if (pathname.startsWith("/dashboard/admin") && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apply-form",
  ],
};

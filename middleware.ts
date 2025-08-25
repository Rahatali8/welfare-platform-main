import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

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

  // Admin dashboard requires authentication
  if (pathname.startsWith("/dashboard/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // All other dashboards still require authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
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

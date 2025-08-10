import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { hasSubmittedApplication } from "./lib/helpers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Public pages that don't require login
  if (pathname.startsWith("/apply-form")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  // Remove authentication for /dashboard/user
  if (pathname.startsWith("/dashboard/user")) {
    return NextResponse.next();
  }

  // All other dashboards still require authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { role } = decoded;

    // 🔴 ADMIN Dashboard Access Control
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 🔵 DONOR Dashboard Access Control
    if (pathname.startsWith("/dashboard/donor") && role !== "DONOR") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Invalid Token", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apply-form",
  ],
};

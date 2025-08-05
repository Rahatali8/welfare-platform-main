import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { hasSubmittedApplication } from "./lib/helpers";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Simulated DB call (Replace this with actual DB check later)
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { role, cnic } = decoded;
    const pathname = request.nextUrl.pathname;

    // 🟠 USER Dashboard Access Control
    if (pathname.startsWith("/dashboard/user")) {
      const hasApp = await hasSubmittedApplication(cnic);

      if (!hasApp) {
        return NextResponse.redirect(new URL("/apply-form", request.url));
      }
    }

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
    "/dashboard/:path*",      // All dashboard routes
  ],
};

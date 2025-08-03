import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for a dashboard route
  if (pathname.startsWith("/dashboard/")) {
    // Check for authentication token in cookies
    const token = request.cookies.get("auth-token")

    if (!token) {
      // Redirect to signup page if not authenticated
      return NextResponse.redirect(new URL("/signup", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

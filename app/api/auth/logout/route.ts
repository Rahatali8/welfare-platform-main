import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" })
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    expires: new Date(0), // Cookie expire immediately
    path: "/",
  })
  return response
}
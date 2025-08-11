import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { requestId, status } = await request.json()

    if (!requestId || !status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 })
    }

    await db.$executeRaw`UPDATE requests SET status = ${status}, updated_at = NOW() WHERE id = ${requestId}`

    return NextResponse.json({
      message: `Request ${status} successfully`,
    })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    const [requests] = await db.execute("SELECT * FROM requests WHERE user_id = ? ORDER BY submitted_at DESC", [
      decoded.userId,
    ])

    return NextResponse.json({
      requests: requests,
    })
  } catch (error) {
    console.error("Requests error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

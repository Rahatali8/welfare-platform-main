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
    const { searchParams } = new URL(request.url)
    const cnic = searchParams.get("cnic")

    if (!cnic) {
      return NextResponse.json({ message: "CNIC parameter required" }, { status: 400 })
    }

    // Users can only search their own CNIC unless they're admin/donor
    if (decoded.role === "user" && decoded.cnic !== cnic) {
      return NextResponse.json({ message: "Unauthorized to search other CNICs" }, { status: 403 })
    }

    const [requests] = await db.execute(
      "SELECT * FROM requests WHERE user_id = (SELECT id FROM users WHERE cnic = ?) ORDER BY submitted_at DESC",
      [cnic],
    )

    return NextResponse.json({
      requests: requests,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

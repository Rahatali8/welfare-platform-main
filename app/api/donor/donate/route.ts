import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    if (decoded.role !== "donor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { requestId, amount } = await request.json()

    if (!requestId || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid donation data" }, { status: 400 })
    }

    // Check if request exists and is approved
    const [requests] = await db.execute("SELECT * FROM requests WHERE id = ? AND status = 'approved'", [requestId])

    if (!Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json({ message: "Request not found or not approved" }, { status: 404 })
    }

    // Insert donation record
    await db.execute("INSERT INTO donations (donor_id, request_id, amount, donated_at) VALUES (?, ?, ?, NOW())", [
      decoded.userId,
      requestId,
      amount,
    ])

    return NextResponse.json({
      message: "Donation recorded successfully",
    })
  } catch (error) {
    console.error("Donation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

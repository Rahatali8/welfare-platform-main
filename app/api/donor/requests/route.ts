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

    // Check if user is donor
    if (decoded.role !== "donor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get approved requests only
    const [requests] = await db.execute(`
      SELECT 
        r.*,
        u.full_name,
        u.cnic,
        u.address
      FROM requests r
      JOIN users u ON r.user_id = u.id
      WHERE r.status = 'approved'
      ORDER BY r.submitted_at DESC
    `)

    const formattedRequests = (requests as any[]).map((request) => ({
      id: request.id,
      userId: request.user_id,
      type: request.type,
      reason: request.reason,
      amount: request.amount,
      status: request.status,
      submittedAt: request.submitted_at,
      currentAddress: request.current_address,
      cnicImage: request.cnic_image,
      additionalData: request.additional_data ? JSON.parse(request.additional_data) : null,
      user: {
        fullName: request.full_name,
        cnic: request.cnic,
        address: request.address,
      },
    }))

    return NextResponse.json({
      requests: formattedRequests,
    })
  } catch (error) {
    console.error("Donor requests error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

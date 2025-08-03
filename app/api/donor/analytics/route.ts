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

    if (decoded.role !== "donor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get total approved requests
    const [totalResult] = await db.execute("SELECT COUNT(*) as total FROM requests WHERE status = 'approved'")
    const totalRequests = (totalResult as any[])[0].total

    // Get approved requests count
    const [approvedResult] = await db.execute("SELECT COUNT(*) as approved FROM requests WHERE status = 'approved'")
    const approvedRequests = (approvedResult as any[])[0].approved

    // Get total amount of approved requests
    const [amountResult] = await db.execute(
      "SELECT SUM(amount) as total_amount FROM requests WHERE status = 'approved' AND amount IS NOT NULL",
    )
    const totalAmount = (amountResult as any[])[0].total_amount || 0

    // Get donor's donations
    const [donationsResult] = await db.execute(
      "SELECT COUNT(*) as my_donations, SUM(amount) as my_amount FROM donations WHERE donor_id = ?",
      [decoded.userId],
    )
    const donorStats = (donationsResult as any[])[0]
    const myDonations = donorStats.my_donations || 0
    const myDonationAmount = donorStats.my_amount || 0

    return NextResponse.json({
      analytics: {
        totalRequests,
        approvedRequests,
        totalAmount,
        myDonations,
        myDonationAmount,
      },
    })
  } catch (error) {
    console.error("Donor analytics error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

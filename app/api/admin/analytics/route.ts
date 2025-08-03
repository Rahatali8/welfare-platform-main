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

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get total requests
    const [totalResult] = await db.execute("SELECT COUNT(*) as total FROM requests")
    const totalRequests = (totalResult as any[])[0].total

    // Get pending requests
    const [pendingResult] = await db.execute("SELECT COUNT(*) as pending FROM requests WHERE status = 'pending'")
    const pendingRequests = (pendingResult as any[])[0].pending

    // Get approved requests
    const [approvedResult] = await db.execute("SELECT COUNT(*) as approved FROM requests WHERE status = 'approved'")
    const approvedRequests = (approvedResult as any[])[0].approved

    // Get rejected requests
    const [rejectedResult] = await db.execute("SELECT COUNT(*) as rejected FROM requests WHERE status = 'rejected'")
    const rejectedRequests = (rejectedResult as any[])[0].rejected

    // Get total amount
    const [amountResult] = await db.execute("SELECT SUM(amount) as total_amount FROM requests WHERE amount IS NOT NULL")
    const totalAmount = (amountResult as any[])[0].total_amount || 0

    // Get requests by type
    const [loanResult] = await db.execute("SELECT COUNT(*) as loan_count FROM requests WHERE type = 'loan'")
    const loanRequests = (loanResult as any[])[0].loan_count

    const [microfinanceResult] = await db.execute(
      "SELECT COUNT(*) as microfinance_count FROM requests WHERE type = 'microfinance'",
    )
    const microfinanceRequests = (microfinanceResult as any[])[0].microfinance_count

    const [generalResult] = await db.execute("SELECT COUNT(*) as general_count FROM requests WHERE type = 'general'")
    const generalRequests = (generalResult as any[])[0].general_count

    return NextResponse.json({
      analytics: {
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        totalAmount,
        loanRequests,
        microfinanceRequests,
        generalRequests,
      },
    })
  } catch (error) {
    console.error("Admin analytics error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

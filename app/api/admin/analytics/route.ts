import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get total requests
    const totalRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as total FROM requests`) as any[]
    const totalRequests = Number(totalRows[0]?.total ?? 0)

    // Get pending requests
    const pendingRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as pending FROM requests WHERE status = 'pending'`) as any[]
    const pendingRequests = Number(pendingRows[0]?.pending ?? 0)

    // Get approved requests
    const approvedRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as approved FROM requests WHERE status = 'approved'`) as any[]
    const approvedRequests = Number(approvedRows[0]?.approved ?? 0)

    // Get rejected requests
    const rejectedRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as rejected FROM requests WHERE status = 'rejected'`) as any[]
    const rejectedRequests = Number(rejectedRows[0]?.rejected ?? 0)

    // Get total amount from monthly_income
    const amountResult = (await db.$queryRaw<any[]>`SELECT SUM(monthly_income) as total_amount FROM requests WHERE monthly_income IS NOT NULL`) as any[]
    const totalAmount = Number(amountResult[0]?.total_amount ?? 0)

    // Get request counts by type
    const loanRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as loan_count FROM requests WHERE type = 'loan'`) as any[]
    const loanRequests = Number(loanRows[0]?.loan_count ?? 0)

    const microfinanceRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as microfinance_count FROM requests WHERE type = 'microfinance'`) as any[]
    const microfinanceRequests = Number(microfinanceRows[0]?.microfinance_count ?? 0)

    const generalRows = (await db.$queryRaw<any[]>`SELECT COUNT(*) as general_count FROM requests WHERE type = 'general'`) as any[]
    const generalRequests = Number(generalRows[0]?.general_count ?? 0)

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

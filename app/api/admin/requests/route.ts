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

    // Check if user is admin
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Use Prisma client to fetch requests that have NOT been forwarded to the survey team
    const allRequests = await db.request.findMany({
      include: { user: true, surveys: true },
      orderBy: { created_at: 'desc' },
    })

    // Exclude requests that already have a Survey entry (they've been forwarded)
    const notForwarded = allRequests.filter((r: any) => !(r.surveys && r.surveys.length > 0))

    const formattedRequests = notForwarded.map((r: any) => ({
      id: r.id,
      userId: r.user_id,
      type: r.type,
      reason: r.reason ?? "",
      status: (r.status ?? '').toString().toLowerCase(),
      submittedAt: r.created_at,
      currentAddress: r.user?.address ?? r.user_address ?? "",
      amount: r.monthly_income ?? null,
      cnicImage: r.cnic_front ?? null,

      created_at: r.created_at,
      updated_at: r.updated_at,
      rejection_reason: r.rejection_reason ?? null,

      user: {
        fullName: r.full_name ?? r.user?.name ?? '',
        cnic: r.user?.cnic ?? r.cnic_number ?? '',
        address: r.user?.address ?? '',
      },

      additionalData: {
        description: r.description ?? null,
        father_name: r.father_name ?? null,
        marital_status: r.marital_status ?? null,
        family_count: r.family_count ?? null,
        adult_member: r.adult_member ?? null,
        matric_member: r.matric_member ?? null,
        home_rent: r.home_rent ?? null,
        fridge: r.fridge ?? null,
        monthly_income: r.monthly_income ?? null,
        repayment_time: r.repayment_time ?? null,
        cnic_number: r.cnic_number ?? null,
        cnic_front: r.cnic_front ?? null,
        cnic_back: r.cnic_back ?? null,
        document: r.document ?? null,
        user_email: r.user?.email ?? null,
        user_phone: r.user?.phone ?? null,
        user_name: r.user?.name ?? null,
      },
    }))

    return NextResponse.json({ requests: formattedRequests })
  } catch (error) {
    console.error("Admin requests error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

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

    const requests = (await db.$queryRaw<any[]>`
      SELECT 
        r.id,
        r.user_id,
        r.type,
        r.description,
        r.reason,
        r.status,
        r.created_at,
        r.updated_at,
        r.rejection_reason,
        r.full_name,
        r.father_name,
        r.cnic_number,
        r.marital_status,
        r.family_count,
        r.adult_member,
        r.matric_member,
        r.home_rent,
        r.fridge,
        r.monthly_income,
        r.repayment_time,
        r.cnic_front,
        r.cnic_back,
        r.document,
        u.name AS user_name,
        u.cnic AS user_cnic,
        u.address AS user_address,
        u.email AS user_email,
        u.phone AS user_phone
      FROM requests r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `) as any[]

    const formattedRequests = (requests as any[]).map((r) => ({
      // Frontend-expected fields
      id: r.id,
      userId: r.user_id,
      type: r.type,
      reason: r.reason ?? "",
      status: (r.status ?? '').toString().toLowerCase(),
      submittedAt: r.created_at,
      currentAddress: r.user_address ?? "",
      amount: r.monthly_income ?? null,
      cnicImage: r.cnic_front ?? null,

      // Preserve originals for detail view
      created_at: r.created_at,
      updated_at: r.updated_at,
      rejection_reason: r.rejection_reason ?? null,

      // Nested user object for UI
      user: {
        fullName: r.full_name ?? r.user_name ?? '',
        cnic: r.user_cnic ?? r.cnic_number ?? '',
        address: r.user_address ?? '',
      },

      // Group all extra fields for View Details
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
        user_email: r.user_email ?? null,
        user_phone: r.user_phone ?? null,
        user_name: r.user_name ?? null,
      },
    }))

    return NextResponse.json({
      requests: formattedRequests,
    })
  } catch (error) {
    console.error("Admin requests error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

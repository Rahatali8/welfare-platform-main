import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: Request) {
  try {
    const cookieHeader = (request as any).headers.get("cookie") || ""
    const authToken = cookieHeader
      .split("; ")
      .map((c: string) => c.split("="))
      .find(([k]: string[]) => k === "auth-token" || k === "token")?.[1]

    if (!authToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const decoded = jwt.verify(authToken, JWT_SECRET) as any
    if (!decoded || decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    const requests = await db.request.findMany({
      include: { user: true },
      orderBy: { created_at: "desc" },
    })

    const grouped: Record<string, any[]> = {}
    for (const r of requests) {
      let type = (r.type || "other").toLowerCase()
      // Map 'aid' to 'medical' section as requested
      if (type === "aid") type = "medical"
      if (!grouped[type]) grouped[type] = []
      grouped[type].push({
        id: r.id,
        type: r.type,
        status: (r.status ?? '').toLowerCase(),
        reason: r.reason,
        updated_at: r.updated_at,
        rejection_reason: r.rejection_reason,
        description: r.description,
        createdAt: r.created_at,
        full_name: r.full_name,
        father_name: r.father_name,
        cnic_number: r.cnic_number,
        marital_status: r.marital_status,
        family_count: r.family_count,
        adult_member: r.adult_member,
        matric_member: r.matric_member,
        home_rent: r.home_rent,
        fridge: r.fridge,
        monthly_income: r.monthly_income,
        repayment_time: r.repayment_time,
        cnic_front: r.cnic_front,
        cnic_back: r.cnic_back,
        document: r.document,
        user: {
          id: r.user_id,
          fullName: r.user?.name ?? "",
          cnic: r.user?.cnic ?? "",
          phone: r.user?.phone ?? "",
          email: r.user?.email ?? "",
          address: r.user?.address ?? "",
        },
      })
    }

    return NextResponse.json({ requests: grouped })
  } catch (error) {
    console.error("Admin sections error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}



import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// List donors (admin only)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    const donors = await prisma.donors.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        cnic: true,
        contact_number: true,
        organization_name: true,
        status: true,
        created_at: true,
      },
    })

    return NextResponse.json({ donors })
  } catch (error) {
    console.error("Admin donors list error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update donor status (approve/reject)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== "admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    const { donorId, status } = await request.json()
    if (!donorId || !["ACTIVE", "PENDING", "REJECTED"].includes(status)) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 })
    }

    await prisma.donors.update({ where: { id: donorId }, data: { status } })
    return NextResponse.json({ message: "Donor status updated" })
  } catch (error) {
    console.error("Admin donors update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}



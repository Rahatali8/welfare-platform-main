import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// List users (admin only)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (!decoded || !["admin", "ADMIN"].includes(decoded.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const users = await db.user.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        cnic: true,
        phone: true,
        address: true,
        city: true,
        role: true,
        created_at: true,
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Admin users list error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Reset a user's password (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value || request.cookies.get("token")?.value
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (!decoded || !["admin", "ADMIN"].includes(decoded.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { userId, email, newPassword } = await request.json()
    if (!newPassword || (!userId && !email)) {
      return NextResponse.json({ message: "userId or email and newPassword are required" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(newPassword, 10)

    const where = userId ? { id: Number(userId) } : { email: String(email) }
    const updated = await db.user.update({ where, data: { password: hashed } })

    return NextResponse.json({ message: "Password updated", userId: updated.id })
  } catch (error) {
    console.error("Admin user password reset error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}



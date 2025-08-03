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

    const [users] = await db.execute(
      "SELECT id, name AS full_name, cnic, address, role FROM users WHERE id = ?",
      [decoded.userId]
    )

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const user = users[0] as any

    return NextResponse.json({
      user: {
        id: user.id,
        cnic: user.cnic,
        fullName: user.full_name,
        address: user.address,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
}

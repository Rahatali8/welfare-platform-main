import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { cnic, password } = await request.json()

    if (!cnic || !password) {
      return NextResponse.json({ message: "CNIC and password are required" }, { status: 400 })
    }

    const rawCnic = cnic.replace(/\D/g, "")

    const [users] = await db.execute(
      "SELECT id, cnic, name AS full_name, address, password, role FROM users WHERE cnic = ?",
      [rawCnic]
    )

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0] as any

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // ✅ Create JWT Token with userId, cnic, and role
    const token = jwt.sign(
      {
        userId: user.id,
        cnic: user.cnic,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    // ✅ Send token in cookie named 'auth-token'
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        cnic: user.cnic,
        fullName: user.full_name,
        address: user.address,
        role: user.role,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

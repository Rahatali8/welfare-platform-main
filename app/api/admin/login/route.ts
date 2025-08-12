import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Read from `admins` table - only select existing columns per schema
    const rows = (await db.$queryRaw<any[]>`
      SELECT id, name, email, cnic, password, created_at
      FROM admins
      WHERE email = ${email}
      LIMIT 1
    `) as any[]

    const admin = rows[0]
    if (!admin) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    const isMatch = await bcrypt.compare(password, admin.password as string)
    if (!isMatch) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    const token = jwt.sign({ id: admin.id, role: "admin", email: admin.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })

    const response = NextResponse.json({ message: "Login successful", admin: { id: admin.id, name: admin.name } })
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}



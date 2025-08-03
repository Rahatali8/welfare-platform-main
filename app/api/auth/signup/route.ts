import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, cnic, phone, address, city, password, role = "user" } = body

    // Basic validation
    if (!name || !email || !cnic || !phone || !address || !city || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const rawCnic = cnic.replace(/\D/g, "")

    // Check if user already exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE cnic = ? OR email = ?",
      [rawCnic, email]
    )

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert user
    await db.execute(
      "INSERT INTO users (name, email, cnic, phone, address, city, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, rawCnic, phone, address, city, hashedPassword, role]
    )

    return NextResponse.json({ message: "Signup successful" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

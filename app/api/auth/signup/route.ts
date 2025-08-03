import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📦 Signup body received:", body);

    // 🔧 Remove dashes from CNIC
    const sanitizedCNIC = body.cnic.replace(/-/g, "");

    const {
      name,
      email,
      phone,
      address,
      city,
      password,
      role = "user",
    } = body;

    const cnic = sanitizedCNIC;

    if (!name || !email || !cnic || !phone || !address || !city || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!/^\d{13}$/.test(cnic)) {
      return NextResponse.json({ message: "Invalid CNIC format. Must be 13 digits." }, { status: 400 });
    }

    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE cnic = ? OR email = ?",
      [cnic, email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.execute(
      `INSERT INTO users (name, email, cnic, phone, address, city, password, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, cnic, phone, address, city, hashedPassword, role]
    );

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

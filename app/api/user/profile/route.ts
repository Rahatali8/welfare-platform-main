
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    // Cookie se token lena
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Token verify karna
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // User ka data fetch karna
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        cnic: true,
        phone: true,
        address: true,
        city: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

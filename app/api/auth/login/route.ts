import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cnic, password } = body;

    // ✅ Clean input CNIC for query
    const cleanInputCnic = (cnic ?? "").replace(/-/g, "");

    // Find user by CNIC
    const user = await prisma.user.findUnique({
      where: { cnic: cleanInputCnic },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 401 });
    }

    // ✅ Clean CNIC for JWT
    const cleanCnic = (user.cnic ?? "").replace(/-/g, "");

    // Sign JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, cnic: cleanCnic },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Store token in cookie with same name everywhere
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // ✅ Return user in `{ user: ... }` format (suggestion 1)
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

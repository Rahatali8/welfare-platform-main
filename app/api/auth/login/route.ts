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

    // Find user by CNIC
    const user = await prisma.user.findUnique({
      where: { cnic },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid CNIC or password' }, { status: 401 });
    }

    // Sign JWT token
    const token = jwt.sign(
      {
        id: user.id,
        cnic: user.cnic,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store in cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

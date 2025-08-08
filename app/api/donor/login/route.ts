import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  const { cnic, password } = await req.json();

  const user = await db.user.findUnique({ where: { cnic } });

  if (!user || user.role !== 'DONOR') {
    return NextResponse.json({ error: 'Invalid CNIC or role' }, { status: 400 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      cnic: user.cnic,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return NextResponse.json({ message: 'Login successful' });
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const { requestId, amount } = await req.json();
    if (!requestId || !amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    // Mark request as accepted (approved) and create a donation
    await prisma.request.update({
      where: { id: requestId },
      data: { status: 'approved' },
    });
    await prisma.donation.create({
      data: {
        userId: decoded.id,
        amount: Number(amount),
      },
    });
    return NextResponse.json({ message: 'Request accepted and donation recorded' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

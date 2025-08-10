import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ donor: null }, { status: 200 });
    }
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    // Fetch donor info
    const donor = await prisma.donors.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        cnic: true,
        contact_number: true,
        organization_name: true,
        created_at: true,
      },
    });
    if (!donor) {
      return NextResponse.json({ donor: null }, { status: 200 });
    }
    // Total donated
    const totalDonated = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { userId: decoded.id },
    });
    // Accepted requests
    const acceptedRequests = await prisma.request.count({
      where: { user_id: decoded.id, status: 'approved' },
    });
    // Total requests
    const totalRequests = await prisma.request.count({
      where: { user_id: decoded.id },
    });
    return NextResponse.json({
      donor: {
        ...donor,
        totalDonated: totalDonated._sum.amount || 0,
        acceptedRequests,
        totalRequests,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ donor: null }, { status: 200 });
  }
}

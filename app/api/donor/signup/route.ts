import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
  const body = await req.json();
  const { name, organization_name, contact_number, email, cnic, password, confirmPassword, securityQuestion, securityAnswer } = body;

    // Check for required fields
    if (!name || !email || !cnic || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Confirm password check
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    // Check if CNIC or email already exists
    const existingDonor = await prisma.donors.findFirst({
      where: {
        OR: [{ email }, { cnic }]
      }
    });

    if (existingDonor) {
      return NextResponse.json({ error: 'Email or CNIC already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDonor = await prisma.donors.create({
      data: {
        name,
        organization_name,
        contact_number,
        email,
        cnic,
        password: hashedPassword,
        securityQuestion,
        securityAnswer,
        // Default to PENDING; admin must approve to activate
        status: 'PENDING',
      }
    });

    return NextResponse.json({ message: 'Donor registered successfully', donor: newDonor });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

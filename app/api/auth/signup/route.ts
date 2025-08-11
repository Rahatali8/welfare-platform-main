// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      cnic,
      role,
      address,
      city,
      phone,
    } = body;

    const cleanedCnic = cnic.replace(/-/g, ''); // remove dashes

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all fields
    // Prevent public signup from creating admin users
    if (role === 'admin') {
      return NextResponse.json({ error: 'Admin signup not allowed' }, { status: 403 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cnic: cleanedCnic,
        role: role === 'donor' ? 'donor' : 'user',
        address,
        city,
        phone,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

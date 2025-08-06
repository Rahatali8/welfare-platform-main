import { NextRequest, NextResponse } from 'next/server';
import { parseForm } from '@/lib/parseForm';
import { db } from '@/lib/db'; // ✅ Tumhara mysql2 connection
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // ✅ Token check
    const token = req.cookies.get('auth-token')?.value;
    if (!token)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const userId = decoded?.user?.id;
    if (!userId)
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });

    // ✅ Form parse karo using formidable
    const parsedRequest = req as unknown as { body: IncomingMessage };
    const { fields, files } = await parseForm(parsedRequest.body);

    // ✅ Saare fields
    const {
      fullName,
      fatherName,
      cnicNumber,
      maritalStatus,
      familyCount,
      adultMember,
      matricMember,
      homeRent,
      fridge,
      monthlyIncome,
      phone_number, // ✅ New field
      type,
      description,
      reason,
      repayment_time,
    } = fields;

    const cnicFront = files.cnic_front?.[0]?.newFilename || '';
    const cnicBack = files.cnic_back?.[0]?.newFilename || '';
    const document = files.document?.[0]?.newFilename || '';

    // ✅ Query
    await db.execute(
      `INSERT INTO requests 
        (user_id, full_name, father_name, cnic_number, marital_status, family_count, adult_member, matric_member, home_rent, fridge, monthly_income, phone_number, type, description, reason, repayment_time, cnic_front, cnic_back, document, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        userId,
        fullName,
        fatherName,
        cnicNumber,
        maritalStatus,
        familyCount,
        adultMember,
        matricMember,
        homeRent,
        fridge,
        monthlyIncome,
        phone_number,
        type,
        description,
        reason || '',
        repayment_time || '',
        cnicFront,
        cnicBack,
        document,
      ]
    );

    return NextResponse.json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

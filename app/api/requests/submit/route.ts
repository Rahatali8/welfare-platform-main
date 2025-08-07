// app/api/requests/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
// import { parseForm } from '@/lib/parseForm';
import { db } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import { verifyJWT } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = verifyJWT(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // const { fields, files } = await parseForm(req);
    const formData = await req.formData();

    const fullName = formData.get('full_name') as string;
    const fatherName = formData.get('father_name') as string;
    const cnicNumber = formData.get('cnic_number') as string;
    const maritalStatus = formData.get('marital_status') as string;
    const familyCount = formData.get('family_count') as string;
    const adultMember = formData.get('adult_member') as string;
    const matricMember = formData.get('matric_member') as string;
    const homeRent = formData.get('home_rent') as string;
    const fridge = formData.get('fridge') as string;
    const monthlyIncome = formData.get('monthly_income') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const reason = formData.get('reason') as string | null;
    const repayment_time = formData.get('repayment_time') as string | null;

    const cnicFront = formData.get('cnic_front') as File;
    const cnicBack = formData.get('cnic_back') as File | null;
    const document = formData.get('document') as File | null;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    const saveFile = async (file: File | null) => {
      if (!file) return null;
      const data = await file.arrayBuffer();
      const buffer = Buffer.from(data);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      return `/uploads/${fileName}`;
    };

    const cnicFrontPath = await saveFile(cnicFront);
    const cnicBackPath = await saveFile(cnicBack);
    const documentPath = await saveFile(document);



    const request = await db.request.create({
      data: {
        user_id: decoded.id, // ✅ fixed here
        full_name: fullName,
        father_name: fatherName,
        cnic_number: cnicNumber,
        marital_status: maritalStatus,
        family_count: parseInt(familyCount),
         adult_member: parseInt(adultMember as string),
        matric_member: parseInt(matricMember || '0'),
        home_rent: homeRent,   // ✅ string -> boolean
        fridge: fridge,
        monthly_income: parseFloat(monthlyIncome),
        type,
        description,
        reason: reason || null,
        repayment_time: repayment_time || null,
        cnic_front: cnicFrontPath,
        cnic_back: cnicBackPath,
        document: documentPath,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

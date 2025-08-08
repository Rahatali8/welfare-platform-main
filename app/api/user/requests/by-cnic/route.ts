import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { cnic } = await req.json();

  if (!cnic) {
    return NextResponse.json({ error: 'CNIC is required' }, { status: 400 });
  }

  try {
    const requests = await db.request.findMany({
      where: {
        cnic_number: cnic,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

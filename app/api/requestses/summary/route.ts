// app/api/requests/summary/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const total = await db.request.count();
    const approved = await db.request.count({ where: { status: 'APPROVED' } });
    const pending = await db.request.count({ where: { status: 'PENDING' } });

    return NextResponse.json({ total, approved, pending });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Summary fetch failed' }, { status: 500 });
  }
}

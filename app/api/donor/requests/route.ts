import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get all requests, grouped by type
    const requests = await prisma.request.findMany({
      include: {
        user: true,
      },
      orderBy: { created_at: 'desc' },
    });

    // Group requests by type
    const grouped: Record<string, typeof requests> = {};
    for (const req of requests) {
      const type = req.type || 'other';
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(req);
    }

    return NextResponse.json({ requests: grouped });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

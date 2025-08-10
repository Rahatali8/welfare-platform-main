import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  // Total requests
  const total = await prisma.request.count();

  // Weekly breakdown (last 6 weeks)
  const now = new Date();
  const weeks = Array.from({ length: 6 }).map((_, i) => {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() - i * 7);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }).reverse();

  const weekly = await Promise.all(
    weeks.map(async ({ start, end }) => {
      const count = await prisma.request.count({
        where: {
          created_at: {
            gte: start,
            lt: end,
          },
        },
      });
      return {
        week: `${start.getMonth() + 1}/${start.getDate()}`,
        count,
      };
    })
  );

  // By type breakdown
  const byTypeRaw = await prisma.request.groupBy({
    by: ['type'],
    _count: { type: true },
  });
  const byType = byTypeRaw.map((t) => ({ name: t.type, count: t._count.type }));

  // Latest requests (last 12)
  const latest = await prisma.request.findMany({
    orderBy: { created_at: 'desc' },
    take: 12,
    select: {
      id: true,
      full_name: true,
      type: true,
      status: true,
      created_at: true,
  monthly_income: true,
      user: {
        select: {
          address: true,
        }
      },
    },
  });

  return NextResponse.json({ total, weekly, byType, latest });
}

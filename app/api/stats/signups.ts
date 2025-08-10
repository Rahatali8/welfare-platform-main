import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getWeekStart(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // Sunday as week start
  return d;
}

export const dynamic = "force-dynamic";

export async function GET() {
  // Total users
  const total = await prisma.user.count();

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
      const count = await prisma.user.count({
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

  return NextResponse.json({ total, weekly });
}

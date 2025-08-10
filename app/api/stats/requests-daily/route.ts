import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  // Last 14 days
  const days = 14;
  const now = new Date();
  // Day-wise total requests
  const daily = await Promise.all(
    Array.from({ length: days }).map(async (_, i) => {
      const day = new Date(now);
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (days - 1 - i));
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const count = await prisma.request.count({
        where: {
          created_at: {
            gte: day,
            lt: nextDay,
          },
        },
      });
      return {
        date: day.toISOString().slice(0, 10),
        count,
      };
    })
  );

  // Day-wise request type distribution
  const allTypes = await prisma.request.findMany({ select: { type: true }, distinct: ['type'] });
  const types = allTypes.map(t => t.type);
  const dailyByType = await Promise.all(
    Array.from({ length: days }).map(async (_, i) => {
      const day = new Date(now);
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (days - 1 - i));
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      // For each type, count requests for this day
      const counts = await Promise.all(
        types.map(async (type) => {
          const count = await prisma.request.count({
            where: {
              created_at: { gte: day, lt: nextDay },
              type,
            },
          });
          return { type, count };
        })
      );
      return {
        date: day.toISOString().slice(0, 10),
        types: counts,
      };
    })
  );

  return NextResponse.json({ daily, dailyByType, types });
}

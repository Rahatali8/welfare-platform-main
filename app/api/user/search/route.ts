// app/api/user/search/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cnic = searchParams.get("cnic");

  if (!cnic) {
    return NextResponse.json({ error: "CNIC is required" }, { status: 400 });
  }

  try {
    const requests = await db.request.findMany({
      where: { cnic_number: cnic },
      orderBy: { created_at: "desc" },
    });

    if (requests.length === 0) {
      return NextResponse.json({ message: "No requests found" }, { status: 404 });
    }

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

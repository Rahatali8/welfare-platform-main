import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth.success || !auth.user || auth.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { applicationId, officerId } = await request.json()
    if (!applicationId) return NextResponse.json({ error: "Missing applicationId" }, { status: 400 })

    // Create survey record; officerId may be omitted for unassigned surveys
    const surveyData: any = {
      applicationId: Number(applicationId),
      status: 'Pending',
    }
    if (officerId) surveyData.officerId = Number(officerId)

    const survey = await db.survey.create({
      data: surveyData,
      include: { application: true },
    })

    // mark request verification as not complete yet (use raw SQL to avoid typing mismatch)
    await db.$executeRaw`UPDATE requests SET verification_complete = false WHERE id = ${Number(applicationId)}`

    return NextResponse.json({ success: true, survey })
  } catch (error) {
    console.error('Error assigning survey:', error)
    return NextResponse.json({ error: 'Failed to assign survey' }, { status: 500 })
  }
}

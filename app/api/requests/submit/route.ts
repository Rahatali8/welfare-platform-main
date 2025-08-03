import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const formData = await request.formData()

    const type = formData.get("type") as string
    const currentAddress = formData.get("currentAddress") as string
    const reason = formData.get("reason") as string
    const cnicImage = formData.get("cnicImage") as File

    let additionalData = {}
    let amount = null

    // Handle different request types
    if (type === "loan") {
      additionalData = {
        loanAmount: formData.get("loanAmount"),
        loanPurpose: formData.get("loanPurpose"),
        monthlyIncome: formData.get("monthlyIncome"),
        occupation: formData.get("occupation"),
        loanDuration: formData.get("loanDuration"),
      }
      amount = Number.parseFloat(formData.get("loanAmount") as string)
    } else if (type === "microfinance") {
      additionalData = {
        helpType: formData.get("helpType"),
        urgencyLevel: formData.get("urgencyLevel"),
        dependents: formData.get("dependents"),
        monthlyIncome: formData.get("monthlyIncome"),
      }
      amount = Number.parseFloat(formData.get("amount") as string)
    } else if (type === "general") {
      additionalData = {
        helpCategory: formData.get("helpCategory"),
        urgency: formData.get("urgency"),
      }
      amount = Number.parseFloat(formData.get("amount") as string)
    }

    // Handle file upload
    let cnicImagePath = null
    if (cnicImage && cnicImage.size > 0) {
      const bytes = await cnicImage.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "public", "uploads")
      await mkdir(uploadsDir, { recursive: true })

      // Generate unique filename
      const filename = `${decoded.userId}_${Date.now()}_${cnicImage.name}`
      const filepath = path.join(uploadsDir, filename)

      await writeFile(filepath, buffer)
      cnicImagePath = `/uploads/${filename}`
    }

    // Insert request into database
    const [result] = await db.execute(
      `INSERT INTO requests 
       (user_id, type, reason, amount, status, current_address, cnic_image, additional_data, submitted_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [decoded.userId, type, reason, amount, "pending", currentAddress, cnicImagePath, JSON.stringify(additionalData)],
    )

    return NextResponse.json({
      message: "Request submitted successfully",
      requestId: (result as any).insertId,
    })
  } catch (error) {
    console.error("Submit request error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

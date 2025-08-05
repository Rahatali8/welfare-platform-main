import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import { Readable } from "stream";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const uploadDir = path.join(process.cwd(), "public", "uploads");

// ✅ Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create upload directory:", err);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Parse multipart/form-data using formidable
async function parseFormData(req: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  await ensureUploadDir();
  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });
  const buffer = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));
  return new Promise((resolve, reject) => {
    form.parse(stream as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// ✅ Save file to /public/uploads and return filename
async function saveFile(file: any) {
  if (!file) return null;
  const fileObj = Array.isArray(file) ? file[0] : file;
  const data = await readFile(fileObj.filepath);
  const originalName = fileObj.originalFilename || "uploaded";
  const filename = `${Date.now()}-${originalName}`;
  const targetPath = path.join(uploadDir, filename);
  await writeFile(targetPath, data);
  return filename;
}

// ✅ POST handler
export async function POST(req: NextRequest) {
  try {
    // 🧠 Authenticate user via JWT cookie
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decoded as any).id;

    // 🧠 Parse form
    const { fields, files } = await parseFormData(req);

    const cnicFront = await saveFile(files.cnicFront);
    const cnicBack = await saveFile(files.cnicBack);
    const document = await saveFile(files.document);

    // 🧠 Normalize fields
    const getValue = (val: any) => Array.isArray(val) ? val[0] : val;

    const fullName = getValue(fields.fullName);
    const fatherName = getValue(fields.fatherName);
    const cnicNumber = getValue(fields.cnicNumber);
    const maritalStatus = getValue(fields.maritalStatus);
    const familyCount = Number(getValue(fields.familyCount));
    const adultMember = Number(getValue(fields.adultMember));
    const matricMember = Number(getValue(fields.matricMember));
    const homeRent = getValue(fields.homeRent) === "yes" ? 1 : 0;
    const fridge = getValue(fields.fridge) === "yes" ? 1 : 0;
    const monthlyIncome = Number(getValue(fields.monthlyIncome));
    const type = getValue(fields.type);
    const description = getValue(fields.description);
    const reason = getValue(fields.reason) || null;
    const repaymentTime = getValue(fields.repaymentTime) || null;

    // ✅ Save to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
    });

    await connection.execute(
      `INSERT INTO requests (
        user_id, type, description, status, created_at,
        full_name, father_name, cnic_number, marital_status,
        family_count, adult_member, matric_member,
        home_rent, fridge, monthly_income,
        cnic_front, cnic_back, document,
        reason, repayment_time
      ) VALUES (?, ?, ?, 'PENDING', NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, type, description,
        fullName, fatherName, cnicNumber, maritalStatus,
        familyCount, adultMember, matricMember,
        homeRent, fridge, monthlyIncome,
        cnicFront, cnicBack, document,
        reason, repaymentTime,
      ]
    );

    await connection.end();

    return NextResponse.json({ success: true, message: "Request submitted successfully." });
  } catch (error) {
    console.error("🚨 Error submitting request:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

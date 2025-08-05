import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface DecodedToken {
  id: number;
  role: string;
  cnic: string;
}

// 🔐 Token verify karne wala function
export function verifyToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (e) {
    return null;
  }
}

// 👤 User ko token se find karne wala function
export async function getUserFromToken(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [decoded.id]);

  return (rows as any[])[0] || null;
}

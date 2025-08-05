import { db } from "@/lib/db";

export async function hasSubmittedApplication(cnic: string): Promise<boolean> {
  try {
    const [results] = await db.execute(
      "SELECT id FROM requests WHERE cnic = ? LIMIT 1",
      [cnic]
    );

    return Array.isArray(results) && results.length > 0;
  } catch (error) {
    console.error("DB error in hasSubmittedApplication:", error);
    return false;
  }
}

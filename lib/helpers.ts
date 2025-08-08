import { db } from "./db";

export async function hasSubmittedApplication(cnic: string): Promise<boolean> {
  try {
    const request = await db.request.findFirst({
      where: {
        cnic_number: cnic,
      },
    });

    return !!request;
  } catch (error) {
    console.error("Error checking application:", error);
    return false;
  }
}

import formidable from "formidable"
import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db" // your db connection utility

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const uploadDir = path.join(process.cwd(), "public/uploads")
  fs.mkdirSync(uploadDir, { recursive: true })

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parsing error" })

    const { name, cnic, amount, reason } = fields

    const cnicFront = files.cnicFront?.[0]?.newFilename || null
    const cnicBack = files.cnicBack?.[0]?.newFilename || null
    const document = files.document?.[0]?.newFilename || null

    try {
      await db.query(
        "INSERT INTO requests (name, cnic, amount, reason, cnic_front, cnic_back, document) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, cnic, amount, reason, cnicFront, cnicBack, document]
      )
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: "Database error" })
    }
  })
}

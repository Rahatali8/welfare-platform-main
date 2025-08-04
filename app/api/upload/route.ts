import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: { formData: () => any; }) {
  const formData = await req.formData();

  const file = formData.get('file');
  const fileName = `${Date.now()}_${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const filePath = path.join(process.cwd(), 'public/uploads', fileName);
  await writeFile(filePath, buffer);

  return NextResponse.json({ success: true, path: `/uploads/${fileName}` });
}

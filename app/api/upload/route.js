// app/api/upload/route.js
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file) {
    return NextResponse.json({ message: 'No image provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error('Error writing file:', err);
    return NextResponse.json({ message: 'Failed to save image' }, { status: 500 });
  }
}

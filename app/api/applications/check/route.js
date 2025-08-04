import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const animalId = searchParams.get('animalId');
  const userEmail = searchParams.get('userEmail');

  if (!animalId || !userEmail) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const existing = await db.collection('applications').findOne({
      animalId,
      email: userEmail,
    });

    return NextResponse.json({ exists: !!existing });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}

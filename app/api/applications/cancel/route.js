import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const body = await req.json();
  const { animalId, userEmail } = body;

  if (!animalId || !userEmail) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    await db.collection('applications').deleteOne({ animalId, email: userEmail });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to cancel' }, { status: 500 });
  }
}

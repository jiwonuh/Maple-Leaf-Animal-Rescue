import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const animal = await db.collection('animals').findOne({ _id: new ObjectId(id) });

    if (!animal) {
      return NextResponse.json({ message: 'Animal not found' }, { status: 404 });
    }

    return NextResponse.json(animal);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch animal' }, { status: 500 });
  }
}

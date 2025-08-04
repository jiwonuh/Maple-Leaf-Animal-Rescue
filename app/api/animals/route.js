import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const animals = await db.collection('animals').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(animals);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Error fetching animals' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newAnimal = {
      ...body,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();
    await db.collection('animals').insertOne(newAnimal);

    return NextResponse.json({ message: 'Animal added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Error adding animal' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }

    const body = await request.json();

    if ('_id' in body) {
      delete body._id;
    }

    await db.collection('animals').updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return NextResponse.json({ message: 'Animal updated successfully' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ message: 'Error updating animal' }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: 'Missing id' }, { status: 400 });
    }

    const result = await db.collection('animals').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No animal found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Error deleting animal' }, { status: 500 });
  }
}

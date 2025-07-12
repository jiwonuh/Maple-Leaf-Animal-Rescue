import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name } = req.body;
  if (!email || !name) return res.status(400).json({ message: 'Missing fields' });

  const client = await clientPromise;
  const db = client.db('nextauth');

  await db.collection('users').updateOne({ email }, { $set: { name } });

  res.status(200).json({ message: 'Profile updated' });
}

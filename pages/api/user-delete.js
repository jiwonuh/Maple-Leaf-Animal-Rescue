import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Missing email' });

  const client = await clientPromise;
  const db = client.db('nextauth');

  await db.collection('users').deleteOne({ email });

  res.status(200).json({ message: 'Account deleted' });
}

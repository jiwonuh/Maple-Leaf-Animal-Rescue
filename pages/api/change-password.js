import { hash, compare } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const client = await clientPromise;
  const db = client.db('nextauth');
  const user = await db.collection('users').findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await compare(currentPassword, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });

  const hashedNewPassword = await hash(newPassword, 10);
  await db.collection('users').updateOne(
    { email },
    { $set: { password: hashedNewPassword } }
  );

  res.status(200).json({ message: 'Password updated successfully' });
}

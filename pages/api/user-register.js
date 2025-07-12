import { hash } from 'bcryptjs';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password } = req.body;

   if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const client = await clientPromise;
  const db = client.db('nextauth');

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await hash(password, 10);

  await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
    role: 'user'
  });

  res.status(201).json({ message: 'User registered' });
}

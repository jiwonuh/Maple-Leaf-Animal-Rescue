import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const applications = await client
        .db()
        .collection('applications')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      res.status(200).json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch applications' });
    }
  } else if (req.method === 'POST') {
    try {
      const { animalId, name, email, phone, message } = req.body;

      const client = await clientPromise;
      const db = client.db();

      const application = {
        animalId,
        name,
        email,
        phone,
        message,
        createdAt: new Date(),
      };

      await db.collection('applications').insertOne(application);

      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

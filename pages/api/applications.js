import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

if (req.method === 'GET') {
  try {
    const applications = await db
      .collection('applications')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const enriched = await Promise.all(
      applications.map(async (app) => {
        let animalName = app.animalId;
        let breed = '-';

        try {
          const animal = await db.collection('animals').findOne({
            _id: new ObjectId(app.animalId)
          });

          if (animal) {
            animalName = animal.name || app.animalId;
            breed = animal.breed || '-';
          }
        } catch (e) {
          console.warn('Failed to find animal:', e);
        }

        return {
          ...app,
          animalName,
          breed,
        };
      })
    );

    res.status(200).json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
}



  else if (req.method === 'POST') {
    try {
      const { animalId, name, email, phone, message } = req.body;

      const animal = await db.collection('animals').findOne({ _id: new ObjectId(animalId) });

      const application = {
          animalId,
          animalName: animal?.name || 'Unknown',
          breed: animal?.breed,
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
  }

  else if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      if (!id) return res.status(400).json({ message: 'Missing ID' });

      await db.collection('applications').deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: 'Application deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete application' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

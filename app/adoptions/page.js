'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdoptionsPage() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const uploadImage = async (file) => {
  const form = new FormData();
  form.append('image', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) throw new Error('Image upload failed');
  const data = await res.json();
  return data.url;
};

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch('/api/animals');
        const data = await res.json();
        setAnimals(data);
      } catch (err) {
        console.error('Failed to fetch animals', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const filteredAnimals = animals.filter(animal => {
    if (filter === 'all') return true;
    return animal.species === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Adoptable Pets</h1>

      <div className="flex justify-center gap-4 mb-6">
        {['all', 'cat', 'dog'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded ${
              filter === type ? 'bg-[#932421] text-white' : 'bg-gray-200'
            }`}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAnimals.map((pet) => (
            <div
              key={pet._id}
              className="flex flex-col h-full border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <Image
                src={pet.image}
                alt={pet.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h3 className="text-xl font-semibold">{pet.name}</h3>
                  <p className="text-gray-600">{pet.breed}</p>
                  <p className="text-sm text-gray-500 mt-2">{pet.description}</p>
                </div>
                <Link href={`/adoptions/${pet._id}`}>
                  <button className="mt-4 w-full bg-[#932421] text-white py-2 rounded hover:opacity-90 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AnimalDetailPage({ params }) {
  const { id } = params;
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`/api/animals/${id}`);
        if (!res.ok) throw new Error('Animal not found');
        const data = await res.json();
        setAnimal(data);
      } catch (err) {
        console.error(err);
        router.push('/adoptions');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id, router]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!animal) return <div className="text-center mt-20">Animal not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={animal.image}
          alt={animal.name}
          width={500}
          height={400}
          className="rounded shadow-md object-cover w-full md:w-1/2"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-3xl font-bold mb-2">{animal.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{animal.breed}</p>
            <p className="mb-4">{animal.description}</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Age:</strong> {animal.age || 'Unknown'}</li>
              <li><strong>Temperament:</strong> {animal.temperament || 'Not specified'}</li>
              <li><strong>Health:</strong> {animal.health || 'Unknown'}</li>
              <li><strong>Status:</strong> {animal.available ? 'Available for adoption' : 'Already adopted'}</li>
            </ul>
          </div>
          <Link href={animal.available ? `/adoptions/${animal._id}/apply` : '#'}>
            <button
              disabled={!animal.available}
              className={`mt-6 w-full py-3 px-6 rounded text-white font-semibold transition ${
                animal.available ? 'bg-[#932421] hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {animal.available ? 'Apply to Adopt' : 'Not Available'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

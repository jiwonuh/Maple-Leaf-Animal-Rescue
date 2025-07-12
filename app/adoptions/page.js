'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cats, dogs } from '../data/animalData';

export default function AdoptionsPage() {
  const [filter, setFilter] = useState('all');

    const combinedAnimals = [...cats, ...dogs].sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, ''));
    const numB = parseInt(b.id.replace(/\D/g, ''));
    return numA - numB;
  });

    const filteredAnimals =
    filter === 'cat' ? cats :
    filter === 'dog' ? dogs :
    combinedAnimals;
    
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Adoptable Pets</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-[#932421] text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('cat')}
          className={`px-4 py-2 rounded ${filter === 'cat' ? 'bg-[#932421] text-white' : 'bg-gray-200'}`}
        >
          Cats
        </button>
        <button
          onClick={() => setFilter('dog')}
          className={`px-4 py-2 rounded ${filter === 'dog' ? 'bg-[#932421] text-white' : 'bg-gray-200'}`}
        >
          Dogs
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAnimals.map((pet) => (
          <Link key={pet.id} href={`/adoptions/${pet.id}`} className="block border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            <Image
              src={pet.image}
              alt={pet.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{pet.name}</h3>
              <p className="text-gray-600">{pet.breed}</p>
              <p className="text-sm text-gray-500 mt-2">{pet.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

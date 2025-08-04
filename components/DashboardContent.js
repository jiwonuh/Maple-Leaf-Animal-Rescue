"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';

export default function DashboardContent() {
  const { data: session } = useSession();
  const [recentAnimals, setRecentAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch('/api/animals');
        const data = await res.json();
        setRecentAnimals(data.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch animals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <FaPaw className="text-[#932421]" />
        Welcome, {session?.user?.name || 'Guest'}
      </h1>
      <p className="mb-8 text-gray-600">
        Here’s what’s new at the shelter:
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4">
            {recentAnimals.map((animal) => (
              <div
                key={animal._id}
                className="min-w-[220px] max-w-[250px] bg-white border rounded-lg shadow hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={animal.image}
                  alt={animal.name}
                  width={250}
                  height={160}
                  className="rounded-t-lg object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{animal.name}</h3>
                  <p className="text-sm text-gray-500">{animal.breed}</p>
                  <Link
                    href={`/adoptions/${animal._id}`}
                    className="text-red-700 text-sm underline mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <p className="text-gray-700 leading-relaxed">
          We’re a volunteer-run animal rescue in Calgary. Our mission is to connect loving families with pets in need.
        </p>
      </div>
      <div className="mt-10 mb-6 text-center">
        <Image
          src="/animal-rescue.png"
          alt="Animal rescue icon"
          width={80}
          height={80}
          className="inline-block"
        />
        <p className="text-gray-500 text-20 mt-2">
          Thank you for being a part of this journey!
        </p>
      </div>
    </div>
  );
}

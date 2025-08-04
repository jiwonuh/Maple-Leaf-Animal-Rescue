'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AnimalDetailPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const isAdmin = searchParams.get('admin') === 'true';

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`/api/animals/${id}`);
        if (!res.ok) throw new Error('Animal not found');
        const data = await res.json();
        setAnimal(data);
      } catch {
        router.push('/adoptions');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  useEffect(() => {
    const checkAlreadyApplied = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(`/api/applications/check?animalId=${id}&userEmail=${session.user.email}`);
        const data = await res.json();
        setAlreadyApplied(data.exists);
      } catch (err) {
        console.error('Failed to check application status', err);
      }
    };

    checkAlreadyApplied();
  }, [id, session]);

  const handleCancel = async () => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch(`/api/applications/cancel`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animalId: id,
          userEmail: session.user.email,
        }),
      });

      if (!res.ok) throw new Error('Cancel failed');
      setAlreadyApplied(false);
    } catch (err) {
      console.error('Failed to cancel adoption request', err);
    }
  };

  if (loading || !animal) return <div className="text-center mt-20">Loading...</div>;

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

          {!isAdmin && (
            alreadyApplied ? (
              <div className="mt-6 text-center">
                <div className="py-3 px-6 rounded bg-yellow-100 text-yellow-800 font-semibold mb-3">
                  Adoption request pending
                </div>
                <button
                    onClick={handleCancel}
                    className="text-red-600 hover:underline mt-2 text-sm"
                  >
                    Cancel Request
                </button>
              </div>
            ) : (
              <Link href={`/adoptions/${animal._id}/apply`}>
                <button
                  disabled={!animal.available}
                  className={`mt-6 w-full py-3 px-6 rounded text-white font-semibold transition ${
                    animal.available ? 'bg-[#932421] hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {animal.available ? 'Apply to Adopt' : 'Not Available'}
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

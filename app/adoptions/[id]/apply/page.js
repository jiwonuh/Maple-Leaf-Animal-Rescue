'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ApplyPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { data: session } = useSession();

  const [animal, setAnimal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

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
      }
    };

    fetchAnimal();
  }, [id, router]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          animalId: animal._id.toString(),
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      localStorage.setItem('applied_' + animal._id, 'true');

      router.push('/thank-you');
    } catch {
      alert('Failed to submit application');
    }
  };

  if (!animal) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#932421]">
        Apply to Adopt {animal.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={animal.image}
          alt={animal.name}
          width={400}
          height={300}
          className="rounded object-cover w-full md:w-1/2"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div>
            <label className="block font-medium text-sm mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={!animal.available}
            className={`mt-4 py-2 px-6 rounded text-white font-semibold transition ${
              animal.available ? 'bg-[#932421] hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {animal.available ? 'Submit Application' : 'Not Available for Adoption'}
          </button>
        </form>
      </div>
    </div>
  );
}

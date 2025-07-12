'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdoptionForm({ params }) {
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        animalId: id,
        name,
        email,
        phone,
        message,
      }),
    });

    if (res.ok) {
      router.push('/thank-you');
    } else {
      alert('Failed to submit application');
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please log in to apply for adoption.</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Adoption Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-sm text-gray-600 mb-1">Your Name</label>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
        />
        </div>

        <div>
        <label className="block text-sm text-gray-600 mb-1">Your Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
        />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="e.g. 403-123-4567"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Tell us why you're interested in adopting"
          />
        </div>
        <button
          type="submit"
          className="bg-[#932421] text-white px-5 py-2 rounded hover:opacity-90 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

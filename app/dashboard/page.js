'use client';

import { useSession } from 'next-auth/react';
import DashboardContent from '@/components/DashboardContent';
import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return (
    <div className="w-full px-4 py-10">
      {session ? (
        <DashboardContent />
      ) : (
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-bold text-center text-[#932421] mb-2">Welcome</h2>
            <p className="text-sm text-center text-gray-600">
              Please sign in to discover adorable pets and enjoy everything our shelter has to offer.
            </p>
            <LoginForm />
          </div>
          <div className="relative bg-[#fdf6f6] p-6 rounded shadow-md h-full">
            <Image
              src="/picture1.jpg"
              alt="Shelter welcoming"
              width={600}
              height={400}
              className="rounded-lg shadow mb-4"
            />
            <h2 className="text-xl font-bold text-[#932421] mb-2">Maple Leaf Animal Shelter</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              At Maple Leaf Animal Shelter, we are committed to connecting abandoned and rescued cats and dogs with loving forever homes.
              Our mission is rooted in compassion, care, and community. Join us in giving every pet a second chance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

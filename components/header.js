'use client';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import Image from 'next/image';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 mb-6 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={200} height={40} /> {/* logo color #932421 */}
        </div>
        <nav className="flex items-center gap-6 text-[#932421] font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/adoptions" className="hover:underline">Adoptions</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-[#932421] text-white text-sm px-3 py-1 rounded hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

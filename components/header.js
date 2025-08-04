'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/dashboard'); 
  };

  return (
    <header className="bg-white shadow-md py-4 mb-6 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link href={session?.user?.role === 'admin' ? "/admin-dashboard" : "/dashboard"}>
          <Image src="/logo.png" alt="Logo" width={200} height={40} />
        </Link>

        <nav className="flex items-center gap-6 text-[#932421] font-medium">
          <Link href={session?.user?.role === 'admin' ? "/admin-dashboard" : "/dashboard"} className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/adoptions" className="hover:underline">Adoptions</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>

        {session ? (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center gap-1 text-sm text-gray-600 hover:underline">
              <FaUserCircle className="w-5 h-5 text-[#932421]" /> Your Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#932421] text-white text-sm px-3 py-1 rounded hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

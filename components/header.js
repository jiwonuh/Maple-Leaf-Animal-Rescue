'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;
  if (!session) return null;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 mb-6 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={200} height={40} />
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-[#932421] font-medium">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/adoptions" className="hover:underline">Adoptions</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{session.user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-[#932421] text-white text-sm px-3 py-1 rounded hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

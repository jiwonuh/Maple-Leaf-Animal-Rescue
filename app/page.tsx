'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; 
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [session, status, router]);

  return null; 
}

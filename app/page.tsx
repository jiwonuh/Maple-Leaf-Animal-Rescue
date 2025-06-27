'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return null;
}

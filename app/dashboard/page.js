'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';


export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);



  return (
    <div className="mt-8 space-y-4">
      <div className="text-xl font-bold">
        Welcome!
      </div>

    </div>
  );
}
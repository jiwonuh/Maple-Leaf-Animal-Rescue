'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/login');
  }, [session, status, router]);

  return (
    <div className="mt-8 space-y-4">
      <div className="text-xl font-bold">
        Welcome{session?.user?.name ? `, ${session.user.name}` : ''}!
      </div>
    </div>
  );
}

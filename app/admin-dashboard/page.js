'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ApplicationList from './applications/page';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;
  if (!session || session.user.role !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ApplicationList />
    </div>
  );
}

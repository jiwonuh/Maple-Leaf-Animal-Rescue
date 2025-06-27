'use client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';

export default function AdminDashboardPage() {

    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    return (
        <div className="mt-8 space-y-4">
            <div className="mt-8 text-2xl font-bold">
                Welcome to the Admin Dashboard!
            </div>
            <button
                onClick={handleLogout}
                className="text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
            </div>
    );
}

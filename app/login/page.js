'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const snap = await getDoc(doc(firestore, 'users', user.uid));
      const role = snap.data()?.role;

      if (role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-20 w-auto mb-2" />
          <p className="mt-1 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#932421] focus:border-[#932421] focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#932421] focus:border-[#932421] focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#932421] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#932421]"
            >
              Login
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don&#39;t have an account?{' '}
          <a href="/signup" className="text-[#932421] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

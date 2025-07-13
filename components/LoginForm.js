'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res.ok) {
      const s = await (await fetch('/api/auth/session')).json();
      if (s?.user?.role === 'admin') router.push('/admin-dashboard');
      else router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow">
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#932421]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#932421]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#932421] text-white font-semibold rounded hover:opacity-90 transition"
        >
          Login
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>

      <p className="text-sm text-center text-gray-500">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-[#932421] underline">
          Sign up
        </a>
      </p>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/user-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      setSuccess('Signup successful! One moment please...');
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="px-4 py-16 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-[#932421] mb-2">Create your account</h1>
      <p className="text-gray-600 mb-6">Join our community and start your journey with us!</p>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#932421]"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#932421]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#932421]"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#932421] text-white font-semibold rounded hover:opacity-90 transition"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </form>

      <p className="text-sm mt-6">
        Already have an account?{' '}
        <a href="/dashboard" className="text-red-700 underline">Login</a>
      </p>
    </div>
  );
}

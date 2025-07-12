'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/user-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.user.email, name }),
    });

    if (!res.ok) {
      setError('Failed to update profile');
      return;
    }

    setSuccess('Profile updated!\n Please log in again to see the changes.');
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;

    const res = await fetch('/api/user-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.user.email }),
    });

    if (res.ok) {
      await signOut({ redirect: false });
      router.push('/signup');
    } else {
      setError('Failed to delete account');
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please log in to view this page.</p>;

 return (
  <div className="max-w-2xl mx-auto mt-12 bg-white shadow p-8 rounded-md">
    <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
    <form onSubmit={handleUpdate} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={session.user.email}
          readOnly
          className="w-full px-4 py-2 border bg-gray-100 text-gray-700 rounded"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button className="bg-[#932421] text-white px-5 py-2 rounded hover:opacity-90 transition" type="submit">
        Update Profile
      </button>
    </form>

      <hr className="my-6" />
<h3 className="text-xl font-semibold mb-2">Change Password</h3>
<form
  onSubmit={async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
        }

    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session.user.email,
        currentPassword,
        newPassword
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Failed to change password');
    } else {
        setSuccess('Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        }
  }}
  className="space-y-4 mt-4"
>
    <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
    />
    <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
    />
    <input
    type="password"
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-4 py-2 border rounded"
    />
    <button type="submit" className="bg-[#932421] text-white px-5 py-2 rounded hover:opacity-90 transition">
        Change Password
    </button>
    </form>

        {success && (
      <div className="mt-6 px-4 py-3 bg-green-100 border border-green-400 text-green-800 text-sm rounded-md text-center whitespace-pre-line">
        {success}
      </div>
    )}
    {error && (
      <div className="mt-6 px-4 py-3 bg-red-100 border border-red-400 text-red-800 text-sm rounded-md text-center">
        {error}
      </div>
    )}

    <hr className="my-6" />
    <div className="text-center">
      <button onClick={handleDelete} className="text-sm text-red-600 hover:underline">
        Delete My Account
      </button>
    </div>
  </div>
)
}

'use client';
import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error loading applications');
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this application?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/applications?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch {
      alert('Error deleting application');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#932421]">Adoption Applications</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 && !loading ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Pet Name</th>
                <th className="px-4 py-2 border">Breed</th>
                <th className="px-4 py-2 border">Applicant Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Submitted</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id || idx} className="text-sm">
                  <td className="px-4 py-2 border">{app.animalName || app.animalId}</td>
                  <td className="px-4 py-2 border">{app.animalSpecies || '-'}</td>
                  <td className="px-4 py-2 border">{app.name}</td>
                  <td className="px-4 py-2 border">{app.email}</td>
                  <td className="px-4 py-2 border">{app.phone}</td>
                  <td className="px-4 py-2 border">{app.message}</td>
                  <td className="px-4 py-2 border text-xs text-gray-500">{new Date(app.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
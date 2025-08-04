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

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#932421]">Adoption Applications</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 && !loading ? (
        <p className="text-gray-600">No applications found.</p>
      ) : (
        <div className="grid gap-6">
          {applications.map((app, idx) => (
            <div key={app._id || idx} className="bg-white p-6 border rounded shadow-sm">
              <p><strong>Name:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Animal ID:</strong> {app.animalId}</p>
              <p><strong>Message:</strong> {app.message}</p>
              <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(app.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

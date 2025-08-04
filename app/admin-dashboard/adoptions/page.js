'use client';

import { useEffect, useState } from 'react';

export default function AdminAdoptionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    species: '',
    image: '',
    description: '',
    age: '',
    temperament: '',
    health: '',
    available: true,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [animals, setAnimals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await fetch('/api/animals');
      const data = await res.json();
      setAnimals(data);
    } catch (err) {
      console.error('Failed to fetch animals:', err);
    }
  };

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) throw new Error('Image upload failed');
    const data = await res.json();
    return data.url;
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          setFormData((prev) => ({ ...prev, image: imageUrl }));
        } catch {
          alert('Failed to upload image');
        }
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (
        !formData.name.trim() ||
        !formData.breed.trim() ||
        !formData.species.trim() ||
        !formData.image.trim() ||
        !formData.description.trim() ||
        !formData.age.trim() ||
        !formData.temperament.trim() ||
        !formData.health.trim()
    ) {
        setError('All fields are required.');
        return;
    }

    const url = editingId ? `/api/animals?id=${editingId}` : '/api/animals';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(editingId ? 'Animal updated successfully.' : 'Animal added successfully.');
        setFormData({
          name: '',
          breed: '',
          species: '',
          image: '',
          description: '',
          age: '',
          temperament: '',
          health: '',
          available: true,
        });
        setEditingId(null);
        fetchAnimals();
      } else {
        setError(data.message || 'Error saving animal.');
      }
    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save animal.');
    }
  };

  const handleEdit = (animal) => {
    const { ...rest } = animal;
    setFormData(rest);
    setEditingId(animal._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this animal?')) return;
    const res = await fetch(`/api/animals?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Animal deleted.');
      fetchAnimals();
    } else {
      setError('Failed to delete animal.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-[#932421]">Manage Animals</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <label>
          <span className="block text-sm font-medium mb-1">Name</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border px-3 py-2 w-full" />
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Breed</span>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} className="border px-3 py-2 w-full" />
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Species</span>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="border px-3 py-2 w-full"
          >
            <option value="">Select Species</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border px-3 py-2 w-full resize-y"
          />
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Age</span>
          <input type="text" name="age" value={formData.age} onChange={handleChange} className="border px-3 py-2 w-full" />
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Temperament</span>
          <input type="text" name="temperament" value={formData.temperament} onChange={handleChange} className="border px-3 py-2 w-full" />
        </label>
        <label>
          <span className="block text-sm font-medium mb-1">Health Info</span>
          <input type="text" name="health" value={formData.health} onChange={handleChange} className="border px-3 py-2 w-full" />
        </label>

        <label className="block">
          <span className="block text-sm font-medium mb-1">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="upload-image"
          />
          <label htmlFor="upload-image" className="inline-block bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
            Select Image
          </label>
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-32 h-32 mt-2 object-cover border"
            />
          )}
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
          Available for adoption
        </label>

        <button type="submit" className="bg-[#932421] text-white py-2 px-4 rounded hover:opacity-90">
          {editingId ? 'Update Animal' : 'Add Animal'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Current Animals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animals.map((a) => (
          <div
            key={a._id}
            className="flex flex-col border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img
              src={a.image}
              alt={a.name}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
              }}
            />
            <div className="flex flex-col justify-between flex-grow p-4">
              <div>
                <h3 className="text-xl font-semibold">{a.name}</h3>
                <p className="text-gray-600">{a.breed}</p>
                <p className="text-sm text-gray-500 mt-2">{a.description}</p>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(a._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

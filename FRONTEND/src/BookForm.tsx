import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Book {
  id?: string;
  title: string;
  author: string;
  imageUrl: string;
  TahunTerbit: string;
  deskripsi: string;
}

const BookForm: React.FC = () => {
  const [book, setBook] = useState<Book>({
    title: '',
    author: '',
    imageUrl: '',
    TahunTerbit: '',
    deskripsi: '',
  });
  const [error, setError] = useState<string | null>(null); // State untuk menyimpan pesan error
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9999/books/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch book details');
          }
          return response.json();
        })
        .then(data => {
          setBook({
            title: data.title,
            author: data.author,
            imageUrl: data.imageUrl,
            TahunTerbit: data.TahunTerbit,
            deskripsi: data.deskripsi,
          });
        })
        .catch(err => {
          setError(err.message);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const response = id
        ? await fetch(`http://localhost:9999/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
          })
        : await fetch('http://localhost:9999/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
          });

      if (!response.ok) {
        throw new Error('Failed to save book');
      }

      navigate('/');
    } catch (err: any) { // `any` digunakan di sini untuk penanganan error
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      {error && <div className="bg-red-200 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Judul</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Penulis</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL Gambar</label>
          <input
            type="text"
            name="imageUrl"
            value={book.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Publikasi</label>
          <input
            type="date"
            name="TahunTerbit"
            value={book.TahunTerbit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={book.deskripsi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {id ? 'Update Buku' : 'Tambah Buku'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;

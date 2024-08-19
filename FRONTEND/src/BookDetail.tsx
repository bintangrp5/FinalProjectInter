import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Book {
  title: string;
  author: string;
  TahunTerbit: string;
  deskripsi: string;
  imageUrl: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9999/books/${id}`)
      .then(response => {
        console.log("Response status:", response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data received: ", data); // Logging data received
        setBook(data.data);
      })
      .catch(err => {
        console.error("Fetch error: ", err); // Logging error
        setError('Terjadi kesalahan dalam memuat data.');
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6 text-center mt-8">
      <img src={book.imageUrl} alt={book.title} className="w-60 h-50 object-cover mx-auto mb-10 rounded-md" />
      <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
      <p className="text-gray-600">Oleh {book.author}</p>
      <p className="text-gray-600">Terbit {book.TahunTerbit}</p>
      <p className="mt-4">{book.deskripsi}</p>
    </div>
  );
};

export default BookDetail;

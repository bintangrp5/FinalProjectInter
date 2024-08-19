import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

const LandingPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:9999/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data.data);
      } catch (error) {
        setError('Failed to fetch books. Please try again later.');
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9999/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      setError('Failed to delete book. Please try again later.');
      console.error('There was a problem with the delete operation:', error);
    }
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-yellow-600 p-4 flex justify-between items-center">
        <div className="text-white text-3xl font-bold">Koleksi Buku</div>
        <div>
          <Link to="/add-book">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800">Tambah Buku</button>
          </Link>
        </div>
      </nav>

      {/* Konten Utama */}
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Daftar Buku</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map(book => (
            <div key={book.id} className="block border rounded-lg overflow-hidden">
              <Link to={`/books/${book.id}`} className="block">
                <div className="relative w-full h-64">
                  <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-4 h-36 flex flex-col justify-between">
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-gray-600 text-sm">oleh {book.author}</p>
                </div>
              </Link>
              <div className="p-4 flex flex-col items-center space-y-2">
                <Link to={`/books/${book.id}`} className="w-full">
                  <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Detail</button>
                </Link>
                <div className="flex w-full justify-between">
                  <Link to={`/edit-book/${book.id}`} className="w-1/2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded w-full mr-1">Edit</button>
                  </Link>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded w-1/2 ml-1"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   imageUrl: string;
// }

// const LandingPage: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch('http://localhost:9999/books');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setBooks(data.data);
//       } catch (error) {
//         setError('Failed to fetch books. Please try again later.');
//         console.error('There was a problem with the fetch operation:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const deleteBook = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:9999/books/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete the book');
//       }
//       setBooks(books.filter(book => book.id !== id));
//     } catch (error) {
//       setError('Failed to delete book. Please try again later.');
//       console.error('There was a problem with the delete operation:', error);
//     }
//   };

//   if (error) {
//     return <div className="container mx-auto p-4 text-red-500">{error}</div>;
//   }

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="bg-yellow-600 p-4 flex justify-between items-center">
//         <div className="text-white text-3xl font-bold">Koleksi Buku</div>
//         <div>
//           <Link to="/add-book">
//             <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800">Tambah Buku</button>
//           </Link>
//         </div>
//       </nav>

//       {/* Konten Utama */}
//       <div className="container mx-auto p-4">
//         <h1 className="text-4xl font-bold text-center mb-8">Daftar Buku</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {books.map(book => (
//             <div key={book.id} className="block border rounded-lg overflow-hidden shadow-lg w-64">
//               <Link to={`/books/${book.id}`} className="block">
//                 <div className="relative w-full h-64">
//                   <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover"/>
//                 </div>
//                 <div className="p-4 h-36 flex flex-col justify-between">
//                   <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
//                   <p className="text-gray-600 text-sm mb-4">oleh {book.author}</p>
//                 </div>
//               </Link>
//               <div className="p-4 flex flex-col items-center space-y-2">
//                 <Link to={`/books/${book.id}`} className="w-full">
//                   <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Detail</button>
//                 </Link>
//                 <div className="flex w-full space-x-2">
//                   <Link to={`/edit-book/${book.id}`} className="w-1/2">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Edit</button>
//                   </Link>
//                   <button 
//                     className="bg-red-500 text-white px-4 py-2 rounded w-1/2"
//                     onClick={() => deleteBook(book.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


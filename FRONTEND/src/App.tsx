import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
// import BookForm from './BookForm';
import BookForm from './BookForm';
import BookDetail from './BookDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/edit-book/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getFeaturedBooks();
        setFeaturedBooks(data);
      } catch (error) {
        console.error('Failed to fetch featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedBooks();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Welcome to ModernShelf</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover, review, and share your thoughts on thousands of books from around the world.
        </p>
        <Link 
          to="/books" 
          className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Browse All Books
        </Link>
      </section>

      {loading ? (
        <div className="text-center">Loading featured books...</div>
      ) : (
        featuredBooks.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Featured Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default HomePage;
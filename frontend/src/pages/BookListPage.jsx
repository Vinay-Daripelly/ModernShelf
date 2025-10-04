import { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch genres only once on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await bookService.getGenres();
        setGenres(genresData);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch books whenever page, searchTerm, or genre changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getBooks(page, searchTerm, genre);
        setBooks(data.books);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, searchTerm, genre]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on a new search
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1); // Reset to first page on a new filter
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">All Books</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          onChange={handleSearchChange}
          className="w-full sm:w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          onChange={handleGenreChange}
          className="w-full sm:w-1/4 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">All Genres</option>
          {genres.map(g => <option key={g} value={g} className="capitalize">{g}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading books...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>No books found matching your criteria.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {pages > 1 && (
            <div className="flex justify-center mt-8">
              {[...Array(pages).keys()].map((p) => (
                <button
                  key={p + 1}
                  onClick={() => setPage(p + 1)}
                  className={`mx-1 px-4 py-2 border rounded-md transition-colors ${
                    page === p + 1 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                  }`}
                >
                  {p + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookListPage;
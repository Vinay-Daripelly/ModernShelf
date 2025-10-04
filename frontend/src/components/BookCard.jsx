import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`} className="border rounded-lg p-4 flex flex-col shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex-grow">
        <h3 className="text-lg font-bold mb-2 dark:text-gray-100">{book.title}</h3>
        <p className="text-md text-gray-700 mb-2 dark:text-gray-300">by {book.author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{book.genre} ({book.publishedYear})</p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors dark:hover:bg-blue-500">
        View Details
      </button>
    </Link>
  );
};

export default BookCard;
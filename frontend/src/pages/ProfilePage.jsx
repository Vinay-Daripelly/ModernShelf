import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import BookCard from '../components/BookCard';
import StarRating from '../components/StarRating';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const booksData = await userService.getMyBooks();
        const reviewsData = await userService.getMyReviews();
        setMyBooks(booksData);
        setMyReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading your profile...</div>;

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Hello, {user.name}!</h1>
      
      {/* My Books Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Added Books</h2>
        {myBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myBooks.map(book => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You haven't added any books yet.</p>
        )}
      </div>

      {/* My Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
        {myReviews.length > 0 ? (
          <div className="space-y-4">
            {myReviews.map(review => (
              <div key={review._id} className="p-4 border rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <p className="font-semibold">For the book: <Link to={`/books/${review.bookId._id}`} className="text-blue-600 hover:underline dark:text-blue-400">{review.bookId.title}</Link></p>
                <div className="flex items-center my-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-700 dark:text-gray-300">"{review.reviewText}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
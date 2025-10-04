
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import bookService from '../services/bookService';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editFormData, setEditFormData] = useState({ rating: 0, reviewText: '' });
  
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();


  
  const fetchBookData = async () => {
    try {
      // Don't set loading to true on refresh, only on initial load
      const data = await bookService.getBookById(id);
      setBook(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch book details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBookData();
  }, [id]);

  // Check if the current logged-in user has already reviewed this book
  const hasUserReviewed = user && book?.reviews.some(review => review.userId._id === user._id);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0 || newReviewText.trim() === '') {
      return toast.error('Please provide a rating and a review.');
    }

    const promise = reviewService.createReview({ bookId: id, rating: newRating, reviewText: newReviewText });

    toast.promise(promise, {
      loading: 'Submitting review...',
      success: 'Review submitted!',
      error: (err) => err.response?.data?.message || 'Failed to submit review.',
    });

    promise.then(() => {
      setNewRating(0);
      setNewReviewText('');
      fetchBookData();
    }).catch(err => console.error(err));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book and all its reviews?')) {
      const promise = bookService.deleteBook(id);
      toast.promise(promise, {
        loading: 'Deleting book...',
        success: 'Book deleted successfully.',
        error: 'Failed to delete book.'
      });
      promise.then(() => navigate('/'));
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete your review?')) {
        const promise = reviewService.deleteReview(reviewId);
        toast.promise(promise, {
            loading: 'Deleting review...',
            success: 'Review deleted.',
            error: 'Failed to delete review.'
        });
        promise.then(() => fetchBookData());
    }
  };

  const handleUpdateReview = (reviewId) => {
    const promise = reviewService.updateReview(reviewId, editFormData);
    toast.promise(promise, {
        loading: 'Updating review...',
        success: 'Review updated!',
        error: 'Failed to update review.'
    });
    promise.then(() => {
        setEditingReviewId(null);
        fetchBookData();
    });
  };
  
  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setEditFormData({ rating: review.rating, reviewText: review.reviewText });
  };


  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!book) return <div className="text-center mt-8">Book not found.</div>;

  return (
    <div className="space-y-8">
      {/* Book Details Section */}
      <div className="border rounded-lg p-6 bg-white shadow-md relative dark:bg-gray-800 dark:border-gray-700">
        {user && user._id === book.addedBy && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link to={`/books/${book._id}/edit`} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 text-sm">Edit</Link>
            <button onClick={handleDelete} className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 text-sm">Delete</button>
          </div>
        )}
        <h1 className="text-4xl font-extrabold mb-2 dark:text-gray-100">{book.title}</h1>
        <p className="text-xl text-gray-700 mb-2 dark:text-gray-300">by {book.author}</p>
        <div className="flex items-center mb-4">
          <StarRating rating={book.averageRating} />
          <span className="ml-2 text-gray-600 dark:text-gray-400">({book.reviews.length} reviews)</span>
        </div>
        <p className="text-gray-500 mb-1 dark:text-gray-400">{book.genre} - {book.publishedYear}</p>
        <p className="mt-4 text-gray-800 dark:text-gray-200">{book.description}</p>
      </div>

      {/* Add Review Form */}
      {user && !hasUserReviewed && (
        <div className="border rounded-lg p-6 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-2 dark:text-gray-300">Your Rating</label>
              <div className="flex">{[1, 2, 3, 4, 5].map((star) => (<span key={star} onClick={() => setNewRating(star)} className={`text-3xl cursor-pointer ${star <= newRating ? 'text-yellow-500' : 'text-gray-300'}`}>&#9733;</span>))}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="reviewText" className="block font-semibold mb-2 dark:text-gray-300">Your Review</label>
              <textarea id="reviewText" value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows="4" required></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">Submit Review</button>
          </form>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold dark:text-gray-100">Reviews</h2>
        {book.reviews.length > 0 ? (
          book.reviews.map((review) => (
            <div key={review._id} className="border-b pb-4 dark:border-gray-700">
              {editingReviewId === review._id ? (
                // EDITING VIEW
                <div>
                  <div className="flex mb-2">{[1, 2, 3, 4, 5].map(star => <span key={star} onClick={() => setEditFormData({ ...editFormData, rating: star })} className={`text-2xl cursor-pointer ${star <= editFormData.rating ? 'text-yellow-500' : 'text-gray-300'}`}>&#9733;</span>)}</div>
                  <textarea value={editFormData.reviewText} onChange={(e) => setEditFormData({ ...editFormData, reviewText: e.target.value })} className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                  <button onClick={() => handleUpdateReview(review._id)} className="bg-green-500 text-white py-1 px-3 rounded-md text-sm">Save</button>
                  <button onClick={() => setEditingReviewId(null)} className="ml-2 bg-gray-500 text-white py-1 px-3 rounded-md text-sm">Cancel</button>
                </div>
              ) : (
                // DISPLAY VIEW
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <StarRating rating={review.rating} />
                        <p className="ml-4 font-bold dark:text-gray-200">{review.userId.name}</p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{review.reviewText}</p>
                    </div>
                    {user && user._id === review.userId._id && (
                      <div className="flex space-x-2 flex-shrink-0 ml-4">
                        <button onClick={() => handleEditClick(review)} className="text-sm text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteReview(review._id)} className="text-sm text-red-500 hover:underline">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="dark:text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;
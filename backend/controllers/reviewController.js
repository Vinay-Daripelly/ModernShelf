const Review = require('../models/Review.js');
const Book = require('../models/Book.js');

// @desc    Create a new review
// @route   POST /api/reviews
const createReview = async (req, res) => {
    const { rating, reviewText, bookId } = req.body;
    const book = await Book.findById(bookId);

    if(!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const alreadyReviewed = await Review.findOne({ bookId, userId: req.user._id });
    if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
        rating,
        reviewText,
        bookId,
        userId: req.user._id,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
};




// @desc    Update a review
// @route   PUT /api/reviews/:id
const updateReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview, updateReview, deleteReview };
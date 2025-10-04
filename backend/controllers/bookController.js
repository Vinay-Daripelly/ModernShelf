
const Review = require('../models/Review.js');
const Book = require('../models/Book.js');
// @desc    Create a new book
// @route   POST /api/books
const createBook = async (req, res) => {
  
  try {
    const { title, author, description, genre, publishedYear } = req.body;
    const bookExists = await Book.findOne({ title, author });

    if (bookExists) {
      return res.status(400).json({ message: 'This book already exists in the library' });
    }
    const book = new Book({
      title,
      author,
      description,
      genre,
      publishedYear,
      addedBy: req.user._id,
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all books with pagination or a limit
// @route   GET /api/books
const getBooks = async (req, res) => {
  try {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const { search, genre } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const count = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get featured books for homepage
// @route   GET /api/books/featured
const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single book by ID with reviews
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');
    
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    res.json({ ...book.toObject(), reviews, averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.publishedYear = publishedYear || book.publishedYear;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await book.deleteOne();
    await Review.deleteMany({ bookId: req.params.id });
    res.json({ message: 'Book and associated reviews removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Fetch all product categories
// @route   GET /api/books/categories
const getBookCategories = async (req, res) => {
  try {
    const categories = await Book.distinct('genre');
    res.json(categories);
  } catch (error) {
    console.error(error); // Log the full error object
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { createBook, getBooks, getFeaturedBooks, getBookById, updateBook, deleteBook, getBookCategories };
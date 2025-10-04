// const express = require('express');
// const router = express.Router();
// const { createBook, getBooks, getFeaturedBooks, getBookById, updateBook, deleteBook,getBookCategories } = require('../controllers/bookController.js');
// const { protect } = require('../middleware/authMiddleware.js');
// router.get('/featured', getFeaturedBooks);
// router.route('/').get(getBooks).post(protect, createBook);
// router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);
// router.route('/categories').get(getBookCategories);
// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  createBook, 
  getBooks, 
  getBookById, 
  updateBook, 
  deleteBook, 
  getBookCategories, 
  getFeaturedBooks 
} = require('../controllers/bookController.js');
const { protect } = require('../middleware/authMiddleware.js');

// General routes
router.route('/').get(getBooks).post(protect, createBook);
router.route('/featured').get(getFeaturedBooks);

// Specific routes MUST come before dynamic routes
router.route('/categories').get(getBookCategories); 

// Dynamic /:id route MUST come last
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createReview, updateReview, deleteReview } = require('../controllers/reviewController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, createReview);

// THIS IS THE CRUCIAL LINE
router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
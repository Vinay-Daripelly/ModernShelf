const express = require('express');
const { registerUser, loginUser, getMyBooks, getMyReviews } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js'); 
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/mybooks', protect, getMyBooks);
router.get('/profile/myreviews', protect, getMyReviews);

module.exports = router;
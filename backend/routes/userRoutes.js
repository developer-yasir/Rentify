const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/').get(protect, admin, getUsers);

module.exports = router;
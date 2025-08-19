const express = require('express');
const router = express.Router();
const { seedAdmin, getDashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/seed', seedAdmin);
router.get('/dashboard-stats', protect, admin, getDashboardStats);

module.exports = router;
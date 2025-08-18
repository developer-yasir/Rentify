const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing, updateListing, deleteListing } = require('../controllers/listingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getListings).post(protect, createListing);
router.route('/:id').get(getListingById).put(protect, updateListing).delete(protect, admin, deleteListing);

module.exports = router;

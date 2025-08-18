const express = require('express');
const router = express.Router();
const { seedListings } = require('../controllers/listingController');

router.get('/', seedListings); // Changed route from '/seed' to '/'

module.exports = router;
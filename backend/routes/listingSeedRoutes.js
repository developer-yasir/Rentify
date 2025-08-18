const express = require('express');
const router = express.Router();
const { seedListings } = require('../controllers/listingController');

router.get('/seed', seedListings);

module.exports = router;

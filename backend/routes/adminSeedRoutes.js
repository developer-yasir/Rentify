const express = require('express');
const router = express.Router();
const { seedAdmin } = require('../controllers/adminController');

router.get('/seed', seedAdmin);

module.exports = router;

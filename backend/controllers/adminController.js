const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Listing = require('../models/Listing');
const ContactMessage = require('../models/ContactMessage');

// @desc    Seed an admin user
// @route   GET /api/admin/seed
// @access  Public (Temporary for development)
const seedAdmin = asyncHandler(async (req, res) => {
  const email = 'yasir@gmail.com';
  const password = 'admin'; // This password will be hashed by the User model pre-save hook

  const adminExists = await User.findOne({ email });

  if (adminExists) {
    return res.status(200).json({ message: 'Admin user already exists.' });
  }

  const adminUser = await User.create({
    username: 'admin_yasir',
    email,
    password,
    role: 'Admin',
  });

  if (adminUser) {
    res.status(201).json({
      message: 'Admin user created successfully.',
      user: {
        _id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin user data');
  }
});


// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const listingCount = await Listing.countDocuments();
  const contactMessageCount = await ContactMessage.countDocuments();

  res.status(200).json({
    userCount,
    listingCount,
    contactMessageCount,
  });
});

module.exports = { seedAdmin, getDashboardStats };


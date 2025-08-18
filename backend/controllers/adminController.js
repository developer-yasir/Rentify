const asyncHandler = require('express-async-handler');
const User = require('../models/User');

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

module.exports = { seedAdmin };

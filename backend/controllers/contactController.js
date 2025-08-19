const asyncHandler = require('express-async-handler');
const ContactMessage = require('../models/ContactMessage');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  });

  if (contactMessage) {
    res.status(201).json({
      _id: contactMessage._id,
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject,
      message: contactMessage.message,
      createdAt: contactMessage.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid contact message data');
  }
});

module.exports = { createContactMessage };

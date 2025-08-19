const mongoose = require('mongoose');

const contactMessageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);

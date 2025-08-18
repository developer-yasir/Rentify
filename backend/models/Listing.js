const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Property', 'Vehicle', 'Furniture', 'Gadget'],
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    // Add more fields as needed, e.g., booking calendar, ratings, etc.
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

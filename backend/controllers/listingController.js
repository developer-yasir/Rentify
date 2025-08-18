const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    res.json(listing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Create a listing
// @route   POST /api/listings
// @access  Private/Owner
const createListing = asyncHandler(async (req, res) => {
  const { title, description, category, price, location, images } = req.body;

  const listing = new Listing({
    owner: req.user._id,
    title,
    description,
    category,
    price,
    location,
    images,
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private/Owner
const updateListing = asyncHandler(async (req, res) => {
  const { title, description, category, price, location, images, availability } = req.body;

  const listing = await Listing.findById(req.params.id);

  if (listing) {
    // Ensure owner or admin
    if (listing.owner.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('Not authorized to update this listing');
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.category = category || listing.category;
    listing.price = price || listing.price;
    listing.location = location || listing.location;
    listing.images = images || listing.images;
    listing.availability = availability !== undefined ? availability : listing.availability;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private/Owner/Admin
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    // Ensure owner or admin
    if (listing.owner.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(401);
      throw new Error('Not authorized to delete this listing');
    }
    
    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};

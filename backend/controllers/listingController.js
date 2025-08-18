const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');
const User = require('../models/User'); // Import User model

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

// @desc    Seed sample listings
// @route   GET /api/listings/seed
// @access  Public (Temporary for development)
const seedListings = asyncHandler(async (req, res) => {
  // Find the admin user to assign as owner
  const adminUser = await User.findOne({ email: 'yasir@gmail.com' });

  if (!adminUser) {
    res.status(404);
    throw new Error('Admin user not found. Please seed admin user first.');
  }

  const sampleListings = [
    {
      owner: adminUser._id,
      title: 'Cozy Apartment in Downtown',
      description: 'A beautiful 1-bedroom apartment in the heart of the city.',
      category: 'Property',
      price: 1200,
      location: 'New York, NY',
      images: ['https://via.placeholder.com/300x200?text=Apartment1', 'https://via.placeholder.com/300x200?text=Apartment2'],
    },
    {
      owner: adminUser._id,
      title: 'Spacious Family SUV',
      description: 'Perfect for family trips, comfortable and reliable.',
      category: 'Vehicle',
      price: 50,
      location: 'Los Angeles, CA',
      images: ['https://via.placeholder.com/300x200?text=SUV1', 'https://via.placeholder.com/300x200?text=SUV2'],
    },
    {
      owner: adminUser._id,
      title: 'Modern Office Chair',
      description: 'Ergonomic design for long working hours.',
      category: 'Furniture',
      price: 15,
      location: 'Chicago, IL',
      images: ['https://via.placeholder.com/300x200?text=Chair1', 'https://via.placeholder.com/300x200?text=Chair2'],
    },
    {
      owner: adminUser._id,
      title: 'High-Performance Gaming Laptop',
      description: 'Experience gaming like never before with this powerful machine.',
      category: 'Gadget',
      price: 80,
      location: 'Houston, TX',
      images: ['https://via.placeholder.com/300x200?text=Laptop1', 'https://via.placeholder.com/300x200?text=Laptop2'],
    },
  ];

  await Listing.deleteMany({}); // Clear existing listings before seeding
  const createdListings = await Listing.insertMany(sampleListings);

  res.status(201).json({ message: 'Listings seeded successfully.', listings: createdListings });
});

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  seedListings,
};
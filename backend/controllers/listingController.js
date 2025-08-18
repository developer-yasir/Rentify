const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');
const User = require('../models/User'); // Import User model

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { location: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category && req.query.category !== 'All'
    ? { category: req.query.category }
    : {};

  const listings = await Listing.find({ ...keyword, ...category });
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

  const baseListings = [
    {
      title: 'Cozy Apartment',
      description: 'A beautiful 1-bedroom apartment.',
      category: 'Property',
      price: 1200,
      location: 'New York, NY',
      images: ['https://via.placeholder.com/300x200?text=Apartment'],
    },
    {
      title: 'Spacious SUV',
      description: 'Perfect for family trips.',
      category: 'Vehicle',
      price: 50,
      location: 'Los Angeles, CA',
      images: ['https://via.placeholder.com/300x200?text=SUV'],
    },
    {
      title: 'Modern Chair',
      description: 'Ergonomic design for long hours.',
      category: 'Furniture',
      price: 15,
      location: 'Chicago, IL',
      images: ['https://via.placeholder.com/300x200?text=Chair'],
    },
    {
      title: 'Gaming Laptop',
      description: 'High-performance machine.',
      category: 'Gadget',
      price: 80,
      location: 'Houston, TX',
      images: ['https://via.placeholder.com/300x200?text=Laptop'],
    },
  ];

  const generatedListings = [];
  for (let i = 0; i < 5; i++) { // Generate 5 sets of 4 listings = 20 listings
    baseListings.forEach((baseListing) => {
      generatedListings.push({
        ...baseListing,
        owner: adminUser._id,
        title: `${baseListing.title} ${i + 1}`,
        price: baseListing.price + (i * 10),
        location: `${baseListing.location.split(',')[0]}, Area ${i + 1}`,
        images: baseListing.images.map(img => `${img}${i + 1}`)
      });
    });
  }

  await Listing.deleteMany({}); // Clear existing listings before seeding
  const createdListings = await Listing.insertMany(generatedListings);

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
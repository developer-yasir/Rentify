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
  const listing = await Listing.findById(req.params.id).populate('owner', 'username email');

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
  const { title, description, category, price, location, images, amenities } = req.body;

  const listing = new Listing({
    owner: req.user._id,
    title,
    description,
    category,
    price,
    location,
    images,
    amenities,
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private/Owner
const updateListing = asyncHandler(async (req, res) => {
  const { title, description, category, price, location, images, availability, amenities } = req.body;

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
    listing.amenities = amenities || listing.amenities;

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

  const propertyListings = [
    {
      title: 'Modern Downtown Apartment',
      description: 'Spacious 2-bedroom apartment with city views.',
      category: 'Property',
      price: 1500,
      location: 'New York, NY',
      images: ['https://via.placeholder.com/300x200?text=ModernApt1', 'https://via.placeholder.com/300x200?text=ModernApt2'],
      amenities: ['Gym', 'Pool', 'Balcony', 'Pet-Friendly'],
    },
    {
      title: 'Cozy Suburban House',
      description: 'Family-friendly house with a large backyard.',
      category: 'Property',
      price: 2000,
      location: 'Los Angeles, CA',
      images: ['https://via.placeholder.com/300x200?text=House1', 'https://via.placeholder.com/300x200?text=House2'],
      amenities: ['Garage', 'Garden', 'Dishwasher'],
    },
    {
      title: 'Studio Loft in Arts District',
      description: 'Stylish studio perfect for artists and creatives.',
      category: 'Property',
      price: 900,
      location: 'Chicago, IL',
      images: ['https://via.placeholder.com/300x200?text=StudioLoft1', 'https://via.placeholder.com/300x200?text=StudioLoft2'],
      amenities: ['High Ceilings', 'Natural Light'],
    },
    {
      title: 'Luxury Condo with Ocean View',
      description: 'Exclusive beachfront condo with premium amenities.',
      category: 'Property',
      price: 3000,
      location: 'Miami, FL',
      images: ['https://via.placeholder.com/300x200?text=OceanCondo1', 'https://via.placeholder.com/300x200?text=OceanCondo2'],
      amenities: ['Private Beach Access', 'Spa', 'Concierge'],
    },
  ];

  const generatedListings = [];
  for (let i = 0; i < 5; i++) { // Generate 5 sets of 4 property listings = 20 listings
    propertyListings.forEach((baseListing) => {
      generatedListings.push({
        ...baseListing,
        owner: adminUser._id,
        title: `${baseListing.title} ${i + 1}`,
        price: baseListing.price + (i * 100),
        location: `${baseListing.location.split(',')[0]}, Area ${i + 1}`,
        images: baseListing.images.map(img => `${img}${i + 1}`),
        amenities: baseListing.amenities,
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
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const adminSeedRoutes = require('./routes/adminSeedRoutes');
const listingSeedRoutes = require('./routes/listingSeedRoutes');

dotenv.config();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// User routes
app.use('/api/users', userRoutes);
// Listing routes
app.use('/api/listings', listingRoutes);

// Admin seed route (TEMPORARY - REMOVE AFTER USE)
app.use('/api/admin', adminSeedRoutes);

// Listing seed route (TEMPORARY - REMOVE AFTER USE)
app.use('/api/listings', listingSeedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
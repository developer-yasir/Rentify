import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import './HomePage.css';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [featuredListings, setFeaturedListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        // For simplicity, fetching all listings and taking a few random ones
        // In a real app, you'd have a dedicated API for featured listings
        const { data } = await axios.get('/api/listings');
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFeaturedListings(shuffled.slice(0, 4)); // Get 4 random listings
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      }
    };
    fetchFeaturedListings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?search=${searchQuery}&category=${category}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Find Your Perfect Rental</h1>
        <p>Properties, Vehicles, Furniture, Gadgets - All in One Place</p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by location, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Property">Property</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Furniture">Furniture</option>
            <option value="Gadget">Gadget</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Featured Listings Section */}
      <section className="featured-listings section-padding">
        <h2 className="section-heading">Featured Listings</h2>
        {featuredListings.length === 0 ? (
          <p>No featured listings available.</p>
        ) : (
          <div className="listings-grid-container">
            <div className="listings-grid">
              {featuredListings.map((listing) => (
                <div key={listing._id} className="listing-card">
                  <h3>{listing.title}</h3>
                  <p><strong>Category:</strong> {listing.category}</p>
                  <p><strong>Price:</strong> ${listing.price}</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                  {listing.images && listing.images.length > 0 && (
                    <img 
                      src={listing.images[0]}
                      alt={listing.title}
                    />
                  )}
                  <button onClick={() => handleViewDetails(listing._id)} className="btn btn-secondary">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section-padding">
        <h2 className="section-heading">How It Works</h2>
        <div className="how-it-works-steps">
          <div className="step">
            <h3>1. Find Your Rental</h3>
            <p>Browse a wide variety of properties, vehicles, furniture, and gadgets.</p>
          </div>
          <div className="step">
            <h3>2. Book & Pay Securely</h3>
            <p>Securely book your desired item and make payments with ease.</p>
          </div>
          <div className="step">
            <h3>3. Enjoy Your Rental</h3>
            <p>Pick up your rental and enjoy your experience!</p>
          </div>
        </div>
      </section>

      {/* Call to Action for Owners/Landlords */}
      <section className="cta-section section-padding">
        <h2 className="section-heading">Have Something to Rent?</h2>
        <p>List your properties, vehicles, furniture, or gadgets and start earning today!</p>
        <button className="btn btn-primary">List Your Item Now</button>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section-padding">
        <h2 className="section-heading">What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Rentify made finding a temporary apartment so easy! Highly recommend."</p>
            <p><strong>- Jane Doe, Tenant</strong></p>
          </div>
          <div className="testimonial-card">
            <p>"Listing my car was a breeze, and I'm earning extra income."</p>
            <p><strong>- John Smith, Owner</strong></p>
          </div>
        </div>
      </section>

      {/* Location Highlights Section */}
      <section className="locations section-padding">
        <h2 className="section-heading">Popular Locations</h2>
        <div className="location-cards">
          <div className="location-card">
            <h3>New York</h3>
            <p>Properties, Gadgets</p>
          </div>
          <div className="location-card">
            <h3>Los Angeles</h3>
            <p>Vehicles, Furniture</p>
          </div>
          <div className="location-card">
            <h3>Chicago</h3>
            <p>Properties, Vehicles</p>
          </div>
        </div>
      </section>

      {/* Partners/Security Logos Section */}
      <section className="partners section-padding">
        <h2 className="section-heading">Trusted Partners</h2>
        <div className="partner-logos">
          <img src="https://placehold.co/100x50?text=Stripe" alt="Stripe" />
          <img src="https://placehold.co/100x50?text=PayPal" alt="PayPal" />
          <img src="https://placehold.co/100x50?text=Secure" alt="Secure" />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter section-padding">
        <h2 className="section-heading">Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest listings and offers.</p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Your Email Address"
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default HomePage;

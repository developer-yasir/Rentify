import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [featuredListings, setFeaturedListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
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

  return (
    <div style={{
      backgroundColor: 'var(--light-background-color)',
      color: 'var(--text-color)'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'url(https://via.placeholder.com/1500x500?text=Rentify+Hero)', // Placeholder image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1rem'
        }}>
          Find Your Perfect Rental
        </h1>
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '2rem'
        }}>
          Properties, Vehicles, Furniture, Gadgets - All in One Place
        </p>
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          gap: '1rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          <input
            type="text"
            placeholder="Search by location, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              width: '300px'
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          >
            <option value="All">All Categories</option>
            <option value="Property">Property</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Furniture">Furniture</option>
            <option value="Gadget">Gadget</option>
          </select>
          <button type="submit" style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'var(--primary-color)',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Search
          </button>
        </form>
      </section>

      {/* Featured Listings Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--light-background-color)',
        color: 'var(--text-color)'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>Featured Listings</h2>
        {featuredListings.length === 0 ? (
          <p>No featured listings available.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {featuredListings.map((listing) => (
              <div key={listing._id} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                textAlign: 'left'
              }}>
                <h3 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{listing.title}</h3>
                <p><strong>Category:</strong> {listing.category}</p>
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Location:</strong> {listing.location}</p>
                {listing.images && listing.images.length > 0 && (
                  <img 
                    src={listing.images[0]}
                    alt={listing.title}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      marginBottom: '0.5rem'
                    }}
                  />
                )}
                <button style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--secondary-color)',
                  color: '#fff',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--accent-color)',
        color: 'var(--text-color)' // Changed to text-color for better contrast
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>How It Works</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            flex: '1 1 250px',
            backgroundColor: 'rgba(255,255,255,0.8)', // Slightly more opaque
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)' }}>1. Find Your Rental</h3>
            <p>Browse a wide variety of properties, vehicles, furniture, and gadgets.</p>
          </div>
          <div style={{
            flex: '1 1 250px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)' }}>2. Book & Pay Securely</h3>
            <p>Securely book your desired item and make payments with ease.</p>
          </div>
          <div style={{
            flex: '1 1 250px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: 'var(--primary-color)' }}>3. Enjoy Your Rental</h3>
            <p>Pick up your rental and enjoy your experience!</p>
          </div>
        </div>
      </section>

      {/* Call to Action for Owners/Landlords */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--light-background-color)',
        color: 'var(--text-color)'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1.5rem' }}>
          Have Something to Rent?
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          List your properties, vehicles, furniture, or gadgets and start earning today!
        </p>
        <button style={{
          padding: '1rem 2rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}>
          List Your Item Now
        </button>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--accent-color)',
        color: 'var(--text-color)' // Changed to text-color for better contrast
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>What Our Users Say</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            flex: '1 1 300px',
            backgroundColor: 'rgba(255,255,255,0.8)', // Slightly more opaque
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <p>"Rentify made finding a temporary apartment so easy! Highly recommend."</p>
            <p><strong>- Jane Doe, Tenant</strong></p>
          </div>
          <div style={{
            flex: '1 1 300px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <p>"Listing my car was a breeze, and I'm earning extra income."</p>
            <p><strong>- John Smith, Owner</strong></p>
          </div>
        </div>
      </section>

      {/* Location Highlights Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--light-background-color)',
        color: 'var(--text-color)'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>Popular Locations</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            flex: '1 1 200px',
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>New York</h3>
            <p>Properties, Gadgets</p>
          </div>
          <div style={{
            flex: '1 1 200px',
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>Los Angeles</h3>
            <p>Vehicles, Furniture</p>
          </div>
          <div style={{
            flex: '1 1 200px',
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>Chicago</h3>
            <p>Properties, Vehicles</p>
          </div>
        </div>
      </section>

      {/* Partners/Security Logos Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--primary-color)',
        color: '#fff'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Trusted Partners</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <img src="https://via.placeholder.com/100x50?text=Stripe" alt="Stripe" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="https://via.placeholder.com/100x50?text=PayPal" alt="PayPal" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="https://via.placeholder.com/100x50?text=Secure" alt="Secure" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--light-background-color)',
        color: 'var(--text-color)'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1.5rem' }}>
          Stay Updated
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Subscribe to our newsletter for the latest listings and offers.
        </p>
        <form style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <input
            type="email"
            placeholder="Your Email Address"
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              flexGrow: '1'
            }}
          />
          <button type="submit" style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'var(--primary-color)',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

export default HomePage;
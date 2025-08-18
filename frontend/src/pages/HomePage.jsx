import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

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

      {/* Placeholder for other sections */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>
          More content coming soon!
        </h2>
        <p>This is where sections like Featured Listings, How It Works, Testimonials, etc., will go.</p>
      </section>
    </div>
  );
}

export default HomePage;
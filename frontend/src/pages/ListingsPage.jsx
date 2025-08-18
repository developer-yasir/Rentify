import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get('/api/listings');
        setListings(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message
          ? err.response.data.message
          : err.message);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: 'var(--light-background-color)',
      minHeight: 'calc(100vh - 60px)',
      color: 'var(--text-color)'
    }}>
      <h1 style={{
        color: 'var(--secondary-color)',
        marginBottom: '1.5rem'
      }}>
        Available Listings
      </h1>
      {loading ? (
        <p>Loading listings...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {listings.map((listing) => (
            <div key={listing._id} style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <h2 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{listing.title}</h2>
              <p><strong>Category:</strong> {listing.category}</p>
              <p><strong>Price:</strong> ${listing.price}</p>
              <p><strong>Location:</strong> {listing.location}</p>
              <p>{listing.description.substring(0, 100)}...</p>
              {listing.images && listing.images.length > 0 && (
                <img 
                  src={listing.images[0]}
                  alt={listing.title}
                  style={{
                    width: '100%',
                    height: '200px',
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
    </div>
  );
}

export default ListingsPage;
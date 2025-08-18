import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../index.css';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const category = queryParams.get('category') || 'All';

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Construct query string for API call
        let queryString = '/api/listings';
        const params = [];
        if (searchQuery) {
          params.push(`search=${searchQuery}`);
        }
        if (category && category !== 'All') {
          params.push(`category=${category}`);
        }
        if (params.length > 0) {
          queryString += `?${params.join('&')}`;
        }

        const { data } = await axios.get(queryString);
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
  }, [searchQuery, category]); // Re-fetch when search query or category changes

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

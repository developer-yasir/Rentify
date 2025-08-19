import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import './ListingsPage.css'; // Import the new CSS file

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
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

  const handleViewDetails = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="listings-page">
      <h1 className="page-title">Available Listings</h1>
      {loading ? (
        <p>Loading listings...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="card">
              {listing.images && listing.images.length > 0 && (
                <img 
                  src={listing.images[0]}
                  alt={listing.title}
                />
              )}
              <div className="card-content">
                <h2>{listing.title}</h2>
                <p><strong>Category:</strong> {listing.category}</p>
                <p><strong>Price:</strong> ${listing.price}</p>
                <p><strong>Location:</strong> {listing.location}</p>
                <p>{listing.description.substring(0, 100)}...</p>
                <button onClick={() => handleViewDetails(listing._id)} className="btn btn-secondary">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
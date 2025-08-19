import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import './ListingDetailPage.css';

function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message
          ? err.response.data.message
          : err.message);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % listing.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + listing.images.length) % listing.images.length
    );
  };

  if (loading) {
    return <p className="loading-message">Loading listing details...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!listing) {
    return <p className="not-found-message">Listing not found.</p>;
  }

  return (
    <div className="listing-detail-page">
      {/* Image Carousel/Gallery */}
      {listing.images && listing.images.length > 0 && (
        <div className="image-carousel">
          <img 
            src={listing.images[currentImageIndex]}
            alt={`${listing.title} - ${currentImageIndex + 1}`}
            className="carousel-image"
          />
          {listing.images.length > 1 && (
            <div className="carousel-controls">
              <button onClick={prevImage} className="carousel-btn">&#10094;</button>
              <button onClick={nextImage} className="carousel-btn">&#10095;</button>
            </div>
          )}
          <div className="carousel-dots">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      )}

      {/* Clear and Concise Overview */}
      <div className="listing-section">
        <h1 className="listing-title">{listing.title}</h1>
        <p className="listing-price">
          <strong>Price:</strong> ${listing.price} per day/month (placeholder)
        </p>
        <p className="listing-info">
          <strong>Location:</strong> {listing.location}
        </p>
        <p className="listing-info">
          <strong>Category:</strong> {listing.category}
        </p>
      </div>
      
      {/* Detailed Description Section */}
      <div className="listing-section">
        <h2 className="section-title">Description</h2>
        <p>{listing.description}</p>
      </div>

      {/* Key Features/Amenities List */}
      <div className="listing-section">
        <h2 className="section-title">Key Features</h2>
        {listing.amenities && listing.amenities.length > 0 ? (
          <ul className="amenities-list">
            {listing.amenities.map((amenity, index) => (
              <li key={index} className="amenity-item">{amenity}</li>
            ))}
          </ul>
        ) : (
          <p>No specific amenities listed.</p>
        )}
      </div>

      {/* Owner Information/Contact */}
      <div className="listing-section">
        <h2 className="section-title">Owner Information</h2>
        {listing.owner ? (
          <>
            <p><strong>Username:</strong> {listing.owner.username}</p>
            <p><strong>Email:</strong> {listing.owner.email}</p>
            <button className="contact-btn">Contact Owner</button>
          </>
        ) : (
          <p>Owner information not available.</p>
        )}
      </div>

      {/* Booking/Availability Calendar (Placeholder) */}
      <div className="listing-section">
        <h2 className="section-title">Availability Calendar</h2>
        <p>Interactive calendar for booking will go here.</p>
      </div>

      {/* Ratings & Reviews Section (Placeholder) */}
      <div className="listing-section">
        <h2 className="section-title">Ratings & Reviews</h2>
        <p>User ratings and reviews will be displayed here.</p>
      </div>

      {/* Similar Listings Section (Placeholder) */}
      <div className="listing-section">
        <h2 className="section-title">Similar Listings</h2>
        <p>Similar listings will be shown here.</p>
      </div>

      {/* Call to Action (Booking/Inquiry) - Sticky (Placeholder) */}
      <div className="sticky-cta">
        <button className="book-now-btn">Book Now</button>
      </div>
    </div>
  );
}

export default ListingDetailPage;

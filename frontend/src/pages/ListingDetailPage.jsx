import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

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
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading listing details...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</p>;
  }

  if (!listing) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Listing not found.</p>;
  }

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: 'var(--light-background-color)',
      minHeight: 'calc(100vh - 60px)',
      color: 'var(--text-color)',
      maxWidth: '900px',
      margin: '2rem auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Image Carousel/Gallery */}
      {listing.images && listing.images.length > 0 && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <img 
            src={listing.images[currentImageIndex]}
            alt={`${listing.title} - ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
          {listing.images.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
              padding: '0 1rem'
            }}>
              <button onClick={prevImage} style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}>&#10094;</button>
              <button onClick={nextImage} style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}>&#10095;</button>
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            width: '100%',
            textAlign: 'center'
          }}>
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: idx === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                  margin: '0 5px',
                  cursor: 'pointer'
                }}
              ></span>
            ))}
          </div>
        </div>
      )}

      {/* Clear and Concise Overview */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{
          color: 'var(--secondary-color)',
          marginBottom: '0.5rem',
          textAlign: 'left'
        }}>
          {listing.title}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
          <strong>Price:</strong> ${listing.price} per day/month (placeholder)
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          <strong>Location:</strong> {listing.location}
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          <strong>Category:</strong> {listing.category}
        </p>
      </div>
      
      {/* Detailed Description Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Description</h2>
        <p>{listing.description}</p>
      </div>

      {/* Key Features/Amenities List */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Key Features</h2>
        {listing.amenities && listing.amenities.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
            {listing.amenities.map((amenity, index) => (
              <li key={index} style={{ backgroundColor: 'var(--light-background-color)', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>{amenity}</li>
            ))}
          </ul>
        ) : (
          <p>No specific amenities listed.</p>
        )}
      </div>

      {/* Owner Information/Contact */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Owner Information</h2>
        {listing.owner ? (
          <>
            <p><strong>Username:</strong> {listing.owner.username}</p>
            <p><strong>Email:</strong> {listing.owner.email}</p>
            <button style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Contact Owner
            </button>
          </>
        ) : (
          <p>Owner information not available.</p>
        )}
      </div>

      {/* Booking/Availability Calendar (Placeholder) */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Availability Calendar</h2>
        <p>Interactive calendar for booking will go here.</p>
      </div>

      {/* Ratings & Reviews Section (Placeholder) */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Ratings & Reviews</h2>
        <p>User ratings and reviews will be displayed here.</p>
      </div>

      {/* Similar Listings Section (Placeholder) */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Similar Listings</h2>
        <p>Similar listings will be shown here.</p>
      </div>

      {/* Call to Action (Booking/Inquiry) - Sticky (Placeholder) */}
      <div style={{
        position: 'sticky',
        bottom: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'var(--primary-color)',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <button style={{
          padding: '1rem 2rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: 'var(--secondary-color)',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '400px'
        }}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ListingDetailPage;

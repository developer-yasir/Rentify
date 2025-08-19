import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingForm from '../components/ListingForm';
import '../index.css';

function ListingsManagement() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const fetchListings = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      if (!adminInfo || !adminInfo.token) {
        setError('Not authorized, no token');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/listings', config);
      setListings(data);
      setLoading(false);
    } catch (err) {
      setError(err.response && err.response.data.message
        ? err.response.data.message
        : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setEditingListing(null);
    fetchListings(); // Refresh the list
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        const config = {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        };
        await axios.delete(`/api/listings/${id}`, config);
        alert('Listing deleted successfully!');
        fetchListings(); // Refresh the list
      } catch (err) {
        console.error('Error deleting listing:', err.response.data.message);
        alert(err.response.data.message || 'Error deleting listing');
      }
    }
  };

  const handleAddClick = () => {
    setEditingListing(null); // Ensure no previous editing data is present
    setShowForm(true);
  };

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
        Listings Management
      </h1>

      <button onClick={handleAddClick} style={{
        padding: '0.8rem 1.5rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        marginBottom: '1.5rem'
      }}>
        Add New Listing
      </button>

      {showForm && (
        <ListingForm onSave={handleSave} initialData={editingListing || {}} />
      )}

      {loading ? (
        <p>Loading listings...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id} style={{ backgroundColor: '#fff' }}>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{listing._id}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{listing.title}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{listing.category}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{listing.price}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{listing.location}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                  <button onClick={() => handleEdit(listing)} style={{
                    padding: '0.4rem 0.8rem',
                    marginRight: '0.5rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: 'var(--secondary-color)',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>Edit</button>
                  <button onClick={() => handleDelete(listing._id)} style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListingsManagement;
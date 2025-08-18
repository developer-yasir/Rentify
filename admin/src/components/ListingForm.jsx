import React, { useState } from 'react';
import axios from 'axios';

function ListingForm({ onSave, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [category, setCategory] = useState(initialData.category || 'Property');
  const [price, setPrice] = useState(initialData.price || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [images, setImages] = useState(initialData.images || ['']); // Array of image URLs

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const listingData = {
        title,
        description,
        category,
        price: Number(price),
        location,
        images: images.filter(img => img !== ''), // Filter out empty image URLs
      };

      if (initialData._id) {
        // Update existing listing
        await axios.put(`/api/listings/${initialData._id}`, listingData, config);
        alert('Listing updated successfully!');
      } else {
        // Create new listing
        await axios.post('/api/listings', listingData, config);
        alert('Listing created successfully!');
      }
      onSave(); // Callback to refresh listings list
    } catch (error) {
      console.error('Error saving listing:', error.response.data.message);
      alert(error.response.data.message || 'Error saving listing');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>
        {initialData._id ? 'Edit Listing' : 'Add New Listing'}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1rem'
        }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows="4"
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1rem'
        }}
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1rem'
        }}
      >
        <option value="Property">Property</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Furniture">Furniture</option>
        <option value="Gadget">Gadget</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1rem'
        }}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '1rem'
        }}
      />
      {images.map((image, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Image URL ${index + 1}`}
          value={image}
          onChange={(e) => handleImageChange(index, e.target.value)}
          style={{
            padding: '0.8rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        />
      ))}
      <button type="button" onClick={addImageField} style={{
        padding: '0.8rem',
        borderRadius: '4px',
        border: '1px solid var(--primary-color)',
        backgroundColor: '#fff',
        color: 'var(--primary-color)',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }}>
        Add Image Field
      </button>
      <button type="submit" style={{
        padding: '0.8rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'var(--primary-color)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }}>
        {initialData._id ? 'Update Listing' : 'Create Listing'}
      </button>
    </form>
  );
}

export default ListingForm;

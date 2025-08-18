import React from 'react';
import '../index.css';

function ListingsPage() {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
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
      <p>Browse through our properties, vehicles, furniture, and gadgets.</p>
      {/* Listings display will go here */}
    </div>
  );
}

export default ListingsPage;

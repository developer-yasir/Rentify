import React from 'react';
import '../index.css'; // Import the main CSS file for color variables

function HomePage() {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'var(--light-background-color)',
      minHeight: 'calc(100vh - 60px)' // Adjust based on Navbar height
    }}>
      <h1 style={{
        color: 'var(--secondary-color)',
        fontSize: '2.5rem',
        marginBottom: '1rem'
      }}>
        Welcome to Rentify
      </h1>
      <p style={{
        color: 'var(--text-color)',
        fontSize: '1.2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        Your one-stop marketplace for renting properties, vehicles, furniture, and gadgets.
        Find your next rental or list your items with ease.
      </p>
      {/* Add search bar and filters here later */}
    </div>
  );
}

export default HomePage;

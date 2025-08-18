import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import the main CSS file for color variables

function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'var(--primary-color)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'var(--text-color)'
    }}>
      <Link to="/" style={{
        color: 'var(--text-color)',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        Rentify
      </Link>
      <div style={{
        display: 'flex',
        gap: '1.5rem'
      }}>
        <Link to="/" style={{
          color: 'var(--text-color)',
          textDecoration: 'none',
          fontSize: '1.1rem'
        }}>
          Home
        </Link>
        <Link to="/listings" style={{
          color: 'var(--text-color)',
          textDecoration: 'none',
          fontSize: '1.1rem'
        }}>
          Listings
        </Link>
        <Link to="/login" style={{
          color: 'var(--text-color)',
          textDecoration: 'none',
          fontSize: '1.1rem'
        }}>
          Login
        </Link>
        <Link to="/register" style={{
          color: 'var(--text-color)',
          textDecoration: 'none',
          fontSize: '1.1rem'
        }}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

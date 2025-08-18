import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css'; // Import the main CSS file for color variables

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        {user ? (
          <button onClick={handleLogout} style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'var(--secondary-color)',
            color: '#fff',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
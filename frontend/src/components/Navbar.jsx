import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../index.css'; // Import the main CSS file for color variables
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false); // Close menu when a nav link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand" onClick={handleNavLinkClick}>
          Rentify
        </Link>
        <div className="primary-nav-links">
          <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
            Home
          </Link>
          <Link to="/listings" className="nav-link" onClick={handleNavLinkClick}>
            Listings
          </Link>
          <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={handleNavLinkClick}>
            Contact
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button className="search-icon">🔍</button>
        </div>

        <Link to="/list-item" className="btn btn-primary list-item-btn" onClick={handleNavLinkClick}>
          List Your Item
        </Link>

        {user ? (
          <div className="user-menu">
            <button className="user-avatar">👤</button> {/* Placeholder for user avatar/icon */}
            <div className="user-dropdown-content">
              <Link to="/profile" onClick={handleNavLinkClick}>My Profile</Link>
              {/* Add more user-specific links here, e.g., My Listings, Messages */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-secondary" onClick={handleNavLinkClick}>
              Login
            </Link>
            <Link to="/register" className="btn btn-outline" onClick={handleNavLinkClick}>
              Register
            </Link>
          </div>
        )}
      </div>

      <button className="hamburger-menu-icon" onClick={toggleMobileMenu}>☰</button>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
            Home
          </Link>
          <Link to="/listings" className="nav-link" onClick={handleNavLinkClick}>
            Listings
          </Link>
          <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={handleNavLinkClick}>
            Contact
          </Link>
          <Link to="/list-item" className="nav-link mobile-list-item-btn" onClick={handleNavLinkClick}>
            List Your Item
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-link" onClick={handleNavLinkClick}>My Profile</Link>
              <button onClick={handleLogout} className="nav-link mobile-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={handleNavLinkClick}>
                Login
              </Link>
              <Link to="/register" className="nav-link" onClick={handleNavLinkClick}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
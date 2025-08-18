import React from 'react';
import '../index.css';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--text-color)',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto' // Pushes footer to the bottom
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto 1.5rem auto'
      }}>
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.8rem' }}>Rentify</h3>
          <p>Your ultimate marketplace for rentals.</p>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.8rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{ marginBottom: '0.5rem' }}><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="/listings" style={{ color: '#fff', textDecoration: 'none' }}>Listings</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a></li>
            <li style={{ marginBottom: '0.5rem' }}><a href="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</a></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.8rem' }}>Contact Us</h3>
          <p>Email: info@rentify.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.8rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem' }}><i className="fab fa-facebook"></i></a>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem' }}><i className="fab fa-twitter"></i></a>
            <a href="#" style={{ color: '#fff', fontSize: '1.5rem' }}><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
        &copy; {new Date().getFullYear()} Rentify. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

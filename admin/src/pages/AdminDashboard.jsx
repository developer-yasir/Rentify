import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function AdminDashboard() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--light-background-color)'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: 'var(--secondary-color)',
        padding: '2rem',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '1.5rem' }}>Admin Panel</h2>
        <Link to="/admin/dashboard" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '0.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          Dashboard
        </Link>
        <Link to="/admin/users" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '0.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          Manage Users
        </Link>
        <Link to="/admin/listings" style={{
          color: '#fff',
          textDecoration: 'none
          fontSize: '1.1rem',
          padding: '0.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          Manage Listings
        </Link>
        {/* Add more admin links here */}
      </div>

      {/* Main Content */}
      <div style={{
        flexGrow: '1',
        padding: '2rem',
        color: 'var(--text-color)'
      }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem' }}>Admin Dashboard Overview</h1>
        <p>Welcome to the Admin Dashboard. Use the sidebar to navigate.</p>
        {/* Dashboard content goes here */}
      </div>
    </div>
  );
}

export default AdminDashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../index.css';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'var(--light-background-color)',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        color: 'var(--secondary-color)',
        marginBottom: '1.5rem'
      }}>
        User Profile
      </h1>
      {user ? (
        <div style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'left'
        }}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add more profile details here */}
        </div>
      ) : (
        <p style={{ color: 'var(--text-color)' }}>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default ProfilePage;

import React from 'react';
import '../index.css';

function UserManagement() {
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
        User Management
      </h1>
      <p>This is where you will manage users.</p>
      {/* User management table/components will go here */}
    </div>
  );
}

export default UserManagement;

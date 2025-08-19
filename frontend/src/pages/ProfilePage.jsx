import React from 'react';
import { useAuth } from '../hooks/useAuth';
import '../index.css';
import './ProfilePage.css';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1 className="profile-title">User Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add more profile details here */}
        </div>
      ) : (
        <p className="login-prompt">Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default ProfilePage;

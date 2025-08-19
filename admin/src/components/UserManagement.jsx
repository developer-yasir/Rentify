import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (!adminInfo || !adminInfo.token) {
          setError('Not authorized, no token');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/users', config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message
          ? err.response.data.message
          : err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Username</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '0.8rem', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ backgroundColor: '#fff' }}>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{user._id}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{user.username}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{user.role}</td>
                <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                  {/* Add edit/delete buttons here */}
                  <button style={{
                    padding: '0.4rem 0.8rem',
                    marginRight: '0.5rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: 'var(--secondary-color)',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>Edit</button>
                  <button style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    cursor: 'pointer'
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagement;
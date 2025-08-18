import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../index.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      console.log('Login successful:', data);
      login(data); // Update auth context
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      alert(error.response.data.message || 'Login failed');
    }
  };

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
        Login
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        />
        <button type="submit" style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--text-color)',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

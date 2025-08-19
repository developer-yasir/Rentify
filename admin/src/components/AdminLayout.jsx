import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaList, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token from local storage or context
    localStorage.removeItem('adminToken');
    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin/dashboard/overview" className="sidebar-link">
          <FaTachometerAlt />
          Overview
        </Link>
        <Link to="/admin/dashboard/users" className="sidebar-link">
          <FaUsers />
          Manage Users
        </Link>
        <Link to="/admin/dashboard/listings" className="sidebar-link">
          <FaList />
          Manage Listings
        </Link>
        
        <button onClick={handleLogout} className="sidebar-link" style={{ marginTop: 'auto', width: '100%' }}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}

export default AdminLayout;

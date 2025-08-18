import React from 'react';
import { Navigate } from 'react-router-dom';
// In a real app, you'd have an admin-specific auth context or check user role from general auth context
// For now, we'll simulate admin authentication.

const AdminPrivateRoute = ({ children }) => {
  // This is a placeholder. In a real application, you would check if the user is logged in
  // AND if their role is 'Admin'.
  const isAdminAuthenticated = localStorage.getItem('adminInfo'); // Placeholder for admin login status

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;

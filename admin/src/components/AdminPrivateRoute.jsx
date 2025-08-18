import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const adminInfo = localStorage.getItem('adminInfo');
  let isAdminAuthenticated = false;

  if (adminInfo) {
    const user = JSON.parse(adminInfo);
    if (user.role === 'Admin') {
      isAdminAuthenticated = true;
    }
  }

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLoginPage from './components/AdminLoginPage';
import UserManagement from './components/UserManagement';
import ListingsManagement from './components/ListingsManagement';
import AdminLayout from './components/AdminLayout';
import AdminOverview from './components/AdminOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin/dashboard"
          element={<AdminLayout />}
        >
          <Route path="" element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="listings" element={<ListingsManagement />} />
        </Route>
        
        {/* Redirect legacy routes */}
        <Route path="/admin/users" element={<Navigate to="/admin/dashboard/users" replace />} />
        <Route path="/admin/listings" element={<Navigate to="/admin/dashboard/listings" replace />} />

      </Routes>
    </Router>
  );
}

export default App;

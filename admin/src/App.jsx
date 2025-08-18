import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AdminPrivateRoute from './components/AdminPrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route 
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <UserManagement />
            </AdminPrivateRoute>
          }
        />
        {/* Add other admin protected routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from '././pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListingsPage from './pages/ListingsPage'; // Import ListingsPage
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage'; // Placeholder for a protected page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/listings" element={<ListingsPage />} /> {/* Public Listings Page */}
        
        {/* Protected Routes */}
        <Route 
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        {/* Add other protected routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;

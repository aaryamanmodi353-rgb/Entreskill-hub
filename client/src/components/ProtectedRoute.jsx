// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // If not logged in or not an admin, redirect to home or login
  if (!userInfo || (isAdmin && userInfo.role !== 'Admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
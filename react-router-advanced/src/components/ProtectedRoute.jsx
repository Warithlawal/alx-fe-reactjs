import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Simulate authentication logic
  return localStorage.getItem('authenticated') === 'true';
};

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;

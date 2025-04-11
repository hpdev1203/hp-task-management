import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optionally, return a loading spinner or null while checking auth state
    return <div>Loading...</div>; 
  }

  // If user is authenticated, render the child route (using Outlet)
  // Otherwise, redirect to the login page
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

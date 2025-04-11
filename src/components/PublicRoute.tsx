import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, redirect to home page
  // Otherwise, render the public route (using Outlet)
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute; 
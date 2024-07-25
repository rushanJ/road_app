// ProtectedRoute.js
import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useStoreState((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

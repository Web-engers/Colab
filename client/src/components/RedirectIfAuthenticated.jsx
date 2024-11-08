import React from 'react';
import { useFirebase } from '../context/Firebase';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  const { currentUser } = useFirebase();

  return currentUser ? <Navigate to="/" replace /> : children;
};

export default RedirectIfAuthenticated;

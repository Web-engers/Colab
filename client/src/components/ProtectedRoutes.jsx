import React, { useContext } from 'react';
import { useFirebase } from '../context/Firebase';
import SignInPage from '../pages/Signin';

const ProtectedRoutes = ({ children }) => {
  const { currentUser } = useFirebase();

  return currentUser !== null ? children : <SignInPage />;
};

export default ProtectedRoutes;

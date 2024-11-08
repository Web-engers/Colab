import React from 'react';
import { useFirebase } from './context/Firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import SignUpPage from './pages/Signup';
import Create from './pages/Create';
import ProtectedRoutes from './components/ProtectedRoutes';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

const App = () => {
  const { loading } = useFirebase();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/signin'
          element={
            <RedirectIfAuthenticated>
              <Signin />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectIfAuthenticated>
              <SignUpPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path='/create/:id'
          element={
            <ProtectedRoutes>
              <Create />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

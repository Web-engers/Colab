import React from 'react';
import { useFirebase } from './context/Firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import SignUpPage from './pages/Signup';
import Create from './pages/Create';
import ProtectedRoutes from './components/ProtectedRoutes';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import Chat from './components/chats/Chat';
import ShareCanvas from './components/board/ShareBoard';
import CreateWithAI from './components/board/CreateWithAI';
import Imageselect from './components/Imageselect';
import Canvas from './components/Konva';
import Template from './components/board/Template';

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
        <Route
          path='/test'
          element={
              <Template />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

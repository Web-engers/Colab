import React from 'react';
import { useFirebase } from './context/Firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import SignUpPage from './pages/Signup';

const App = () => {
  const { currentUser, loading } = useFirebase();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={currentUser ? <Home/> : <Signin/>}/>
        <Route path='/signup' element={currentUser ? <Home/> : <SignUpPage/>}/>
        <Route path='/' element={currentUser ? <Home/> : <Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
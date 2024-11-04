import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  signInWithRedirect, 
  getRedirectResult, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, db } from '../firebase/config.js';
import { collection, addDoc } from "firebase/firestore"; 



const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const getLocalUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const [currentUser, setCurrentUser] = useState(getLocalUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log("No user");
        setCurrentUser(null);
        localStorage.removeItem('user');
      }
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          setCurrentUser(result.user);
          localStorage.setItem('user', JSON.stringify(result.user));
          console.log("Redirect result user:", result.user);
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setError(null);
      localStorage.removeItem('user');
      console.log("Sign-out successful");
    } catch (error) {
      setError(error.message);
    }
  };

  const signinWithGoogle = async () => {
    setError(null);
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FirebaseContext.Provider value={{ currentUser, loading, error, signup, signIn, signOut: signOutUser, signinWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);

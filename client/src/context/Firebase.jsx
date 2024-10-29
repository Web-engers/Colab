import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDLai-AJcWxboiLDzuruYdfI1jXPJTv2jo",
  authDomain: "colab-571e9.firebaseapp.com",
  projectId: "colab-571e9",
  storageBucket: "colab-571e9.appspot.com",
  messagingSenderId: "851716723789",
  appId: "1:851716723789:web:2187aeebe893e0182af804",
  measurementId: "G-SZN9KSTYKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(null);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Error signing out:", error.message);
      setError(error.message);
    }
  };

  const signinWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setError(null);
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, error, signIn, signOut: signOutUser, signinWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore imports

// Firebase configuration
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
const db = getFirestore(app); 

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add user to Firestore
  const addUserToFirestore = async (uid, email, name = "guest", photo="https://avatar.iran.liara.run/public/16") => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) return; // Do not overwrite existing user data
      
      const userData = {
        id: uid,
        email: email,
        name: name,
        boards: [], // Empty boards array for now, can be updated later
        photo: photo
      };

      await setDoc(userRef, userData);
      console.log("User document created with UID:", uid);
    } catch (err) {
      console.error("Error adding user to Firestore: ", err);
    }
  };

  // Sign up function
  const signUp = async (name, email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      newUser.name = name;
      newUser.photo = "https://avatar.iran.liara.run/public/16"

      // Add the new user to Firestore using the UID
      await addUserToFirestore(newUser.uid, email, name);
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser(newUser);
      await addUserToFirestore(newUser.uid, email);
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

  // Sign out function
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Error signing out:", error.message);
      setError(error.message);
    }
  };

  // Sign in with Google
  const signinWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user)
      setUser(user);
      // Check if the user exists in Firestore and add them if not
      await addUserToFirestore(user.uid, user.email, user.displayName, user.photoURL || "https://avatar.iran.liara.run/public/16");
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
    <FirebaseContext.Provider value={{ currentUser: user, loading, error, signUp, signIn, signOut: signOutUser, signinWithGoogle }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);

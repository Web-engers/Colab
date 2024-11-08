import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const { currentUser, signOut, loading } = useFirebase(); // Added loading state from context
  const navigate = useNavigate();

  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setUserLoading(false); // Set loading to false once user is available
    }
  }, [currentUser]);

  const handleCreateNew = async () => {
    try {
      const boardID = uuidv4();
      const docRef = doc(db, "boards", boardID);
      const docData = {
        admin: currentUser.uid,
        collaborators: [],
        canvas: null
      };
      await setDoc(docRef, docData);
      console.log("New board created in db");
      navigate(`/create/${boardID}`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  if (userLoading || loading) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  return (
    <div className='flex-col'>
      <div>Home</div>
      {currentUser ? (
        <>
          <div>{currentUser.email}</div>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={handleCreateNew}>Create New</button>
        </>
      ) : (
        <div>Loading user...</div>
      )}
    </div>
  );
};

export default Home;

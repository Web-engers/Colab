import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { useFirebase } from '../context/Firebase';

const CreateNew = () => {
  const navigate = useNavigate();
  const { currentUser } = useFirebase()

  const handleCreateNew = async () => {
    if (!currentUser) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const boardID = uuidv4();
      const docRef = doc(db, 'boards', boardID);
      const docData = {
        admin: currentUser.uid,
        collaborators: [],
        canvas: null,
      };
      await setDoc(docRef, docData);
      console.log("New board created in db");

      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        boards: arrayUnion(boardID),
      });

      navigate(`/create/${boardID}`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <button
      className="h-[200px] w-[150px] rounded-lg bg-slate-200 text-base flex flex-col items-center justify-center overflow-hidden"
      onClick={handleCreateNew}
    >
      <p className="font-medium">+</p>
    </button>
  );
};

export default CreateNew;

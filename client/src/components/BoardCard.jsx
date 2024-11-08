import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
const BoardCard = ({ boardID }) => {
  const [title, setTitle] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserBoards = async () => {
      try {
        const boardRef = doc(db, 'boards', boardID);
        const boardSnap = await getDoc(boardRef);
        
        if (boardSnap.exists()) {
          setTitle(boardSnap.data().title);
          setAdmin(boardSnap.data().admin);
        } else {
          console.log('No document found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    
    fetchUserBoards();
  }, [boardID]); // Only run when boardID changes

  const handleCardClick = (boardID)=>{
    navigate(`create/${boardID}`)
  }

  return (
    <button 
      className="h-[200px] w-[150px] rounded-lg bg-slate-200 text-base flex flex-col items-center justify-center overflow-hidden"
      aria-label={`Board ${boardID}`}
      onClick={()=>handleCardClick(boardID)}
    >
      <p className="font-medium">{title || 'Untitled'}</p>
      <p className="font-light">{admin || ''}</p>
    </button>
  );
};

export default BoardCard;

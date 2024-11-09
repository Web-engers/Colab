import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  "https://i.postimg.cc/ZRSNgqKh/Humaaans-Plant-1.png",
  "https://i.postimg.cc/XJk500pB/Humaaans-1-Character.png",
  "https://i.postimg.cc/TPmmCbx9/Humaaans-Plant-2.png",
  "https://i.postimg.cc/4xjV65Dy/Humaaans-Plant-5.png",
];

// Function to get a random image
const getRandomBackgroundImage = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
};

const BoardCard = ({ boardID }) => {
  const [title, setTitle] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [backgroundImageURL, setBackgroundImageURL] = useState(null);
  const navigate = useNavigate();

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

      // Set a random background image when component mounts
      setBackgroundImageURL(getRandomBackgroundImage());
    };
    
    fetchUserBoards();
  }, [boardID]); // Only run when boardID changes

  const handleCardClick = (boardID) => {
    navigate(`create/${boardID}`);
  };

  return (
    <button 
      className="h-[200px] w-[150px] rounded-lg bg-slate-200 text-base flex flex-col items-center justify-center overflow-hidden"
      aria-label={`Board ${boardID}`}
      onClick={() => handleCardClick(boardID)}
      style={{
        backgroundImage: backgroundImageURL ? `url(${backgroundImageURL})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="font-medium">{title || 'Untitled'}</p>
      <p className="font-light">{admin || ''}</p>
    </button>
  );
};

export default BoardCard;

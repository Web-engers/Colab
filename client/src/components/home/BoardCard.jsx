import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  "https://i.postimg.cc/ZRSNgqKh/Humaaans-Plant-1.png",
  "https://i.postimg.cc/XJk500pB/Humaaans-1-Character.png",
  "https://i.postimg.cc/TPmmCbx9/Humaaans-Plant-2.png",
  "https://i.postimg.cc/4xjV65Dy/Humaaans-Plant-5.png",
];

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
  }, [boardID]);

  const handleCardClick = () => {
    navigate(`create/${boardID}`);
  };

  return (
    <button 
      className="relative h-[200px] w-[150px] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      aria-label={`Board ${boardID}`}
      onClick={handleCardClick}
      style={{
        backgroundImage: backgroundImageURL ? `url(${backgroundImageURL})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Text container at the bottom */}
      <div className="absolute bottom-0 w-full p-3 bg-black bg-opacity-40 text-white text-center">
        <p className="font-medium text-sm truncate">{title || 'Untitled'}</p>
        <p className="font-light text-xs truncate">{admin || ''}</p>
      </div>
    </button>
  );
};

export default BoardCard;

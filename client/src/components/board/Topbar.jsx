import React, { useEffect, useState, memo } from 'react';
import { GrSelect } from "react-icons/gr";
import { FaUndo, FaRedo } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import { db } from '../../firebase/config.js';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import ActiveUsers from "../liveblocks/ActiveUsers.jsx";
import CloudinaryUploadWidget from '../CloudinaryUploadWidget.jsx';
import Topbar2 from "../board/Topbar2.jsx";

const Topbar = () => {
  const params = useParams();
  const [title, setTitle] = useState('Untitled'); 
  const navigate = useNavigate();

  useEffect(() => {
    const boardRef = doc(db, 'boards', params.id);
    
    const unsubscribe = onSnapshot(boardRef, (boardSnap) => {
      if (boardSnap.exists()) {
        setTitle(boardSnap.data().title); 
      }
    });
    return () => unsubscribe();
  }, [params.id]); 

  const handleTitleChange = async (e) => {
    e.preventDefault();
    const newTitle = e.target.value;
    setTitle(newTitle); 
    const boardRef = doc(db, 'boards', params.id);
    await updateDoc(boardRef, { title: newTitle });
  };

  return (
    <div className="shadow-lg flex gap-6 rounded-lg m-4 p-2 items-center justify-between w-3/4 mx-auto h-16 bg-white ">
      <div 
        className="text-2xl font-extrabold text-blue-500 cursor-pointer hover:text-blue-800 transition-all duration-200"
        onClick={() => navigate('/')}
      >
        colab
      </div>
      <div className="border-l border-gray-300 h-8" />
      <div className="flex-grow">
        <textarea
          className="text-xl font-semibold text-left px-3 py-1 rounded-md h-10 w-full bg-gray-100 resize-none overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
          value={title} 
          onChange={handleTitleChange}
          placeholder="Enter board title..."
        />
      </div>
      <div className="border-l border-gray-300 h-8" />
      <p className="text-gray-500 text-sm font-medium">
        Saved
      </p>
      <ActiveUsers />
      <Topbar2 />
    </div>
  );
};

export default Topbar;
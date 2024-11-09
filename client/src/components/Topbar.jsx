import React, { useEffect, useState } from 'react';
import { GrSelect } from "react-icons/gr";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import { db } from '../firebase/config';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const params = useParams();
  const [title, setTitle] = useState('Untitled'); 
  const navigate = useNavigate()

  useEffect(() => {
    const boardRef = doc(db, 'boards', params.id);
    
    const unsubscribe = onSnapshot(boardRef, (boardSnap) => {
      if (boardSnap.exists()) {
        setTitle(boardSnap.data().title); 
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts or params.id changes
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
    <div className="bg-white flex gap-3 shadow-2xl w-2/6 h-[48px] rounded-lg m-3 justify-center items-center px-4">
      <div className="font-semibold text-3xl" onClick={()=>{navigate('/')}}>colab</div>

      <div style={{ borderLeft: "1px solid #000", height: "80%" }}></div>
      
      <div className="flex-grow flex justify-center w-[40%]">
        <textarea
          className="text-xl font-medium text-left pt-[6px] px-3 resize-none h-[40px] w-full overflow-hidden"
          value={title} 
          onChange={handleTitleChange}
        />
      </div>
      <div style={{ borderLeft: "1px solid #000", height: "80%" }}></div>
      <p className='text-slate-600'>Saved</p>
    </div>
  );
};

export default Topbar;

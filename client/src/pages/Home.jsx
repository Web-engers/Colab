import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import BoardCard from '../components/home/BoardCard';
import CreateNew from '../components/home/CreateNewBoard';

const Home = () => {
  const { currentUser, loading } = useFirebase();
  const [allBoards, setAllBoards] = useState([]);

  useEffect(() => {
    const fetchUserBoards = async () => {
      if (!currentUser) return;

      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setAllBoards(userSnap.data().boards || []);
        } else {
          console.log('No document found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
  
    fetchUserBoards();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-col">
      {currentUser ? (
        <div>
          <Navbar />
          <div className='grid grid-cols-8 gap-2 m-3'>
            <CreateNew />
            {allBoards.map((boardID) => (
              <BoardCard key={boardID} boardID={boardID} />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading user...</div>
      )}
    </div>
  );
};

export default Home;

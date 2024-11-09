import React, { useState } from 'react';
import { useFirebase } from '../../context/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, signOut } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm) return;

    try {
      const q = query(
        collection(db, 'boards'),
        where('title', '==', searchTerm)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          navigate(`/create/${doc.id}`);
        });
      } else {
        alert('No canvas found with that name');
      }
    } catch (error) {
      console.error('Error searching for canvas:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-extrabold text-white">colab</span>
      </div>

      <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-inner">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Canvas"
          className="px-4 py-2 text-sm text-gray-800 border-none outline-none rounded-l-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Create New
        </button>

        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={signOut}
        >
          Sign Out
        </button>
        
        {currentUser?.photoURL && (
          <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src={currentUser.photoURL} alt="User profile" />
        )}
      </div>
    </div>
  );
};

export default Navbar;

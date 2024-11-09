import { useFirebase } from '../context/Firebase';
import React from 'react';

const Navbar = () => {
  const { currentUser, signOut } = useFirebase();

  console.log(currentUser)

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">

      <div className="flex items-center space-x-2">
        <span className="text-3xl font-extrabold text-gray-800">colab</span>
      </div>

        <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
            Create New
            </button>

            <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={signOut}
            >
            Sign Out
            </button>
            <img className="w-8 h-8" src={currentUser.photoURL}/>
      </div>
    </div>
  );
};

export default Navbar;

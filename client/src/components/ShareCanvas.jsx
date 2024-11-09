import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import AddUser from './AddUser';
const ShareCanvas = () => {
  const [email, setEmail] = useState('');
  const [linkOption, setLinkOption] = useState('Anyone with the link');
  const [editPermission, setEditPermission] = useState('Can edit');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleCopyLink = () => {
    // Logic to copy the link
    navigator.clipboard.writeText("your-link-here").then(() => {
      alert("Link copied to clipboard!");
    });
  };

  // Fetch all users from Firestore
  useEffect(() => {
    const defineUsers = async () => {
      const q = query(collection(db, "users"));
      try {
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() }); // Extract user data
        });
        console.log(users)
        setAllUsers(users); // Set all users in the state
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };

    defineUsers();
  }, []); // Empty dependency array to run only on mount

  // Handle email input change and filter users
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase(); // Make case-insensitive search
    console.log(query)
    setEmail(query);
    const filtered = allUsers.filter((user) =>
      user.email?.toLowerCase().includes(query) // Use includes to check for matches
    );
    setFilteredUsers(filtered); // Update the filtered users
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-96">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Share this design</h2>

      {/* People with access */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-gray-700">People with access</label>
        </div>
        <input
          type="text"
          placeholder="Add people, groups, or your team"
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={handleChange}
          aria-label="Enter email or name to add people"
        />
      </div>

      {/* Display filtered users */}
      <div className="mb-4">
        {filteredUsers.length > 0 && (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <AddUser user={user}/>
            ))}
          </ul>
        )}
        {filteredUsers.length === 0 && email && (
          <p className="text-gray-500">No users found</p>
        )}
      </div>

      {/* Profile Icon */}
      <div className="flex items-center mb-6">
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-2">H</div>
        <button className="text-gray-500 hover:text-gray-700">+</button>
      </div>

      {/* Collaboration link */}
      <div className="mb-4">
        <label className="font-medium text-gray-700 mb-2 block">Collaboration link</label>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <select
              className="w-full px-4 py-2 border rounded-md border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={linkOption}
              onChange={(e) => setLinkOption(e.target.value)}
            >
              <option>Anyone with the link</option>
              {/* Add other options if needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Copy link button */}
      <button
        className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={handleCopyLink}
      >
        Copy link
      </button>
    </div>
  );
};

export default ShareCanvas;

import React, { useState } from 'react';
import { useFirebase } from '../../context/Firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Popover, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Navbar = ({ allBoards, setAllBoards }) => {
  const { currentUser, signOut } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');
  const [constBoards, setConstBoards] = useState(allBoards);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const check = async (boardID, query) => {
    try {
      const boardRef = doc(db, 'boards', boardID);
      const boardDoc = await getDoc(boardRef);
      if (!boardDoc.exists()) return false;

      const title = boardDoc.data().title || '';
      return title.toLowerCase().includes(query.toLowerCase());
    } catch (err) {
      console.error('Error fetching board data:', err);
      return false;
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAccountDelete = () => {
    console.log("Deleting account");
    setOpenDeleteDialog(false);
  };

  const open = Boolean(anchorEl);

  // Function to handle the search event
  const handleSearch = async (event) => {
    //event.preventDefault();
    setIsLoading(true);

    if (!searchTerm) {
      setAllBoards(constBoards);
      setIsLoading(false);
      return;
    }

    try {
      const filteredBoards = await Promise.all(
        allBoards.map(async (board) => {
          const isMatch = await check(board, searchTerm);
          return isMatch ? board : null;
        })
      );

      const nonNullBoards = filteredBoards.filter((board) => board !== null);
      setAllBoards(nonNullBoards);
    } catch (error) {
      console.error('Error searching for boards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-extrabold text-white">colab</span>
      </div>

      <form
        className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-inner"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={
            (e) => {
              setSearchTerm(e.target.value)
              handleSearch()
            }
          }
          placeholder="Search Canvas"
          className="px-4 py-2 text-sm text-gray-800 border-none outline-none rounded-l-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
        {isLoading && <span className="text-sm text-gray-600 ml-2">Loading...</span>}
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
          <img
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer"
            src={currentUser.photoURL}
            alt="User profile"
            onClick={handleAvatarClick} 
          />
        )}

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            style: {
              width: '200px',   
              height: '100px', 
              overflow: 'auto',
            },
          }}
          className="mt-[20px] ml-[25px]"
        >
          <div className="flex flex-col p-4 rounded-2xl border">
            <Button
              className="mb-2 hover:bg-blue-300 rounded-lg p-2 font-medium text-black"
              color="primary"
              onClick={signOut}
            >
              Sign Out
            </Button>
            <Button
              className='mb-2 hover:bg-red-600 hover:text-white font-medium rounded-lg p-2 text-black'
              onClick={handleDeleteDialogOpen}
            >
              Delete Account
            </Button>
          </div>
        </Popover>

        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
        >
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAccountDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;

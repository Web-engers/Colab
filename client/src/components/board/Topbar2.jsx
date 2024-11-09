import React, { useState } from 'react'; // Import useState
import { CiExport } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa"; // New icon for share
import { useParams } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import AddUser from './AddUser';
import ShareCanvas from './ShareBoard';
import Export from './Export';

const Topbar2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);

  return (
    <div className="bg-white flex gap-3 shadow-lg w-[100px] h-[48px] rounded-lg m-3 justify-center items-center px-4">

      <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-blue-300 transition duration-200" onClick={handleShareClick}>
        <span className="font-semibold">Share</span>
        <FaShareAlt size={20} />
      </button>
      
      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>
          <ShareCanvas />
        </div>
      </Popover>
    </div>
  );
};

export default Topbar2;

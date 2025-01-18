import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import {  FaRegImage } from "react-icons/fa";
import Imageselect from '../Imageselect';


export const Imagebutton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleShareClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'ai-popover' : undefined;
  
    return (
      <div>
        <button
          className="transition duration-200"
          onClick={handleShareClick}
        >
            <FaRegImage size={28} />
        </button>
  
        {/* Popover */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical:'bottom',
            horizontal:'right'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='ml-[20px] mt-[40px]'
        >
          <div><Imageselect/></div>
        </Popover>
      </div>
    );
  };

  
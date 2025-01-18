import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { LuDownload } from "react-icons/lu";

const Export = ({ handleExport }) => {
    const [anchorEl, setAnchorEl] = useState(null);  

    const handleExportClick = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = () => {
        setAnchorEl(null);  
    };

    const open = Boolean(anchorEl);
    const id = open ? 'export-popover' : undefined; 

    const handleExportButtonClick = (extension) => {
        console.log(`Exporting as ${extension}`);
        handleExport(extension); 
        handleClose();  
    };

    return (
        <div>
            <button className="p-2 flex" onClick={handleExportClick}>
                <LuDownload className='mr-2' size={28} />
            </button>
            <Popover
                id={id}
                open={open}  
                anchorEl={anchorEl}  
                onClose={handleClose} 
                anchorOrigin={{
                    vertical: 'center',
                    horizontal:'center'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                className='ml-[50px] mt-[40px]'
            >
                <div className='p-4'>
                    <ul className="space-y-2">
                        {["pdf", "jpg", "jpeg", "png"].map((ext) => (
                            <React.Fragment key={ext}>
                                <li>
                                    <button
                                        className="text-black py-2 rounded-lg w-full hover:bg-blue-300 focus:outline-none"
                                        onClick={() => handleExportButtonClick(ext)}  // Trigger export on button click
                                    >
                                        {ext.toUpperCase()}
                                    </button>
                                </li>
                                <hr className="border-t-2 border-black opacity-50 hover:opacity-100 transition-all duration-300" />
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </Popover>
        </div>
    );
};

export default Export



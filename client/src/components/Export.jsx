import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { FaDownload } from "react-icons/fa";  // Optionally, add an icon for download
import { jsPDF } from "jspdf";  // Import jsPDF for PDF export
import { useCanvas } from '../context/CanvasContext';

const Export = () => {
    const {canvas, exportToFormat} = useCanvas()
    console.log(canvas)
    const [anchorEl, setAnchorEl] = useState(null);  // Track the anchor element for Popover
    const [format, setFormat] = useState(null);

    const handleExportClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the current button as the anchor
    };

    const handleClose = () => {
        setAnchorEl(null);  // Close the Popover when clicked outside
    };

    // Boolean to check if Popover should be open
    const open = Boolean(anchorEl);
    const id = open ? 'export-popover' : undefined;  // ID for accessibility

    // Function to handle exporting on button click
    const handleExportButtonClick = (ext) => {
        exportToFormat(ext);  // Call export when a format is selected
        handleClose();  // Close the popover after export is triggered
    };

    return (
        <div>
            <button className='bg-blue-200 rounded-lg p-2 flex' onClick={handleExportClick}>
                <FaDownload className='mr-2' /> Export
            </button>
            <Popover
                id={id}
                open={open}  // Conditionally render popover based on `open`
                anchorEl={anchorEl}  // Anchor element is the button
                onClose={handleClose}  // Close popover when clicked outside
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className='ml-[20px] mt-[40px]'
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
                                        Export as {ext.toUpperCase()}
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

export default Export;

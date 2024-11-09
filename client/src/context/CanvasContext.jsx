// CanvasContext.js

import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {

    const [canvas, setCanvas] = useState(null);
    const exportToFormat = (format) => {
        if (!canvas) {
            console.error("Canvas is not initialized.");
            return;
        }

        const imageData = canvas.toDataURL(`image/${format}`, 0.5);  // Get image as a Data URL with specified format
    
        if (format === "pdf") {
            const doc = new jsPDF();
            doc.addImage(imageData, 'JPEG', 0, 0, 210, 297); // A4 size in mm
            doc.save("canvas-export.pdf");
        } else {
            const link = document.createElement('a');
            link.href = imageData;  // Use the Data URL as the href
            link.download = `canvas-export.${format}`;  // Specify the file name with extension
            link.click();  // Trigger the download
        }
    };

    return (
        <CanvasContext.Provider value={{ canvas, setCanvas, exportToFormat }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    return useContext(CanvasContext);
};

export default CanvasProvider

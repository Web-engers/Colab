// CanvasContext.js

import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {
    const [canvas, setCanvas] = useState(null);

    return (
        <CanvasContext.Provider value={{ canvas, setCanvas }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    return useContext(CanvasContext);
};

export default CanvasProvider

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; // v6
import { jsPDF } from "jspdf";

const CanvasContext = createContext(null);

export const useCanvas = () => useContext(CanvasContext);

export const FabricJSCanvasProvider = ({ children }) => {
    const canvasEl = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if (canvasEl.current) {
            
            const fabricCanvas = new fabric.Canvas(canvasEl.current, {
                backgroundColor: 'white',
            });
            setCanvas(fabricCanvas);

            
            return () => fabricCanvas.dispose();
        }
    }, []);

    const addRectangle = () => {
        if (canvas) {
            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'white',
                width: 50,
                height: 50,
                stroke: 'black',
                strokeWidth: 1,
                angle: 0,
            });
            canvas.add(rect);
            canvas.renderAll();
        }
    };

    addRectangle()

   
    const exportToPDF = () => {
        if (canvas) {
            const imgData = canvas.toDataURL({
                format: 'jpeg',
                quality: 0.5,
            });
            const doc = new jsPDF();
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 size in mm
            doc.save("canvas-export.pdf");
        }
    };

    return (
        <CanvasContext.Provider value={{ canvas, addRectangle, exportToPDF }}>
            <canvas
                className="ml-[80px]"
                width="800"
                height="800"
                ref={canvasEl}
            />
            {children}
        </CanvasContext.Provider>
    );
};

const CanvasControls = () => {
    const { addRectangle, exportToPDF } = useCanvas();

    return (
        <div>
            <button onClick={addRectangle}>Add Rectangle</button>
            <button onClick={exportToPDF}>Export as PDF</button>
        </div>
    );
};

export default FabricJSCanvasProvider;

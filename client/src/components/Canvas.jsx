import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useCanvas } from '../context/CanvasContext';

const Canvas = ({width=400, height=400}) => {
    const canvasEl = useRef(null); 
    const {canvas, setCanvas} = useCanvas();

    useEffect(() => {
        if (!canvasEl.current) {
            console.error("Canvas element is not available.");
            return;
        }

        console.log("intialiazing canvas")
    
        const fabricCanvas = new fabric.Canvas(canvasEl.current, {
            backgroundColor:'white',
        });
    
        setCanvas(fabricCanvas);
    
        return () => {
            fabricCanvas.dispose();
        };
    }, [width, height]);  

    return (
        <canvas
            width={width}
            height={height}
            ref={canvasEl}
        />
    );
  
}

export default Canvas
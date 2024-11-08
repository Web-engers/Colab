import React, { useEffect, useRef } from 'react'; 
import * as fabric from 'fabric'; 
import { useCanvas } from '../context/CanvasContext';
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Canvas = ({ width = 400, height = 400 }) => {
    const params = useParams();
    const canvasEl = useRef(null);
    const { canvas, setCanvas } = useCanvas(null);

    useEffect(() => {
        if (!canvasEl.current) {
            console.error("Canvas element is not available.");
            return;
        }

        console.log("Initializing canvas");

        if (params.id) {
            const boardRef = doc(db, 'boards', params.id);
            
            const unsubscribe = onSnapshot(boardRef, (boardData) => {
                const currCanvasData = boardData.data()?.canvas;

                const fabricCanvas = new fabric.Canvas(canvasEl.current, {
                    width: width,
                    height: height,
                    backgroundColor: "white"
                });

                // if (currCanvasData) {
                //     fabricCanvas.loadFromJSON(currCanvasData, fabricCanvas.renderAll.bind(fabricCanvas));
                //     console.log("Canvas loaded from Firestore");
                // } else {
                //     console.log("Empty canvas created");
                // }
                setCanvas(fabricCanvas);
            });

            return () => {
                if (unsubscribe) unsubscribe();
                if (canvas) canvas.dispose();
            };
        }
    }, [params.id, width, height]); 

    return (
        <canvas ref={canvasEl} style={{border:"1px", solid :"#000000"}}></canvas>
    );
};

export default Canvas;

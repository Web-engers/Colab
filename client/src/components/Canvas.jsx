import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useCanvas } from '../context/CanvasContext'; // Import the context
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF export



const Canvas = ({ width = 400, height = 400 }) => {
    const params = useParams();
    const canvasEl = useRef(null);
    const { canvas, setCanvas } = useCanvas();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!canvasEl.current) {
            console.error("Canvas element is not available.");
            return;
        }

        const fabricCanvas = new fabric.Canvas(canvasEl.current, {
            width,
            height,
        });

        fabricCanvas.backgroundColor = '#fff';
        fabricCanvas.renderAll();

        setCanvas(fabricCanvas); // Set canvas state to context

        const boardRef = doc(db, 'boards', params.id);
        // Uncomment and use the snapshot to load the canvas data
        // onSnapshot(boardRef, (snapshot) => {
        //     if (snapshot.exists()) {
        //         const boardData = snapshot.data();
        //         const currCanvasData = boardData?.canvas;
        //         fabricCanvas.loadFromJSON(currCanvasData, fabricCanvas.renderAll.bind(fabricCanvas));
        //         fabricCanvas.backgroundColor = "white";
        //         setLoading(false);
        //     } else {
        //         console.log("No such document!");
        //     }
        // });

        return () => {
            fabricCanvas.dispose();
        };
    }, [params.id, width, height]);

    useEffect(() => {
        if (canvas) {
            console.log("Canvas is ready for export!", canvas);
        }
    }, [canvas]); // This will run whenever canvas is updated

  

    return (
        <div>
            <canvas ref={canvasEl} />
        </div>
    );
};

export default Canvas

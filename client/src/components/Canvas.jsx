import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { useCanvas } from '../context/CanvasContext';
import { useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Canvas = ({ width = 400, height = 400 }) => {
    const params = useParams();
    const canvasEl = useRef(null);
    const { canvas, setCanvas } = useCanvas(null);
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

        fabricCanvas.backgroundColor = '#fff'
        fabricCanvas.renderAll()

        const boardRef = doc(db, 'boards', params.id);

        // getDoc(doc(db, "boards", params.id)).then(boardSnap => {
        //     if (boardSnap.exists()) {
        //         console.log("Document data:", boardSnap.data());
        //         const currCanvasData = boardSnap.data()?.canvas;
        //         fabricCanvas.loadFromJSON(currCanvasData, fabricCanvas.renderAll.bind(fabricCanvas));
        //         fabricCanvas.backgroundColor = "white"
        //         console.log("Canvas loaded from Firestore");
        //     } else {
        //         console.log("No such document!");
        //     }
        //     })

        setCanvas(fabricCanvas);


        return () => {
            fabricCanvas.dispose();
        };

    }, [params.id, width, height]); 

    return (
        <div>
            <canvas ref={canvasEl}/>
        </div>
    );
};

export default Canvas;

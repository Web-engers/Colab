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
            backgroundColor: "white",
        });

        const boardRef = doc(db, 'boards', params.id);

        getDoc(doc(db, "boards", params.id)).then(boardSnap => {
            if (boardSnap.exists()) {
                console.log("Document data:", boardSnap.data());
                const currCanvasData = boardSnap.data()?.canvas;
                fabricCanvas.loadFromJSON(currCanvasData, fabricCanvas.renderAll.bind(fabricCanvas));
                fabricCanvas.backgroundColor = "white"
                console.log("Canvas loaded from Firestore");
            } else {
                console.log("No such document!");
            }
            })

        setCanvas(fabricCanvas);

        const saveCanvasStateToFirebase = () => {
            if (!fabricCanvas) return;
            const canvasData = fabricCanvas.toJSON();
            setCanvas(fabricCanvas)
            updateDoc(boardRef, { canvas: canvasData })
                .then(() => console.log('Canvas state updated in Firebase'))
                .catch((error) => console.error('Error updating canvas state:', error));
        };

        // Attach event listeners for canvas modifications
        fabricCanvas.on('object:modified', saveCanvasStateToFirebase);
        fabricCanvas.on('object:added', saveCanvasStateToFirebase);
        fabricCanvas.on('object:removed', saveCanvasStateToFirebase);

        // Cleanup function to unsubscribe from Firestore and dispose of canvas
        return () => {
            fabricCanvas.dispose();
        };

    }, [params.id, width, height]); 

    return (
        <div>
            <canvas ref={canvasEl} style={{ border: "1px solid #000000" }} />
        </div>
    );
};

export default Canvas;

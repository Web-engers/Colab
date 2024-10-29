import { Canvas } from "fabric";
import React, { useEffect, useRef } from 'react';

const Canva = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let initCanvas;

        if (canvasRef.current) {
            // Pass the HTML element to Fabric.js
            initCanvas = new Canvas(canvasRef.current, { width: 500, height: 500 });

            initCanvas.setBackgroundColor("#fff", initCanvas.renderAll.bind(initCanvas));

            // Clean up on component unmount
            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    return (
        <div className="h-screen bg-black">
            <canvas ref={canvasRef}/>
        </div>
    );
}

export default Canva;

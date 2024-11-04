import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric'; // v6
import { jsPDF } from "jspdf";

export const FabricJSCanvas = () => {
    const canvasEl = useRef(null);

    useEffect(() => {
        if (canvasEl.current) {
            const canvas = new fabric.Canvas(canvasEl.current, {
                backgroundColor: 'blue'
            });

            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'white',
                width: 50,
                height: 50,
                borderColor: 'black',
                angle: 0
            });

            canvas.add(rect);

            // Generate PDF after adding shapes to the canvas
            canvas.renderAll();
            
            // Export canvas as an image
            const imgData = canvas.toDataURL({
                format: 'jpeg',
                quality: 0.5
            });

            const doc = new jsPDF();
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 dimensions in mm
            doc.save("download.pdf");

            return () => {
                canvas.dispose();
            };
        }
    }, []);

    return <canvas className='ml-[80px]' width="800" height="800" ref={canvasEl} />;
};

export default FabricJSCanvas;

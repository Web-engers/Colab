// import React, { useState, useRef, useEffect } from 'react';
// import { TbTemplate, TbTextSize } from "react-icons/tb";
// import { FaRegImage, FaShapes } from "react-icons/fa";
// import { MdOutlineDraw } from "react-icons/md";
// import { useCanvas } from '../../context/CanvasContext';
// import * as fabric from "fabric";
// import { getStroke } from 'perfect-freehand'; // Import perfect-freehand for smooth strokes
// import { Aibutton } from '../board/CreateWithAI';

// const SideOptions = () => {
//     const [activeOption, setActiveOption] = useState(null);
//     const [isDrawing, setIsDrawing] = useState(false); // State to track custom drawing mode
//     const [points, setPoints] = useState([]); // Track points for stroke paths
//     const { canvas } = useCanvas(); // Access canvas instance from context
//     const drawingPathRef = useRef(null); // Reference to current drawing path

//     // Add mouse event listeners for drawing when custom drawing mode is enabled
//     useEffect(() => {
//         if (!canvas) return;

//         const handleMouseDown = (event) => {
//             if (activeOption === "Draw") {
//                 setIsDrawing(true);
//                 const pointer = canvas.getPointer(event.e);
//                 setPoints([[pointer.x, pointer.y]]);
//             }
//         };

//         const handleMouseMove = (event) => {
//             if (isDrawing && activeOption === "Draw") {
//                 const pointer = canvas.getPointer(event.e);
//                 setPoints(prevPoints => [...prevPoints, [pointer.x, pointer.y]]);
//                 drawStroke();
//             }
//         };

//         const handleMouseUp = () => {
//             if (isDrawing && activeOption === "Draw") {
//                 setIsDrawing(false);
//                 finalizeStroke();
//                 setPoints([]);
//             }
//         };

//         canvas.on('mouse:down', handleMouseDown);
//         canvas.on('mouse:move', handleMouseMove);
//         canvas.on('mouse:up', handleMouseUp);

//         return () => {
//             canvas.off('mouse:down', handleMouseDown);
//             canvas.off('mouse:move', handleMouseMove);
//             canvas.off('mouse:up', handleMouseUp);
//         };
//     }, [canvas, activeOption, isDrawing]);

//     const drawStroke = () => {
//         if (!canvas || points.length < 2) return;

//         const stroke = getStroke(points, {
//             size: 4,
//             smoothing: 0.5,
//             thinning: 0.7,
//             streamline: 0.3,
//             easing: (t) => t,
//             start: { taper: 0 },
//             end: { taper: 0 },
//         });

//         const pathData = stroke
//             .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`)
//             .join(' ') + ' Z';

//         if (drawingPathRef.current) {
//             canvas.remove(drawingPathRef.current);
//         }

//         const path = new fabric.Path(pathData, {
//             fill: 'transparent',
//             stroke: 'red',
//             strokeWidth: 2,
//             objectCaching: false,
//             selectable: false,
//             evented: false,
//         });

//         canvas.add(path);
//         drawingPathRef.current = path;
//         canvas.renderAll();
//     };

//     const finalizeStroke = () => {
//         if (drawingPathRef.current) {
//             drawingPathRef.current.selectable = true;
//             drawingPathRef.current.evented = true;
//             drawingPathRef.current = null;
//         }
//         canvas.renderAll();
//     };

//     const handleClick = (option) => {
//         setActiveOption(option);

//         switch (option) {
//             case "Text":
//                 addTextToCanvas();
//                 break;
//             case "Shapes":
//                 addShapeToCanvas();
//                 break;
//             case "Draw":
//                 toggleCustomDrawingMode();
//                 break;
//             case "Image":
//                 addImageToCanvas();
//                 break;
//             case "Templates":
//                 // Templates functionality (optional)
//                 break;
//             default:
//                 break;
//         }
//     };

//     const addTextToCanvas = () => {
//         const text = new fabric.Textbox('Sample Text', { left: 100, top: 100 });
//         canvas.add(text);
//         canvas.renderAll();
//     };

//     const addShapeToCanvas = () => {
//         const rect = new fabric.Rect({ left: 150, top: 150, fill: 'red', width: 100, height: 100 });
//         canvas.add(rect);
//         canvas.renderAll();
//     };

//     const toggleCustomDrawingMode = () => {
//         setIsDrawing((prev) => !prev);
//     };

//     const addImageToCanvas = () => {
//         const imageUrl = 'https://example.com/image.jpg'; // Replace with actual URL
//         fabric.Image.fromURL(imageUrl, (img) => {
//             img.set({ left: 100, top: 100 });
//             canvas.add(img);
//             canvas.renderAll();
//         });
//     };

//     return (
//         <div className='mt-20'>
//             <Aibutton/>
//             <div className='flex flex-col gap-5 bg-white  p-2 m-3 py-4 rounded-lg shadow-lg'>
//                 <button onClick={() => handleClick("Templates")}>
//                     <TbTemplate size={28} />
//                 </button>
//                 <button onClick={() => handleClick("Image")}>
//                     <FaRegImage size={28} />
//                 </button>
//                 <button onClick={() => handleClick("Text")}>
//                     <TbTextSize size={28} />
//                 </button>
//                 <button onClick={() => handleClick("Shapes")}>
//                     <FaShapes size={28} />
//                 </button>
//                 <button onClick={() => handleClick("Draw")}>
//                     <MdOutlineDraw size={28} />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SideOptions;

import React from 'react'

const Sideoptions = () => {
  return (
    <div>Sideoptions</div>
  )
}

export default Sideoptions
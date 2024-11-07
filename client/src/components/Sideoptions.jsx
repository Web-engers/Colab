import React, { useState } from 'react';
import { TbTemplate, TbTextSize } from "react-icons/tb";
import { FaRegImage, FaShapes } from "react-icons/fa";
import { MdOutlineDraw } from "react-icons/md";
import { useCanvas } from '../context/CanvasContext'; // Import the useCanvas hook to access the canvas context
import * as fabric from "fabric";

const Sideoptions = () => {
    const [activeOption, setActiveOption] = useState(null);
    const { canvas } = useCanvas(); // Get the canvas from context

    const handleClick = (option) => {
        setActiveOption(option);

        switch (option) {
            case "Text":
                const text = new fabric.Text('Hello World', { left: 100, top: 100 });
                canvas.add(text);
                canvas.renderAll();
                break;
            case "Shapes":
                const rect = new fabric.Rect({
                    left: 150,
                    top: 150,
                    fill: 'red',
                    width: 100,
                    height: 100
                });
                canvas.add(rect);
                canvas.renderAll();
                break;
            case "Draw":
                // Toggle drawing mode
                canvas.isDrawingMode = !canvas.isDrawingMode;
                break;
            case "Image":
                const imageUrl = 'path_to_image.jpg'; // Placeholder, you can dynamically get this
                fabric.Image.fromURL(imageUrl, (img) => {
                    img.set({
                        left: 100,
                        top: 100
                    });
                    canvas.add(img);
                    canvas.renderAll();
                });
                break;
            case "Templates":
                // Handle templates (you can create predefined templates like background images, shapes, etc.)
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className='flex flex-col gap-[20px] bg-white fixed p-1 px-2 m-3 py-4 rounded-lg min-w-6 shadow-lg mt-[80px]'>
                <button onClick={() => handleClick("Templates")}>
                    <TbTemplate size={28} />
                </button>
                <button onClick={() => handleClick("Image")}>
                    <FaRegImage size={28} />
                </button>
                <button onClick={() => handleClick("Text")}>
                    <TbTextSize size={28} />
                </button>
                <button onClick={() => handleClick("Shapes")}>
                    <FaShapes size={28} />
                </button>
                <button onClick={() => handleClick("Draw")}>
                    <MdOutlineDraw size={28} />
                </button>
            </div>
        </div>
    );
}

export default Sideoptions;

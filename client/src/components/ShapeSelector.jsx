import React, { useState } from 'react';
import { FaSquare, FaRegSquare, FaCircle, FaRegCircle, FaStar, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import { useCanvas } from '../context/CanvasContext';
import * as fabric from 'fabric';

const ShapeSelector = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const { canvas } = useCanvas(); // Get canvas instance from context

  const shapes = [
    { id: 'square', icon: <FaRegSquare /> },
    { id: 'circle', icon: <FaRegCircle /> },
    { id: 'diamond', icon: <FaStar /> },
    { id: 'arrowRight', icon: <FaArrowRight /> },
    { id: 'arrowUp', icon: <FaArrowUp /> }
  ];

  const addShape = (id) => {
    setSelectedShape(id);

    if (!canvas) {
      console.warn('Canvas is not ready');
      return;
    }

    console.log("shaped add")
    switch (id) {
      case 'square':
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 50,
          height: 50
        });
        canvas.add(rect);
        break;
      case 'circle':
        const circle = new fabric.Circle({
          left: 100,
          top: 100,
          fill: 'blue',
          radius: 30
        });
        canvas.add(circle);
        break;
      case 'diamond':
        const diamond = new fabric.Polygon(
          [
            { x: 100, y: 100 },
            { x: 120, y: 140 },
            { x: 100, y: 180 },
            { x: 80, y: 140 }
          ],
          { fill: 'green' }
        );
        canvas.add(diamond);
        break;
      // You can add more shapes like arrows, triangles, etc.
      default:
        console.warn('Shape not implemented');
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg w-24 bg-white max-h-[100px]">
      <div className="flex flex-wrap justify-center">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => addShape(shape.id)}
            className={`p-2 cursor-pointer rounded ${
              selectedShape === shape.id ? 'bg-blue-100' : 'bg-transparent'
            }`}
          >
            {shape.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;

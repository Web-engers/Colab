import React, { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useParams } from 'react-router-dom';

const SetDimension = ({ height, setHeight, width, setWidth}) => {
  const params = useParams()
  const increaseHeight = () => setHeight((prevHeight) => Math.min(1200, prevHeight + 10));
  const decreaseHeight = () => setHeight((prevHeight) => Math.max(0, prevHeight - 10));
  const increaseWidth = () => setWidth((prevWidth) => Math.min(1200, prevWidth + 10));
  const decreaseWidth = () => setWidth((prevWidth) => Math.max(0, prevWidth - 10));

  const updateDimension = async () => {
    try {
      console.log("changing size")
      const currData = await getDoc(doc(db, "boards", params.id));
      const currCanva = currData.data().canvas; 
      await updateDoc(doc(db, "boards", params.id), {
        canvas: { ...currCanva, size:{width, height} }
      });
      console.log("Data saved successfully to Firebase");
    } catch (error) {
      console.error("Error saving data to Firebase: ", error);
    }
  };

  useEffect(() => {
    if (height && width) {
      updateDimension();
    }
  }, [height, width]);

  return (
    <div className="fixed bottom-2 right-2 flex space-x-3 p-2 bg-gray-100 rounded-md shadow-sm">
      <div className="flex flex-col items-center">
        <button
          onClick={increaseHeight}
          className="bg-blue-500 text-white rounded-full w-6 h-6 mb-1 text-xs hover:bg-blue-600 focus:outline-none"
        >
          +
        </button>
        <label htmlFor="height" className="text-xs font-medium text-gray-700 mb-1">H</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-12 text-center border border-gray-300 rounded p-0.5 mb-1 text-xs"
        />
        <button
          onClick={decreaseHeight}
          className="bg-blue-500 text-white rounded-full w-6 h-6 text-xs hover:bg-blue-600 focus:outline-none"
        >
          -
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={increaseWidth}
          className="bg-blue-500 text-white rounded-full w-6 h-6 mb-1 text-xs hover:bg-blue-600 focus:outline-none"
        >
          +
        </button>
        <label htmlFor="width" className="text-xs font-medium text-gray-700 mb-1">W</label>
        <input
          id="width"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-12 text-center border border-gray-300 rounded p-0.5 mb-1 text-xs"
        />
        <button
          onClick={decreaseWidth}
          className="bg-blue-500 text-white rounded-full w-6 h-6 text-xs hover:bg-blue-600 focus:outline-none"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SetDimension;

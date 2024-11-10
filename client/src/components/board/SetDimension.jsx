import React from 'react';

const SetDimension = ({ height, setHeight, width, setWidth }) => {
  const increaseHeight = () => setHeight((height) => Math.max(1200,height + 10));
  const decreaseHeight = () => setHeight((height) => Math.max(0, height - 10));

  const increaseWidth = () => setWidth((width) => Math.min(1200,width + 10));
  const decreaseWidth = () => setWidth((width) => Math.max(0, width - 10));

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
          type="text"
          value={height}
          readOnly
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
          type="text"
          value={width}
          readOnly
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

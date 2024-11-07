import React from 'react';
import Sideoptions from '../components/Sideoptions';
import Topbar from '../components/Topbar';
import CanvasProvider from '../context/CanvasContext'; // Ensure this import matches the actual export
import ShapeSelector from '../components/ShapeSelector';
import Canvas from '../components/Canvas';

const Create = () => {
  return (
    <div className="flex flex-col h-screen w-screen" style={{ backgroundColor: "#F2F2F2" }}>
      <Topbar />
      <div className='flex flex-row justify-between'>
        <CanvasProvider>
          <Sideoptions />
          <Canvas/>
          <ShapeSelector/>
        </CanvasProvider>
      </div>
    </div>
  );
};

export default Create;

import React from 'react';
import Sideoptions from '../components/Sideoptions';
import Topbar from '../components/Topbar';
import Textbar from '../components/Textbar';
import Canva, { FabricJSCanvasProvider } from '../components/Canva';

const Create = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100">
      <Topbar />
      <div className="flex flex-grow h-full">
        <Sideoptions/> 
        <div className="flex flex-col flex-grow h-full">
          <FabricJSCanvasProvider/>
        </div>
      </div>
    </div>
  );
};

export default Create;

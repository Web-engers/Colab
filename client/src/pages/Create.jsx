import React from 'react';
import Sideoptions from '../components/Sideoptions';
import Topbar from '../components/Topbar';
import Textbar from '../components/Textbar';
import Canva from '../components/Canva';

const Create = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Topbar />
      <div className="flex flex-grow h-full">
        <Sideoptions className="w-1/4" /> {/* Fixed width for Sideoptions */}
        <Canva className="flex-grow h-full" /> {/* Make Canva fill the remaining space */}
      </div>
    </div>
  );
};

export default Create;

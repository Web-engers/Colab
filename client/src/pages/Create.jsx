import React from 'react';
import Sideoptions from '../components/Sideoptions';
import Topbar from '../components/Topbar';
import CanvasProvider from '../context/CanvasContext'; // Ensure this import matches the actual export
import ShapeSelector from '../components/ShapeSelector';
import Canvas from '../components/Canvas';
import Cursor from '../components/Cursor';
import { LiveCursors } from '../components/LiveCursor';
import ChatSidebar from '../components/ChatSideBar';

const Create = () => {
  const cursors = LiveCursors();
  const COLORS_PRESENCE = [
      '255, 99, 71',    // Tomato
      '30, 144, 255',   // Dodger Blue
      '50, 205, 50',    // Lime Green
      '255, 165, 0',    // Orange
      '128, 0, 128',    // Purple
      '255, 192, 203',  // Pink
    ];
  return (
    <div className="flex flex-col h-screen w-screen" style={{ backgroundColor: "#F2F2F2" }}>
      <Topbar />
      <ChatSidebar/>
      <div className='flex flex-row justify-between'>
        <CanvasProvider>
          <Sideoptions />
          <Canvas/>
          <ShapeSelector/>
        </CanvasProvider>
      </div>
      {
        cursors.map(({ x, y, connectionId }) => (
          <Cursor
            key={`cursor-${connectionId}`}
            color={`rgb(${COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]})`}
            x={x}
            y={y}
          />
        ))
      }
    </div>
  );
};

export default Create;

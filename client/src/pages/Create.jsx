import React from 'react';
import Topbar from '../components/board/Topbar';
import Cursor from '../components/liveblocks/Cursor';
import { LiveCursors } from '../components/liveblocks/LiveCursor';
import ChatSidebar from '../components/chats/ChatSidebar';
import Konva from '../components/Konva';
import SetDimension from '../components/board/SetDimension';
import { useState } from 'react';

const Create = ({height=1200, width=800}) => {
  const [height1, setHeight1] = useState(height)
  const [width1, setWidth1] = useState(width)
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
    <div className="flex flex-col w-screen overflow-scroll bg-slate-200" style={{ height:height }}>
      <div>
        <div className='flex mr-8 justify-between'>
          <Topbar />
        </div>
        <ChatSidebar/>
      </div>
      <div className='flex flex-row gap-36 justify-items-start'>
        <Konva height={height1} width={width1} />

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
      <SetDimension setHeight={setHeight1} setWidth={setWidth1} height={height1} width={width1}/>
    </div>
  );
};

export default Create;
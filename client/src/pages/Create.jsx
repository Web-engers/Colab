import React from 'react';
import Sideoptions from '../components/settings/Sideoptions';
import Topbar from '../components/board/Topbar';
import ShapeSelector from '../components/settings/ShapeSelector';
import Canvas from '../components/Konva';
import Cursor from '../components/liveblocks/Cursor';
import { LiveCursors } from '../components/liveblocks/LiveCursor';
import ChatSidebar from '../components/chats/ChatSidebar';
import Topbar2 from '../components/board/Topbar2';
import Settings from '../components/settings/Settings';
import Konva from '../components/Konva';

const Create = ({height=1200, width=800}) => {
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
    <div className="flex flex-col w-screen overflow-scroll" style={{ backgroundColor: "#F2F2F2", height:height }}>
      <div>
        <div className='flex mr-8 justify-between'>
          <Topbar />
          <Topbar2 />
        </div>
        <ChatSidebar/>
      </div>
      <div className='flex flex-row gap-36 justify-items-start'>
        <Konva height={height} width={width} />
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

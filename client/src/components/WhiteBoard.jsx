import React from 'react'
import { LiveCursors } from './LiveCursor';
import Cursor from './Cursor';
function WhiteBoard({name}) {
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
    <div>
      <h1>this is {name}</h1>
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
  )
}

export default WhiteBoard

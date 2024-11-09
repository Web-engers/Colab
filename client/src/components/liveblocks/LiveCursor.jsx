import {useEffect} from 'react';
import {useOthers, useUpdateMyPresence} from '@liveblocks/react';

export function LiveCursors() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  useEffect(() => {
    function onPointerMove(event){
      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX),
          y: Math.round(event.clientY)
        }
      })
    }
    function onPointerLeave(){
      updateMyPresence({cursor: null})
    }

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerleave",onPointerLeave)

    return () => {
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
    }

  },[updateMyPresence])

  return others
    .filter((user) => user.presence?.cursor != null)
    .map(({ connectionId, presence, id, info }) => {
      return {
        x: presence.cursor.x,
        y: presence.cursor.y,
        connectionId,
        id,
        info,
        presence,
      };
    });
}

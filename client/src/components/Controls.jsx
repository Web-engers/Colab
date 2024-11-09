import React, { useState } from 'react'
import { ACTIONS } from '../constants/action'
import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import {
    Arrow,
    Circle,
    Layer,
    Line,
    Rect,
    Stage,
    Transformer,
} from "react-konva";

const Controls = ({ action, setAction, fillColor, setFillColor, stageRef }) => {
  const [color, setColor] = useState('#000000'); // Default color
  
  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="absolute top-0 z-10 w-full py-2 ">
      <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
        <button
          className={action === ACTIONS.SELECT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
          onClick={() => setAction(ACTIONS.SELECT)}
        >
          <GiArrowCursor size={"2rem"} />
        </button>
        <button
          className={action === ACTIONS.RECTANGLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
          onClick={() => setAction(ACTIONS.RECTANGLE)}
        >
          <TbRectangle size={"2rem"} />
        </button>
        <button
          className={action === ACTIONS.CIRCLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
          onClick={() => setAction(ACTIONS.CIRCLE)}
        >
          <FaRegCircle size={"1.5rem"} />
        </button>
        <button
          className={action === ACTIONS.ARROW ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
          onClick={() => setAction(ACTIONS.ARROW)}
        >
          <FaLongArrowAltRight size={"2rem"} />
        </button>
        <button
          className={action === ACTIONS.SCRIBBLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
          onClick={() => setAction(ACTIONS.SCRIBBLE)}
        >
          <LuPencil size={"1.5rem"} />
        </button>

        <button>
            <input
            className="w-6 h-6"
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            />
        </button>

        <button onClick={handleExport}>
          <IoMdDownload size={"1.5rem"} />
        </button>
      </div>
    </div>
  );
}

export default Controls;

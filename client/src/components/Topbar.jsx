import React from 'react';
import { GrSelect } from "react-icons/gr";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { CiExport } from "react-icons/ci";

const Topbar = () => {
  return (
    <div className="bg-white flex gap-3 shadow-2xl w-1/4 h-[48px] rounded-lg m-3 justify-center items-center px-4">
      <div className="font-semibold text-3xl">miro</div>

      <div style={{ borderLeft: "1px solid #000", height: "80%" }}></div>
      
      <div className="flex-grow flex justify-center w-[40%]">
        <textarea
          className="text-xl font-medium text-left pt-[6px] px-3 resize-none h-[40px] w-full overflow-hidden"
          placeholder="Untitled"
        />
      </div>
      <div style={{ borderLeft: "1px solid #000", height: "80%" }}></div>
      <button className="flex items-center gap-1">
        <span>Export</span>
        <CiExport size={20} />
      </button>
    </div>
  );
};

export default Topbar;

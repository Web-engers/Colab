import React from 'react'
import { GrSelect } from "react-icons/gr";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { CiExport } from "react-icons/ci";



const Topbar = () => {
  return (
    <div className='bg-white flex justify-between gap-3 shadow-2xl w-1/4 h-[48px] rounded-lg m-3 px-5 py-2 ' >
            <div className='font-semibold text-3xl'>miro</div>
            <div >Until..</div>
            <button className='flex gap-1'>
                <span>Export</span>
                <CiExport  size={20}/>
            </button>

    </div>
  )
}

export default Topbar
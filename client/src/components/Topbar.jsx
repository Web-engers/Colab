import React from 'react'
import { GrSelect } from "react-icons/gr";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { CiExport } from "react-icons/ci";



const Topbar = () => {
  return (
    <div className='w-screen flex justify-between h-[60px px-5 py-5 bg-gradient-to-r from-cyan-300 from-10% via-blue-500 via-30% to-red-100 to-90% '>
        <div className='flex justify-between gap-14'>
            <div>logo</div>
            <div className='font-semibold'>File*</div>
            
            <div className="grid grid-cols-3 divide-x gap-10">
                <button><GrSelect size={20} /></button>
                <button><FaUndo  size={18}/></button>
                <button><FaRedo  size={18}/></button>
            </div>
        </div>
        <div className='flex gap-2'>
            Export
            <CiExport  size={20}/>
        </div>

    </div>
  )
}

export default Topbar
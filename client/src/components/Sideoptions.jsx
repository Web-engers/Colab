import React, { useState } from 'react';
import { TbTemplate, TbTextSize } from "react-icons/tb";
import { FaRegImage, FaShapes } from "react-icons/fa";
import { MdOutlineDraw } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Templates from './Templates';
// import Image from './Image';
// import Text from './Text';
import Shapes from './Shapes';
//import Draw from './Draw';

const Sideoptions = () => {
    const [activeOption, setActiveOption] = useState(null);

    const handleClick = (option) => {
        setActiveOption(option);
    };

    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className='flex flex-col gap-[60px] px-5 w-[80px] p-3 bg-white h-screen fixed'>
                <button 
                    className='flex flex-col gap-2 justify-center items-center h-28 w-15 focus:bg-slate-200 rounded-lg'
                    onClick={() => handleClick("Templates")}
                >
                    <TbTemplate size={30}/>
                    <span>Templates</span>
                </button>
                <button 
                    className='flex flex-col gap-2 justify-center items-center h-28 w-15 focus:bg-slate-200 rounded-lg'
                    onClick={() => handleClick("Image")}
                >
                    <FaRegImage size={30}/>
                    <span>Image</span>
                </button>
                <button 
                    className='flex flex-col gap-2 justify-center items-center h-28 w-15 focus:bg-slate-200 rounded-lg'
                    onClick={() => handleClick("Text")}
                >
                    <TbTextSize size={30} />
                    <span>Text</span>
                </button>
                <button 
                    className='flex flex-col gap-2 justify-center items-center h-28 w-15 focus:bg-slate-200 rounded-lg'
                    onClick={() => handleClick("Shapes")}
                >
                    <FaShapes size={30}/>
                    <span>Shapes</span>
                </button>
                <button 
                    className='flex flex-col gap-2 justify-center items-center h-28 w-15 focus:bg-slate-200 rounded-lg'
                    onClick={() => handleClick("Draw")}
                >
                    <MdOutlineDraw size={30}/>
                    <span>Draw</span>
                </button>
                <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
            </div>

            {/* Content Area */}
            <div className="ml-[100px] p-5">
                {/* {activeOption === "Templates" && <Templates />}
                {activeOption === "Image" && <Image />}
                {activeOption === "Text" && <Text />} */}
                {activeOption === "Shapes" && <Shapes />}
                {/* {activeOption === "Draw" && <Draw />} */}
            </div>
        </div>
    );
}

export default Sideoptions;

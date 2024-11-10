import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Popover from '@mui/material/Popover';


function CreateWithGemini({setAnchorEl}) {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getGeminiResponse = async (prompt) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBALRAMGScOUN8HXoDf7aCOK_K4ffIdgmc");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          candidateCount: 1,
          stopSequences: ["x"],
          maxOutputTokens: 20,
          temperature: 1.0,
        },
      });
      const result = await model.generateContent("write a caption for" + prompt);
      console.log(result.response.text()); 
      setOutputValue(result.response.text())    
      return  result.response.text()
    } catch (error) {
      console.error("Error generating ideas:", error);
      throw new Error("Failed to get response from Gemini.");
    }
  };

  const handleGenerate = async () => {
    if (inputValue.trim()) {
      setLoading(true);
      try {
        const response = await getGeminiResponse(inputValue); // Pass the inputValue as the prompt
        setOutputValue(response);
      } catch (error) {
        console.error("Error generating ideas:", error);
        setOutputValue("Failed to generate ideas. Please try again.");
      } finally {
        setLoading(false);
      }
      setInputValue(""); 
    } else {
      alert("Please enter a prompt to generate ideas.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Caption your creation</h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={()=>{setAnchorEl(false)}}>
          ✖️
        </button>
      </div>

      {/* Input Box */}
      <div className="border-2 border-blue-300 rounded-lg p-4 focus-within:border-blue-500">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Decribe your event"
          className="w-full outline-none text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Output Display */}
      <div className="text-gray-600 mt-2">
        {loading ? "Generating..." : outputValue}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white rounded-lg py-2 flex items-center justify-center hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        <span className="mr-2">✨</span> {loading ? "Generating..." : "Generate caption"}
      </button>
    </div>
  );
}


export const Aibutton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Determine if the popover should be open
  const id = open ? 'ai-popover' : undefined;

  return (
    <div>
      <button
        className="transition duration-200"
        onClick={handleShareClick}
      >
        <img
          className="h-[30px] w-[75px] pl-3"
          src="https://i.ibb.co/m0NmKkR/Screenshot-2024-11-09-at-12-19-51-PM.png"
          alt="Ask AI"
        />
      </button>

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical:'bottom',
          horizontal:'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className='mt-[130px]'
      >
        <div><CreateWithGemini setAnchorEl={setAnchorEl}/></div>
      </Popover>
    </div>
  );
};
export default CreateWithGemini;

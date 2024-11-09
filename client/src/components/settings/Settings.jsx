// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@mui/material";
// import { useCanvas } from "../../context/CanvasContext";

// // Debounce function to limit frequent Firebase writes
// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), delay);
//   };
// };

// function Settings() {
//   const { canvas } = useCanvas();
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [width, setWidth] = useState("");
//   const [height, setHeight] = useState("");
//   const [radius, setRadius] = useState("");
//   const [color, setColor] = useState("");

//   // Ref for Firebase update
//   const saveCanvasStateToFirebase = ()=>{}
  
  
//   useEffect(() => {
//     if (canvas) {
//       const onSelectionCreatedOrUpdated = (event) => {
//         handleObjectSelection(event.selected[0]);
//         saveCanvasStateToFirebase();
//       };
  
//       const onSelectionCleared = () => {
//         setSelectedObject(null);
//         clearSettings();
//         saveCanvasStateToFirebase();
//       };
  
//       const onObjectModified = (event) => {
//         handleObjectSelection(event.target);
//         saveCanvasStateToFirebase();
//       };
  
//       const onObjectScaling = (event) => {
//         handleObjectSelection(event.target);
//         saveCanvasStateToFirebase();
//       };
  
//       // Prevent dragging the object when clicked on
//       const onMouseDown = (event) => {
//         // Check if an object is selected and the click is not dragging
//         if (selectedObject && !event.e.shiftKey && !event.e.ctrlKey) {
//           event.e.preventDefault(); // Prevent default mouse down behavior
//         }
//       };
  
//       // Event listeners for canvas interactions
//       canvas.on("selection:created", onSelectionCreatedOrUpdated);
//       canvas.on("selection:updated", onSelectionCreatedOrUpdated);
//       canvas.on("selection:cleared", onSelectionCleared);
//       canvas.on("object:modified", onObjectModified);
//       canvas.on("object:scaling", onObjectScaling);
//       canvas.on("mouse:down", onMouseDown);
  
//       return () => {
//         // Clean up event listeners on component unmount
//         canvas.off("selection:created", onSelectionCreatedOrUpdated);
//         canvas.off("selection:updated", onSelectionCreatedOrUpdated);
//         canvas.off("selection:cleared", onSelectionCleared);
//         canvas.off("object:modified", onObjectModified);
//         canvas.off("object:scaling", onObjectScaling);
//         canvas.off("mouse:down", onMouseDown);
//       };
//     }
//   }, [canvas, selectedObject]);
//   const handleObjectSelection = (object) => {
//     if (!object) return;

//     setSelectedObject(object);

//     if (object.type === "rect") {
//       setWidth(Math.round(object.width * object.scaleX));
//       setHeight(Math.round(object.height * object.scaleY));
//       setColor(object.fill);
//       setRadius("");
//     } else if (object.type === "circle") {
//       setRadius(Math.round(object.radius * 2 * object.scaleX));
//       setColor(object.fill);
//       setWidth("");
//       setHeight("");
//     }
//   };

//   const clearSettings = () => {
//     setWidth("");
//     setHeight("");
//     setColor("");
//     setRadius("");
//   };

//   const handleWidthChange = (e) => {
//     const value = e.target.value.replace(/,/g, "");
//     const intValue = parseInt(value, 10);

//     if (!isNaN(intValue) && intValue >= 0) {
//       setWidth(intValue);

//       if (selectedObject && selectedObject.type === "rect") {
//         selectedObject.set({ width: intValue / selectedObject.scaleX });
//         canvas.renderAll();
//       }
//     }
//   };

//   const handleHeightChange = (e) => {
//     const value = e.target.value.replace(/,/g, "");
//     const intValue = parseInt(value, 10);

//     if (!isNaN(intValue) && intValue >= 0) {
//       setHeight(intValue);

//       if (selectedObject && selectedObject.type === "rect") {
//         selectedObject.set({ height: intValue / selectedObject.scaleY });
//         canvas.renderAll();
//       }
//     }
//   };

//   const handleRadiusChange = (e) => {
//     const value = e.target.value.replace(/,/g, "");
//     const intValue = parseInt(value, 10);

//     if (!isNaN(intValue) && intValue >= 0) {
//       setRadius(intValue);

//       if (selectedObject && selectedObject.type === "circle") {
//         selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
//         canvas.renderAll();
//       }
//     }
//   };

//   const handleColorChange = (e) => {
//     const newColor = e.target.value;
//     setColor(newColor);

//     if (selectedObject) {
//       selectedObject.set({ fill: newColor });
//       canvas.renderAll();
//     }
//   };

//   return (
//     <div className="Settings darkmode">
//       {selectedObject && selectedObject.type === "rect" && (
//         <div className="flex flex-col">
//           <Input
//             label="Width"
//             value={width}
//             onChange={handleWidthChange}
//           />
//           <Input
//             label="Height"
//             value={height}
//             onChange={handleHeightChange}
//           />
//           <Input
//             label="Color"
//             type="color"
//             value={color}
//             onChange={handleColorChange}
//           />
//         </div>
//       )}
//       {selectedObject && selectedObject.type === "circle" && (
//         <div className="flex flex-col">
//           <Input
//             label="Radius"
//             value={radius}
//             onChange={handleRadiusChange}
//           />
//           <Input
//             label="Color"
//             value={color}
//             type="color"
//             onChange={handleColorChange}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Settings;

import React from 'react'

const Settings = () => {
  return (
    <div>Settings</div>
  )
}

export default Settings

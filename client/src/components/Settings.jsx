import React, { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { useCanvas } from "../context/CanvasContext";


function Settings() {
  const {canvas} = useCanvas()
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("");

  const saveCanvasStateToFirebase = () => {
    if (!fabricCanvas) return;
    const canvasData = canvas.toJSON();
    updateDoc(boardRef, { canvas: canvasData })
        .then(() => console.log('Canvas state updated in Firebase'))
        .catch((error) => console.error('Error updating canvas state:', error));
    return
  };

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event.selected[0]);
        //saveCanvasStateToFirebase()
      });

      canvas.on("selection:updated", (event) => {
        handleObjectSelection(event.selected[0]);
        //saveCanvasStateToFirebase()
      });

      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
        //saveCanvasStateToFirebase()
      });

      canvas.on("object:modified", (event) => {
        handleObjectSelection(event.target);
        //saveCanvasStateToFirebase()
      });

      canvas.on("object:scaling", (event) => {
        handleObjectSelection(event.target);
        //saveCanvasStateToFirebase()
      });
    }
  }, [canvas]);

  const handleObjectSelection = (object) => {
    if (!object) return;

    setSelectedObject(object);

    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill);
      setDiameter("");
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill);
      setWidth("");
      setHeight("");
    }
  };

  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setColor("");
    setDiameter("");
  };

  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setWidth(intValue);

    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setHeight(intValue);

    if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  };

  const handleDiameterChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setDiameter(intValue);

    if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);

    if (selectedObject) {
      selectedObject.set({ fill: newColor });
      canvas.renderAll();
    }
  };

  return (
    <div className="Settings darkmode">
      {selectedObject && selectedObject.type === "rect" && (
        <div className="flex flex-col">
          <input
            label="Width"
            value={width}
            onChange={handleWidthChange}
          />
          <input
            label="Height"
            value={height}
            onChange={handleHeightChange}
          />
          <input
            label="Color"
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
      )}
      {selectedObject && selectedObject.type === "circle" && (
        <div className="flex flex-col">
          <input
            label="Diameter"
            value={diameter}
            onChange={handleDiameterChange}
          />
          <input
            label="Color"
            value={color}
            type="color"
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}

export default Settings;

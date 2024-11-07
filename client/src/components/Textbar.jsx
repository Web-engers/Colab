import React from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Textbar = () => {
    const [color, setColor] = useColor("#561ecb");
  return (
    <div >
        textbar
    </div>
  )
}

export default Textbar
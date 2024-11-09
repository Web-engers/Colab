import React from 'react'

const Export = () => {
    const exportToPDF = () => {
        if (canvas) {
            const imgData = canvas.toDataURL({
                format: 'jpeg',
                quality: 0.5,
            });
            const doc = new jsPDF();
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 size in mm
            doc.save("canvas-export.pdf");
        }
    };

    return (
        <button className='bg-blue-200 rounded-lg p-2' onClick={exportToPDF}>Export</button>
    )
}

export default Export
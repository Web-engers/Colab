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

const CanvasControls = () => {
    const { addRectangle, exportToPDF } = useCanvas();

    return (
        <div>
            <button onClick={addRectangle}>Add Rectangle</button>
            <button onClick={exportToPDF}>Export as PDF</button>
        </div>
    );
};

  // const addRectangle = () => {
    //     if (canvas) {
    //         const rect = new fabric.Rect({
    //             left: 100,
    //             top: 100,
    //             fill: 'white',
    //             width: 50,
    //             height: 50,
    //             stroke: 'black',
    //             strokeWidth: 1,
    //             angle: 0,
    //         });
    //         canvas.add(rect);
    //         canvas.renderAll();
    //     }
    // };

    // addRectangle()
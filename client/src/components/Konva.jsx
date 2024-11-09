import { TbRectangle } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { MdArrowRightAlt } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { LuMousePointer2 } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa6";
import { GrTemplate } from "react-icons/gr";
import { IoText } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaFonticonsFi } from "react-icons/fa";




import {
  Arrow,
  Circle,
  Layer,
  Rect,
  Line,
  Stage,
  Text,
  Transformer,
  Image,
} from "react-konva";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../constants/action";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { CiImageOn } from "react-icons/ci";
import Export from "./board/Export";

export default function Konva({width = 400, height=400}) {
  const params = useParams();
  const stageRef = useRef();
  const transformerRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#000");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isPaining, setIsPaining] = useState(false); 
  const [currentShapeId, setCurrentShapeId] = useState(null);
  const [savedData, setSavedData] = useState()
  const [selectedShape, setSelectedShape] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [showFont, setShowFont] = useState(false)


  const strokeColor = "#000";
  const isDraggable = action === ACTIONS.SELECT;

  useEffect(() => {
    if(!params.id) return
    const fetchData = async () => {
  
      try {
        const docSnap = await getDoc(doc(db, "boards", params.id));
        if (docSnap.exists()) {
          setSavedData(docSnap.data().canvas);
          if (savedData) {
            setRectangles(savedData.rectangles || []);
            setCircles(savedData.circles || []);
            setArrows(savedData.arrows || []);
            setScribbles(savedData.scribbles || []);
            setImages(savedData.images || []);
            setTexts(savedData.texts || []);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(doc(db, "boards", params.id), (docSnap) => {
      if (docSnap.exists()) {
        const savedData = docSnap.data().canvas;
        if (savedData) {
          setRectangles(savedData.rectangles || []);
          setCircles(savedData.circles || []);
          setArrows(savedData.arrows || []);
          setScribbles(savedData.scribbles || []);
        }
      }
    });


    return () => unsubscribe(); // Clean up the listener on unmount
  }, [params.id]);


  
  const saveToFirebase = async () => {
    const shapesData = {
      rectangles,
      circles,
      arrows,
      scribbles,
      texts
    };

    try {
      setTimeout(async () => {
        try {
          await updateDoc(doc(db, "boards", params.id), {
            canvas: shapesData,
          });
          console.log("Data saved successfully to Firebase");
        } catch (error) {
          console.error("Error saving data to Firebase: ", error);
        }
      }, 500);
    } catch (error) {
      console.error("Error processing save operation: ", error);
    }
  };

  const onPointerDown = () => {
    if (action === ACTIONS.SELECT) return;
  
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();
    console.log(id)
    setCurrentShapeId(id);
    setIsPaining(true);
  
    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((prev) => [
          ...prev,
          { id, x, y, height: 20, width: 20, fillColor }
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((prev) => [
          ...prev,
          { id, x, y, radius: 20, fillColor }
        ]);
        break;
      case ACTIONS.TEXT:
        setTexts((prev) => [
          ...prev,
          { id, x, y, fontSize: 30, text: 'Add Text', fontFamily: 'Calibri', fillColor:"#70737C" }
        ]);
        break;
      case ACTIONS.IMAGE:
          const img = new window.Image();
          img.src = "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D/";
          //console.log(img)
          setImages((prev) => [
            ...prev,
            { id, x, y, height: 20, width: 20, img: img }
          ]);
        break;
      case ACTIONS.ARROW:
        setArrows((prev) => [
          ...prev,
          { id, points: [x, y, x + 20, y + 20], fillColor }
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((prev) => [
          ...prev,
          { id, points: [x, y], fillColor }
        ]);
        break;
    }
  };
  
  const onPointerMove = () => {
    if (action === ACTIONS.SELECT || !isPaining) return;
  
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
  
    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((prev) =>
          prev.map((rectangle) =>
            rectangle.id === currentShapeId
              ? { ...rectangle, width: x - rectangle.x, height: y - rectangle.y }
              : rectangle
          )
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((prev) =>
          prev.map((circle) =>
            circle.id === currentShapeId
              ? { ...circle, radius: Math.sqrt(Math.pow(y - circle.y, 2) + Math.pow(x - circle.x, 2)) }
              : circle
          )
        );
        break;
      case ACTIONS.ARROW:
        setArrows((prev) =>
          prev.map((arrow) =>
            arrow.id === currentShapeId
              ? { ...arrow, points: [arrow.points[0], arrow.points[1], x, y] }
              : arrow
          )
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((prev) =>
          prev.map((scribble) =>
            scribble.id === currentShapeId
              ? { ...scribble, points: [...scribble.points, x, y] }
              : scribble
          )
        );
        break;
      case ACTIONS.TEXT:
        setTexts((prev) =>
          prev.map((text) =>
            text.id === currentShapeId
              ? { ...text, fontSize: x - text.fontSize }
              : text
          )
        );
        break;
      case ACTIONS.IMAGE:
        setImages((prev) =>
          prev.map((image) =>
            image.id === currentShapeId
              ? { ...image, width: x - image.x, height: y - image.y }
              : image
          )
        );
        break;
    }
  };

  const onPointerUp = () => {
    setIsPaining(false);
    setAction("SELECT")
    saveToFirebase(); // Save to Firebase after editing
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onClick = (e) => {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    console.log(target)
    let str = target.constructor.name;  // Change const to let
    str = str.substring(0, str.length - 1); // Stripping the 'Node' from the class name
  
    if (transformerRef.current) {
      setSelectedShape(str);
      setSelectedNode(target);
      transformerRef.current.nodes([target]);
      saveToFirebase()
    }
  };
  

  const handleColourChange = (e) => {
    if (!selectedShape) return;
    const colour = e.target.value;
    console.log(colour)
    console.log(selectedNode)

  
    if (selectedShape === "Rect") {
      setRectangles((prev) =>
        prev.map((rectangle) => {
          if (rectangle.id === selectedNode.attrs.id) {
            return { ...rectangle, fillColor: colour };
          }
          return rectangle;
        })
      );
    } else if (selectedShape === "Circle") {
      setCircles((prev) =>
        prev.map((circle) => {
          if (circle.id === selectedNode.attrs.id) {
            console.log("found circe")
            return { ...circle, fillColor: colour };
          }
          return circle;
        })
      );
    } else if (selectedShape === "Arrow") {
      setArrows((prev) =>
        prev.map((arrow) => {
          if (arrow.id === selectedNode.attrs.id) {
            return { ...arrow, fillColor: colour };
          }
          return arrow;
        })
      );
    } else if (selectedShape === "Text") {
      setTexts((prev) =>
        prev.map((text) => {
          if (text.id === selectedNode.attrs.id) {
            return { ...text, fillColor: colour };
          }
          return text;
        })
      );
    } else if (selectedShape === "Image") {
      setImages((prev) =>
        prev.map((image) => {
          if (image.id === selectedNode.attrs.id) {
            return { ...image, fillColor: colour };
          }
          return image;
        })
      );
    }

    saveToFirebase()
  };

  const deleteShape = () => {
    // if (!selectedShape) return;
  
    // const shapeMap = {
    //   "Rect": { stateSetter: setRectangles, shapes: rectangles },
    //   "Circle": { stateSetter: setCircles, shapes: circles },
    //   "Arrow": { stateSetter: setArrows, shapes: arrows },
    //   "Text": { stateSetter: setTexts, shapes: texts },
    //   "Image": { stateSetter: setImages, shapes: images }
    // };
  
    // const shape = shapeMap[selectedShape];
    // if (shape) {
    //   shape.stateSetter(shape.shapes.filter((shapeItem) => shapeItem.id !== currentShapeId));
    // }
  
    // saveToFirebase();
    if (!selectedShape) return;
  
    if (selectedShape === "Rect") {
      setRectangles((prev) =>
        prev.filter((rectangle) => {
          if (rectangle.id != selectedNode.attrs.id) {
            return rectangle;
          }
        })
      );
    } else if (selectedShape === "Circle") {
      setCircles((prev) =>
        prev.filter((circle) => {
          if (circle.id != selectedNode.attrs.id) {
            return circle;
          }
        })
      );
    } else if (selectedShape === "Arrow") {
      setArrows((prev) =>
        prev.filter((arrow) => {
          if (arrow.id != selectedNode.attrs.id) {
            return arrow;
          }
        })
      );
    } else if (selectedShape === "Text") {
      setTexts((prev) =>
        prev.filter((text) => {
          if (text.id != selectedNode.attrs.id) {
            return text;
          }
        })
      );
    } else if (selectedShape === "Image") {
      setImages((prev) =>
        prev.filter((image) => {
          if (image.id != selectedNode.attrs.id) {
            return image;
          }
        })
      );
    }

    saveToFirebase()
    selectedNode.destroy()
 
  };
  

  return (
    <div className="h-5/6 relative w-full overflow-hidden flex  justify-between">
          <div className="flex flex-col justify-center items-center gap-3 py-2 px-3 ml-4 w-[60px] border shadow-lg rounded-lg z-10 bg-white h-[550px] overflow-visible">
            <button
              className={action === ACTIONS.SELECT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.SELECT)}
            >
            
              <LuMousePointer2 size={"2rem"} />
            </button>
            <button
              className={action === ACTIONS.RECTANGLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.RECTANGLE)}
            >
              <TbRectangle size={"2rem"} />
            </button>
            <button
              className={action === ACTIONS.CIRCLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.CIRCLE)}
            >
              <FaRegCircle size={"1.5rem"} />
            </button>
            <button
              className={action === ACTIONS.ARROW ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.ARROW)}
            >
              <MdArrowRightAlt size={"2rem"} />
            </button>
            <button
              className={action === ACTIONS.SCRIBBLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.SCRIBBLE)}
            >
              <LuPencil size={"1.5rem"} />
            </button>
            <div className="flex gap-2 justify-items-start text-left">
              <button
                className={action === ACTIONS.TEXT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
                onClick={() => setAction(ACTIONS.TEXT)}
                >
                <IoText size={"2rem"} />
              </button>
              <button hidden={!showFont}>
                <FaFonticonsFi size={"2rem"}/>
              </button>
            </div>
            <button
              className={action === ACTIONS.IMAGE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
              onClick={() => setAction(ACTIONS.IMAGE)}
            >
              <CiImageOn size={"2rem"} />
            </button>
            <button>
              <GrTemplate size={"2rem"}/>
            </button>
            <button onClick={deleteShape}>
              <MdDeleteOutline size={"2rem"}/>
            </button>
            <input type="color" onChange={handleColourChange} value={fillColor} />
            <Export handleExport={handleExport}/>
          </div>
        <div className="w-[1400px] flex justify-center ">
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              height={width}
              width={height}
              fill="#ffffff"
              id="bg"
              onClick={() => {
                transformerRef.current.nodes([]);
              }}
            />

            {rectangles.map((rectangle) => (
              <Rect
                id={rectangle.id}
                x={rectangle.x}
                y={rectangle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={rectangle.fillColor}
                height={rectangle.height}
                width={rectangle.width}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {circles.map((circle) => (
              <Circle
                id={circle.id}
                radius={circle.radius}
                x={circle.x}
                y={circle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={circle.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}
            {arrows.map((arrow) => (
              <Arrow
                id={arrow.id}
                points={arrow.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={arrow.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {scribbles.map((scribble) => (
              <Line
                id={scribble.id}
                lineCap="round"
                lineJoin="round"
                points={scribble.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={scribble.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {texts.map((text) => (
              <Text
                id={text.id}
                x={text.x}
                y={text.y}
                text={text.text}
                stroke={strokeColor}
                strokeWidth={2}
                fill={text.fillColor}
                fontSize={text.fontSize}
                fontFamily={text.fontFamily}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {images.map((image) => (
              <Image
                id={image.id}
                image={image.img}
                x={image.x}
                y={image.y}
                height={image.height}
                width={image.width}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import {
  Arrow,
  Circle,
  Layer,
  Rect,
  Line,
  Stage,
  Transformer,
} from "react-konva";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../constants/action";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Konva() {
  const params = useParams();
  const stageRef = useRef();
  const transformerRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ff0000");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [isPaining, setIsPaining] = useState(false); 
  const [currentShapeId, setCurrentShapeId] = useState(null);

  const strokeColor = "#000";
  const isDraggable = action === ACTIONS.SELECT;

  // Load saved data from Firestore on component mount
  useEffect(() => {
    if(!params.id) return
    const fetchData = async () => {
  
      try {
        const docSnap = await getDoc(doc(db, "boards", params.id));
        if (docSnap.exists()) {
          const savedData = docSnap.data().canvas;
          if (savedData) {
            setRectangles(savedData.rectangles || []);
            setCircles(savedData.circles || []);
            setArrows(savedData.arrows || []);
            setScribbles(savedData.scribbles || []);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();

    // Set up a real-time listener to update the canvas for all clients
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

  // Function to save data to Firebase with a delay of 500ms
  const saveToFirebase = async () => {
    const shapesData = {
      rectangles,
      circles,
      arrows,
      scribbles,
    };

    try {
      // Set a 500ms delay before saving
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
    setCurrentShapeId(id);
    setIsPaining(true);

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((prev) => [
          ...prev,
          { id, x, y, height: 20, width: 20, fillColor },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((prev) => [
          ...prev,
          { id, x, y, radius: 20, fillColor },
        ]);
        break;
      case ACTIONS.ARROW:
        setArrows((prev) => [
          ...prev,
          { id, points: [x, y, x + 20, y + 20], fillColor },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((prev) => [
          ...prev,
          { id, points: [x, y], fillColor },
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
              ? { ...circle, radius: Math.sqrt((y - circle.y) ** 2 + (x - circle.x) ** 2) }
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
    }
  };

  const onPointerUp = () => {
    setIsPaining(false);
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
  
    // Check if transformerRef.current is defined before accessing nodes
    if (transformerRef.current) {
      transformerRef.current.nodes([target]);
    }
  };
  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 z-10 w-full py-2">
        <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
          <button
            className={action === ACTIONS.SELECT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.SELECT)}
          >
            <GiArrowCursor size={"2rem"} />
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
            <FaLongArrowAltRight size={"2rem"} />
          </button>
          <button
            className={action === ACTIONS.SCRIBBLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.SCRIBBLE)}
          >
            <LuPencil size={"1.5rem"} />
          </button>
          <button onClick={handleExport} className="hover:bg-violet-100 rounded p-1">
            <IoMdDownload size={"2rem"} />
          </button>
        </div>
      </div>

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill="#ffffff"
            id="bg"
            onClick={() => {
              transformerRef.current.nodes([]);
            }}
          />

          {rectangles.map((rectangle) => (
            <Rect
              key={rectangle.id}
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
              key={circle.id}
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
              key={arrow.id}
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
              key={scribble.id}
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

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}

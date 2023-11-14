import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, Stage, Rect, Layer } from "react-konva";
import { CgNotes } from "react-icons/cg";
// import { BiBellPlus } from "react-icons/bi";
// import { IoColorPaletteOutline } from "react-icons/io5";
// import {FaDropletSlash} from 'react-icons/fa6';
// import { MdDelete } from "react-icons/md";
// import { IoMdDoneAll } from "react-icons/io";
import "./CanvasGenerator.css";

function CanvasGenerator(props) {
  const [canvasDatabase, setCanvasDatabase] = useState([]);
  const [isCanvas, setCanvas] = useState(false);
//   const [isColorClicked, setColorClicked] = useState(false);
//   const [color,setColor] = useState('#FFFFDD');

//   const handleColorClicked = () => {
//     if(isColorClicked)
//     {
//       setColorClicked(false);
//     }
//     else
//     {
//       setColorClicked(true);
//     }
//   }


  const fetchCanvases = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-canvases", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const canvasData = await response.json();
        setCanvasDatabase(canvasData.canvases);
        if (canvasData.canvases.length > 0) {
          setCanvas(true);
        }
        console.log(canvasData.canvases);
        // Split tasks into active and completed
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  const showCanvases = (e) => {
    console.log(e.lines);

    const lines = e.lines;

    return (
      <div 
      className={"canvas-show-canvas-page"}
      >
        <div className="canvas-show-canvas-page-title"></div>
        <Stage width={400} height={300}>
          <Layer>
            <Rect width={400} height={300} fill={"#FFFFDD"} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points.map((point) => point / 4)}
                stroke={line.color}
                strokeWidth={line.drawer}
                opacity={line.opacity}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  };

  return (
    <div className="canvas-generator-component">
      <div className="canvas-create-button">
        <Link to="/canvas">Create Canvas</Link>
      </div>
      <div className="canvas-show-canvas">
        {canvasDatabase.map(showCanvases)}
      </div>
      <div
        className="canvas-initial-bg"
        style={{ display: isCanvas ? "none" : "flex" }}
      >
        <CgNotes size={80} color="rgba(0,0,0,.2)" />
        <div className="canvas-initial-bg-txt">Canvas you add appear here</div>
      </div>
    </div>
  );
}

export default CanvasGenerator;

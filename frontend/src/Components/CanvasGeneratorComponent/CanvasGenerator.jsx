import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CanvasCard from "../CanvasCard/CanvasCard";
// import { Line, Stage, Rect, Layer } from "react-konva";
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
    const title = e.title;

    return (
      <div 
      className={"canvas-show-canvas-page"}
      >
        <CanvasCard lines={lines} title={title} />
      </div>
    );
  };

  return (
    <div className="canvas-generator-component">
      <Link to="/canvas">
      <div className="canvas-create-button">
        <p>Create Canvas</p>
      </div>
      </Link>
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
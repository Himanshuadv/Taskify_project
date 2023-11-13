import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Stage, Layer, Rect, Line } from "react-konva";
import {FaPencil, FaPaintbrush} from 'react-icons/fa6';
import {BsEraserFill} from 'react-icons/bs';
import {FaHighlighter} from 'react-icons/fa';
import { SketchPicker } from 'react-color';
import "./Canvas.css";

const Canvas = (props) => {

  const [currentLines, setCurrentLines] = useState([]);
  const [drawer, setDrawer] = useState(10);
  const [color, setColor] = useState("red");
  const [opacityLine, setOpacityLine] = useState(1);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();


  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { points: [pos.x, pos.y], drawer: drawer, color: color, opacity: opacityLine }
    ]);
  };

        const strokeWidthOptions = [];
        for (let i = 1; i <= 40; i++) {
        strokeWidthOptions.push(
            <option key={i} value={i}>
            {i}
            </option>
        );
        }

  const handleSaveCanvas = async () => {
    // code for saving the canvas to the mongoDB
    try {
      const response = await fetch("http://localhost:5000/canvas", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title,line: lines }),
      });

      if (response.ok) {
        navigate('/canvas-generator');
        // alert(data.message);
      } else {
        console.error("Failed to save canvas");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length>0? lines.length - 1 : 0];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines([...lines.slice(0, lines.length - 1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="canvas-area">
    <div className="canvas-title-area">
        <textarea
          placeholder="Enter a title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
        />
      </div>
      <div className="canvas-editor-area">
      <div className="canvas-page-div">
      <Stage
        width={props.width}
        height={props.height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Rect width={props.width} height={props.height} fill="#FFFFDD" />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
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
      <div className="canvas-editor-header">
          <div className="show-color-picker">
          <SketchPicker 
            color={color}
            onChangeComplete={(color)=>{
              setColor(color.hex);
              console.log(color.hex);
            }}
          />
          </div>
          <ul>
          <li
            onClick={() => {
                setColor("red");
                setOpacityLine(1);
            }}
          >
            <FaPencil />
          </li>
          <li
            onClick={() => {
              setOpacityLine(1);
            }}
          >
            <FaPaintbrush />
          </li>
          <li
            onClick={() => {
              setColor("red");
              setOpacityLine(0.3);
            }}
          >
            <FaHighlighter />
          </li>
          <li
            onClick={() => {
              setColor("#FFFFDD");
              setOpacityLine(1);
            }}
          >
            <BsEraserFill />
          </li>
        </ul>
        <div className="canvas-stroke-width">
        <label htmlFor="strokeWidth">Stroke Width: </label>
        <select
            id="strokeWidth"
            value={drawer}
            onChange={(e) => { 
                const width = parseInt(e.target.value);
                setDrawer(width);
            }}
        >
            {strokeWidthOptions}
        </select>
        </div>
        <div 
        className="canvas-undo-canvas"
        onClick={() => {
            let updatedLines = [...lines];
            if (updatedLines.length > 0) {
            updatedLines.pop();
            }
            console.log(lines.length);
            setLines(updatedLines.length > 0 ? updatedLines : currentLines);
        }}
        >
            Undo
        </div>
        <div 
        className="canvas-clear-canvas"
        onClick={() => {
            setCurrentLines(lines); 
            setLines([]);
        }}
        >
            Clear Canvas
        </div>
        <div 
        className="canvas-clear-canvas"
        onClick={handleSaveCanvas}
        >
            Save Canvas
        </div>
      </div>
    </div>
    </div>
  );
}

export default Canvas;

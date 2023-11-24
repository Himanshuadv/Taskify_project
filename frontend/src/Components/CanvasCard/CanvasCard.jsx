import React, {useState} from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import { MdDelete, MdEdit } from 'react-icons/md';
// import {Link} from 'react-router-dom'
import './CanvasCard.css';
// import CanvasEditor from '../CanvasEditor/CanvasEditor';

function CanvasCard(props) {


  const lines = props.lines;
  // const [displayTitle, setDisplayTitle] = useState(true);
  // const [editorDisplay,setEditorDisplay] = useState(false);

  const handleDeleteClick = async (e) => {
    // Handle delete click
    try {
      const response = await fetch("http://localhost:5000/delete-canvas", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
        }),
      });

      if (response.status === 204) {
        props.fetchCanvases();
        console.log("Canvas deleted successfully");
      } else {
        console.error("Failed to delete Canvas");
      }
    } catch (error) {
      console.error("Error", error);
  }
  };

  // const handleEditClick = async () => {
  //   // Handle Edit Canvas
  //   setEditorDisplay(true);
  // }

  return (
    <div className='canvas-card'>
      <div className="canvas-show-canvas-page-title" style={{display:props.title? 'flex':'none'}}>
        {props.title}
      </div>
      <Stage width={300} height={300}>
        <Layer>
          <Rect width={300} height={300} fill={"#FFF"} />
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
      <div className="canvas-icons">
        {/* <MdEdit onClick={()=>handleEditClick()} size={24} color="#000" className="canvas-card-edit-icon" /> */}
        <span onClick={() => handleDeleteClick()}><MdDelete size={24} color="#000" className="canvas-card-delete-icon" /></span>
      </div>
      {/* <div className='canvas-card-canvas-edit-container' style={{display: editorDisplay? 'flex':'none'}}>
        <CanvasEditor lines={lines} title= {props.title} id= {props.id} />
      </div> */}
    </div>
  );
}

export default (CanvasCard);

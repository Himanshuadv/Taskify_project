import React, {useState} from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import { MdDelete, MdEdit } from 'react-icons/md';
import './CanvasCard.css';

function CanvasCard(props) {


  const lines = props.lines;
  const [displayTitle, setDisplayTitle] = useState(true);

  const handleTitle = () => {
    const title = props.title;
    if(title === '')
    {
        setDisplayTitle(false);
    }
    return (title)
  } 

  const handleDeleteClick = async (e) => {
    // Handle delete click
  };

  const handleEditClick = (e) => {
    // Handle edit click
    
  };

  return (
    <div className='canvas-card'>
      <div className="canvas-show-canvas-page-title" style={{display:displayTitle? 'block':'none'}}>
        {handleTitle}
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
        <MdEdit size={24} color="#000" onClick={() => handleEditClick()} className="canvas-card-edit-icon" />
        <MdDelete size={24} color="#000" onClick={() => handleDeleteClick()} className="canvas-card-delete-icon" />
      </div>
    </div>
  );
}

export default CanvasCard;

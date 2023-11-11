import React, {useState} from 'react';
import './AddNoteBar.css';
import { BiBellPlus } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import {AiOutlineClose} from "react-icons/ai"
import Card from '../Note/Note';
import { CgNotes } from 'react-icons/cg';

function AddNoteBar(props)
{
  function AddNote()
  {
    setIsTextFocused(false);
    setNotes([{
      title: newNoteTitle,
      text: newNoteText
    },...notes])
    console.log(notes)
    setNewNoteText('');
    setNewNoteTitle('');
    setNote(true);
  }

  const [notes,setNotes] = useState([]);
  const [isTextFocused, setIsTextFocused] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const textareaTitleRef = React.createRef();
  const [isNote,setNote] = useState(false);


  return(
    <div className="megadiv">
      <div className="add-note-bar">
      <div className="add-note-bar-top">
      <textarea
            className="add-note-title"
            placeholder="Title"
            style={{display: isTextFocused? 'block':'none'}}
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            ref={textareaTitleRef}
          />   
      <span 
      className="add-note-bar-cross"
      style={{display: isTextFocused? 'block':'none'}}
      onClick={()=>setIsTextFocused(false)}
      >
        <AiOutlineClose style={{marginTop:"5px"}}/>
        </span>
      </div>
      <textarea
            className="add-note-text"
            placeholder="Take a note..."
            onClick={()=>setIsTextFocused(true)}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          />
      <div 
      className="add-note-bar-bottom"
      style={{display: isTextFocused? 'flex':'none'}}
      >
        <div className="add-note-bar-icons">
        <ul>
        <li>
          <BiBellPlus />
        </li>
        <li>
          <IoColorPaletteOutline />
        </li>
        <li>
          <MdDelete />
        </li>
        <li>
          <IoMdDoneAll />
        </li>
      </ul>
        </div>
      <div 
      className="add-note-bar-submit"
      onClick={()=>AddNote()}
      >
        Add
      </div>
      </div>
    </div>
    <div className="notes-display">
    {notes.map((note,index)=>{
      return <Card key={index} title={note.title} note={note.text} />
    })}
    <div className="notes-initial-bg" style={{ display: isNote ? 'none' : 'flex' }}>
        <CgNotes size={80} color='rgba(0,0,0,.2)'/>
        <div className="notes-initial-bg-txt">
          Notes you add appear here
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default AddNoteBar;
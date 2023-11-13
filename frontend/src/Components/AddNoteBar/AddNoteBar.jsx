import React, { useState, useEffect } from 'react';
import './AddNoteBar.css';
import { BiBellPlus } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import {FaDropletSlash} from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import {AiOutlineClose} from "react-icons/ai"
import Card from '../Note/Note';
import { CgNotes } from 'react-icons/cg';

function AddNoteBar(props)
{
  const fetchNotes = async () => {
      try {
          const response = await fetch("http://localhost:5000/get-notes", {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          },
          });
          if (response.ok) {
          const noteData = await response.json();
          setNotes(noteData.notes);
          if(noteData.notes.length>0){setNote(true);}
          console.log(noteData.notes)
          // Split tasks into active and completed
          } else {
          console.error("Failed to fetch tasks");
          }
      } catch (error) {
          console.error("Error", error);
      }
      };
  
    useEffect(() => {
        fetchNotes();
    }, []);

  const [isColorClicked, setColorClicked] = useState(false);
  const [color,setColor] = useState('white');

  const handleColorClicked = () => {
    if(isColorClicked)
    {
      setColorClicked(false);
    }
    else
    {
      setColorClicked(true);
    }
  }

  const AddNote = async () => 
  {
    setColor('white');
    if(newNoteTitle === '')
    {
      console.log("Title is required.");
    }
    else
    {try {
      const response = await fetch("http://localhost:5000/note", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNoteTitle,
          note: newNoteText,
          color: color,
          reminder: new Date(),
        }),
      });

      if (response.ok) {
        // const data = await response.json();
        fetchNotes();
        // alert(data.message);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error", error);
    }}
    setIsTextFocused(false);
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
      <div className="add-note-bar" style={{backgroundColor:color}}>
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
        <li className='add-note-bar-icons-color'
        onClick={handleColorClicked}>
          <IoColorPaletteOutline />
          <div 
          className='add-note-bar-icons-color-chooser'
          style={{display:isColorClicked? 'flex':'none'}}>
              <ul>
                <li 
                className='add-note-bar-icons-color-chooser-white'
                onClick={()=>{setColor('white')}}
                >
                <FaDropletSlash />
                </li>
                <li 
                className='add-note-bar-icons-color-chooser-red'
                onClick={()=>{setColor('#faafa8')}}
                ></li>
                <li className='add-note-bar-icons-color-chooser-blue'
                onClick={()=>{setColor('#aeccdc')}}
                ></li>
                <li className='add-note-bar-icons-color-chooser-cyan'
                onClick={()=>{setColor('#efeff1')}}
                ></li>
                <li className='add-note-bar-icons-color-chooser-yellow'
                onClick={()=>{setColor('#fff8b8')}}
                ></li>
                <li className='add-note-bar-icons-color-chooser-custom'
                onClick={()=>{setColor('#b4ddd3')}}
                ></li>
              </ul>
          </div>
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
      onClick={AddNote}
      >
        Add
      </div>
      </div>
    </div>
    <div className="notes-display">
    {notes.map((note,index)=>{
      return <Card key={index} id={note._id} title={note.title} note={note.note} color={note.color} />
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

import React ,{ useState, useEffect } from "react";
import { BiBellPlus } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import {FaDropletSlash} from 'react-icons/fa6';
import { IoMdDoneAll } from "react-icons/io";
import Reminder from "../Reminder/Reminder";
import { LuAlarmClock } from "react-icons/lu";
import { useTaskContext } from "../TaskContext";
import "./Note.css";

function Card(props) {

  const {displayAlertAtTime} = useTaskContext();
  const [isColorClicked, setColorClicked] = useState(false);
  const [color,setColor] = useState(props.color);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlarm,setIsAlarm] = useState(props.reminder);
  const [reminder,setReminder] = useState(props.reminder);
  const [reminderMessage,setReminderMessage] = useState(props.reminderText);

  useEffect(() => {
    displayAlertAtTime(props.id, props.note, props.reminder, props.reminderText);
  },[]);

  const handleDeleteClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/delete-note", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id
        }),
      });

      if (response.ok) {
        props.updateNotes();
        console.log("Note deleted successfully");
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error", error);
  }
}

  const handleColorClicked = () => {
    setColorClicked(!isColorClicked);
    setIsOpen(false);
  }

  const handleColorChoosed = async (e) => {
    const style = window.getComputedStyle(e.target);
    const backgroundColor = style.backgroundColor;
    setColor(backgroundColor);
    try {
      const response = await fetch("http://localhost:5000/update-note-color", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: backgroundColor,
          id: props.id
        }),
      });

      if (response.ok) {
        console.log("Color updated successfully");
      } else {
        console.error("Failed to update color of note");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className="note" style={{backgroundColor:color}}>
      <span className="note-tick">
        <MdTaskAlt size={26} />
      </span>
      <div className="note-text">
        <h2>{props.title}</h2>
        <div className="note-inner-text">
          <p>{props.note}</p>
        </div>
      </div>
      <div className="note-handle">
        <li onClick={()=>{setIsOpen(!isOpen); setColorClicked(false);}}>
          <BiBellPlus />
        </li>
        <li 
        className="add-note-bar-icons-color"
        onClick={handleColorClicked}
        >
          <IoColorPaletteOutline />
          <div 
          className='add-note-bar-icons-color-chooser'
          style={{display:isColorClicked? 'flex':'none'}}>
              <ul>
                <li 
                className='add-note-bar-icons-color-chooser-white'
                onClick={handleColorChoosed}
                >
                <FaDropletSlash />
                </li>
                <li 
                className='add-note-bar-icons-color-chooser-red'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-blue'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-cyan'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-yellow'
                onClick={handleColorChoosed}
                ></li>
                <li className='add-note-bar-icons-color-chooser-custom'
                onClick={handleColorChoosed}
                ></li>
              </ul>
          </div>
        </li>
        <li
          onClick={handleDeleteClick}
        >
          <MdDelete />
        </li>
        <li>
          <IoMdDoneAll />
        </li>
      </div>
      <Reminder 
      setIsAlarm={setIsAlarm} 
      display={isOpen? 'flex' : 'none'} 
      id={props.id} 
      note={props.note}
      setIsOpen={setIsOpen}
      setReminderMessage={setReminderMessage}
      setReminder={setReminder}
      />
      <span className="note-alarm-clock" style={{display: isAlarm? 'block' : 'none' }} ><LuAlarmClock /></span>
      <div className="note-alarm-details">
        <h6>{reminderMessage}</h6>
        <p>{reminder}</p>
      </div>
    </div>
  );
}

export default Card;

import React from "react";
import { BiBellPlus } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import "./Note.css";

function Card(props) {
  return (
    <div className="note">
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
      </div>
    </div>
  );
}

export default Card;

import React, { useState } from "react";
import "./Daily.css";
// import { SlOptionsVertical } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppContext } from "../context";
import { RiMenu2Fill } from "react-icons/ri";
import { VscTriangleRight } from "react-icons/vsc";


const Daily = (props) => {

  const {toggleAddDailyVisibility} = useAppContext();
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);


  console.log(clicked);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleChecklistToggle = () => {
    setShowChecklist(!showChecklist);
  };
  const handleCheckItemClick = (item) => {
    const updatedCheckedItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];
    setCheckedItems(updatedCheckedItems);
  };
  const handleDailyTaskDelete = async () => {
    try {
      const response = await fetch("http://localhost:8000/delete-daily-task", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dailyId: props.dailyId, // Pass the task's unique identifier here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        props.updateDailies();
      } else {
        console.error("Failed to delete daily task.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleTickClick = async () => {
    setClicked(true);

    // Make an HTTP request to update the task's status
    try {
      const response = await fetch(
        "http://localhost:8000/update-daily-status",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dailyId: props.dailyId, // Pass the task's unique identifier here
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        props.updateDailies();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className={`daily ${props.status === true ? "completed" : ""}`}>
      <div className="daily-tick">
        <div onClick={handleTickClick} className="tick">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M6.54 13c-.3 0-.59-.13-.81-.35L2 8.75l1.62-1.69 2.86 2.98L12.26 3 14 4.56l-6.59 8.02c-.21.25-.51.4-.83.42h-.04z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div onClick={handleDailyTaskDelete} className="delete-icon">
        <RiDeleteBin6Line />
      </div>
      <div className="daily-clickable-area">
        <div className="daily-title">
        <p>{props.text}</p>
        </div>
        <div className="daily-notes">
          <p>{props.note}</p>
        </div>
        {props.checklist && (
            <div style={{display: props.checklist.length === 0 ? 'none':'block'}}>
              <div onClick={handleChecklistToggle} className="checklist-toggle">
                <div className="checklist-toggle-icon">
                  <RiMenu2Fill />
                </div>
                <div className="checklist-count">
                  {props.checklist.length}
                </div>
                <div className="checklist-arrow">
                  <VscTriangleRight />
                </div>
              </div>
              {showChecklist && (
                <ul className="checklist">
                  {props.checklist.map((item, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(item)}
                          onChange={() => handleCheckItemClick(item)}
                        />
                        <span className={checkedItems.includes(item) ? "checked" : ""}>
                          {item}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
      </div>
      <div className="grab"></div>
      <div className={`daily-tags ${isHovered ? "tags-hovered" : ""}`}>
        <div className="tags-list">
        <p>Tags: </p>
        {props.tags.map((tag,index)=>{
            return (<div className="tag-name">
              {tag}
            </div>
            )
          })}
        </div>
      </div>
      <div
            style={{display: props.tags.length === 0 ? 'none':'block'}}
            className="tags-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M10 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM2.004 6.994L7 2h5l-.004 5.006L7 12l.004-.004-5-5.002zM0 7c0 .55.22 1.05.59 1.41l5 5a1.996 1.996 0 0 0 2.83 0l4.99-4.99c.37-.37.59-.87.59-1.42V2c0-1.11-.89-2-2-2H7c-.55 0-1.05.22-1.41.58l-5 5C.23 5.94 0 6.44 0 7z"></path></svg>
            </div>
    </div>
  );
};

export default Daily;

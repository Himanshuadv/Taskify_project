import React, {useState} from 'react'
import './Daily.css'
import {SlOptionsVertical} from 'react-icons/sl'
import {RiDeleteBin6Line} from 'react-icons/ri'

const Daily = (props) => {

    const [clicked, setClicked] = useState(false);

    const handleDailyTaskDelete = async () => {
      try {
        const response = await fetch("http://localhost:5000/delete-daily-task", {
          method: "DELETE",
          credentials:"include",
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
    }
    const handleTickClick = async () => {
      setClicked(true);
  
      // Make an HTTP request to update the task's status
      try {
        const response = await fetch("http://localhost:5000/update-daily-status", {
          method: "PUT",
          credentials:"include",
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
          console.error("Failed to update task status");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

  return (
    <div className= {`daily ${props.status===true ? "completed" : ""}`}>
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
        <p>{props.text}</p>
      </div>
      <div className="grab"></div>
    </div>
  )
}

export default Daily

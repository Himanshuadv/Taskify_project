import React, { useState } from "react";
import "./Task.css";

const Task = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleTickClick = async () => {
    setClicked(true);

    // Make an HTTP request to update the task's status
    try {
      const response = await fetch("http://localhost:5000/update-task-status", {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: props.taskId, // Pass the task's unique identifier here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        props.updateTasks();
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className= {`task ${props.status==="completed" ? "completed" : ""}`}>
      <div className="task-tick">
        <div onClick={handleTickClick} className="tick">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M6.54 13c-.3 0-.59-.13-.81-.35L2 8.75l1.62-1.69 2.86 2.98L12.26 3 14 4.56l-6.59 8.02c-.21.25-.51.4-.83.42h-.04z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div className="task-clickable-area">
        <p>{props.text}</p>
      </div>
      <div className="grab"></div>
    </div>
  );
};

export default Task;
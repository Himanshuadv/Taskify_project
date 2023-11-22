import React, { useState, useEffect } from "react";
import "./Column.css";
import Task from "../Task/Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTaskContext } from "../TaskContext"; // Import the context hook

const Column = () => {
  // Replace local state with context state
  const { activeTasks, completedTasks, fetchTasks, setActiveTasks, setCompletedTasks } = useTaskContext();
  const [newTaskText, setNewTaskText] = useState("");
  const [clicked, setClicked] = useState("active");
  const [tasksAdded, setTasksAdded] = useState(false);
  const textareaRef = React.createRef();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Update the effect dependency to include fetchTasks

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(activeTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    // Update context state with the reordered tasks
    if (clicked === "active") {
      setActiveTasks(reorderedTasks);
    } else {
      setCompletedTasks(reorderedTasks);
    }
  };

  const handleItemClick = (item) => {
    setClicked(item);
  };

  const handleAddTask = async () => {
    textareaRef.current.blur();
    if (newTaskText.trim() === "") {
      return;
    }

    try {
      setTasksAdded(true);
      const response = await fetch("http://localhost:5000/task", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskText }),
      });

      if (response.ok) {
        const data = await response.json();
        setNewTaskText("");
        fetchTasks();
        console.log(data);
        // alert(data.message);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="column">
      <div className="column-top">
        <div className="column-title">
          <h2>To Do's</h2>
        </div>
        <ul>
          <li
            onClick={() => handleItemClick("active")}
            className={clicked === "active" ? "clicked" : ""}
          >
            Active
          </li>
          <li
            onClick={() => handleItemClick("completed")}
            className={clicked === "completed" ? "clicked" : ""}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="list">
        <div className="tip-task-container">
          <textarea
            className="quick-add"
            placeholder="Add a To Do"
            rows={1}
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            ref={textareaRef}
          />
          <div className="tip">
            <strong>Tip:</strong> Reorder tasks using drag and drop. Click and
            hold the task, then move it to your desired position.
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  className="tasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {clicked === "active"
                    ? activeTasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task
                                title={task.title}
                                taskId={task._id}
                                status={clicked}
                                updateTasks={fetchTasks}
                                note={task.note}
                                priority={task.priority}
                                checklist={task.checklist}
                                tags={task.tags}
                                done={task.done}
                                endDate={task.endDate}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    : completedTasks.map((task, index) => (
                            <div>
                            <Task
                                title={task.title}
                                taskId={task._id}
                                status={clicked}
                                updateTasks={fetchTasks}
                                note={task.note}
                                priority={task.priority}
                                checklist={task.checklist}
                                tags={task.tags}
                                done={task.done}
                                endDate={task.endDate}
                              />
                            </div>
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          className="bg-initial-desc"
          style={{ display: tasksAdded ? "none" : "flex" }}
        >
          <div className="to-do-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.343 14.916c-.312 0-.61-.123-.831-.344l-3.831-3.831 1.662-1.662 2.934 2.934 5.938-6.929L16 6.613l-6.764 7.893a1.182 1.182 0 0 1-.848.409l-.045.001zM18 16c0 1.103-.897 2-2 2H4c-1.102 0-2-.897-2-2V4c0-1.103.898-2 2-2h12c1.103 0 2 .897 2 2v12zM16 0H4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z"
              ></path>
            </svg>
          </div>
          <h3>These are your To Do's</h3>
          <div className="small-text-desc">
            To Do's need to be completed once. Add checklists to your To Do's to
            increase their value.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;

import React, { useState, useEffect } from "react";
import "./DailiesColumn.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Daily from "../Daily/Daily";
import { useTaskContext } from "../TaskContext";

const DailiesColumn = () => {
  const [clicked, setClicked] = useState("all");
  const textareaRef = React.createRef();
  const {newDailiesText,setNewDailiesText,dailiesAdded,setDailiesAdded,dailies,setDailies,notdue,setNotDue,due,setDue,fetchDailies} = useTaskContext();

  const handleItemClick = (item) => {
    setClicked(item);
  };

  useEffect(() => {
    fetchDailies();
  }, []);

  const handleAddDailies = async () => {
    textareaRef.current.blur();
    if (newDailiesText.trim() === "") {
      return;
    }
    try {
      setDailiesAdded(true);
      const response = await fetch("http://localhost:8000/dailies", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newDailiesText }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNewDailiesText("");
        fetchDailies();
      } else {
        console.error("Failed to add dailies");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedDailies = Array.from(dailies); // Create a copy of the tasks array
    const [removed] = reorderedDailies.splice(result.source.index, 1);
    reorderedDailies.splice(result.destination.index, 0, removed);

    setDailies(reorderedDailies); // Update the state with the reordered tasks
  };
  return (
    <div className="column">
      <div className="column-top">
        <div className="column-title">
          <h2>Dailies</h2>
        </div>
        <ul>
          <li
            onClick={() => handleItemClick("all")}
            className={clicked === "all" ? "clicked" : ""}
          >
            All
          </li>
          <li
            onClick={() => handleItemClick("due")}
            className={clicked === "due" ? "clicked" : ""}
          >
            Due
          </li>
          <li
            onClick={() => handleItemClick("not-due")}
            className={clicked === "not-due" ? "clicked" : ""}
          >
            Not Due
          </li>
        </ul>
      </div>
      <div className="list">
        <div className="tip-dailies-container">
          <textarea
            className="quick-add"
            placeholder="Add a Daily"
            rows={1}
            value={newDailiesText}
            onChange={(e) => setNewDailiesText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddDailies()}
            ref={textareaRef}
          />
          <div className="tip">
            <strong>Tip:</strong> Reorder tasks using drag and drop. Click and
            hold the task, then move it to your desired position.
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dailies">
              {(provided) => (
                <div
                  className="tasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {clicked === "all"
                    ? dailies.map((daily, index) => (
                        <Draggable
                          key={daily._id}
                          draggableId={daily._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Daily
                                key={daily._id}
                                note={daily.note}
                                checklist={daily.checklist}
                                tags={daily.tags}
                                text={daily.title}
                                dailyId={daily._id}
                                status={daily.done}
                                updateDailies={fetchDailies}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    : clicked === "due"
                    ? due.map((daily, index) => (
                        <div>
                          <Daily
                            key={daily._id}
                            note={daily.note}
                            checklist={daily.checklist}
                            tags={daily.tags}
                            text={daily.title}
                            dailyId={daily._id}
                            status={daily.done}
                            updateDailies={fetchDailies}
                          />
                        </div>
                      ))
                    : clicked === "not-due"
                    ? notdue.map((daily, index) => (
                        <div key={daily._id}>
                          <Daily
                            key={daily._id}
                            note={daily.note}
                            checklist={daily.checklist}
                            tags={daily.tags}
                            text={daily.title}
                            dailyId={daily._id}
                            status={daily.done}
                            updateDailies={fetchDailies}
                          />
                        </div>
                      ))
                    : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          className="bg-initial-desc"
          style={{ display: dailiesAdded ? "none" : "flex" }}
        >
          <div className="to-do-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20">
              <path
                fill-rule="evenodd"
                d="M13 16h2v-2h-2v2zm-4 0h2v-2H9v2zm-4 0h2v-2H5v2zm12-4h2v-2h-2v2zm-4 0h2v-2h-2v2zm-4 0h2v-2H9v2zm13-4H2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8zm2-2v10a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1V0h2v2h10V0h2v2h1a4 4 0 0 1 4 4zM5 12h2v-2H5v2z"
              ></path>
            </svg>
          </div>
          <h3>These are your Dailies</h3>
          <div className="small-text-desc">
            Dailies repeat on a regular basis. Choose the schedule that works
            best for you!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailiesColumn;

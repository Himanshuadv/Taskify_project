import React, {useState} from "react";
import "./ToDoEditContainer.css";
import { useAppContext } from '../context';
import { useTaskContext } from "../TaskContext";

const ToDoEditContainer = (props) => {

    const {fetchTasks} = useTaskContext();
    const [checklistItems, setChecklistItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');
    const [title,setTitle] = useState('');
    const [note,setNote] = useState('');
    const [dueDate,setDueDate] = useState(new Date());
    const [tags,setTags] = useState('');


    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && newItemText.trim() !== '') {
        // Add a new checklist item
        setChecklistItems([...checklistItems, newItemText]);
        // Clear the input field
        setNewItemText('');
        }
    };

    const handleTaskCreated = async () => {
        
        try {
            const response = await fetch("http://localhost:5000/task-added-through-editor", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title, note: note, checklist: checklistItems, dueDate: dueDate, tags: tags}),
            });
    
            if (response.ok) {
                setTitle('');
                setNote('');
                setChecklistItems([]);
                setTags('');
                fetchTasks();
                const data = await response.json();
                console.log(data);
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error", error);
        }
    
    };


    const {toggleAddToDoVisibility} = useAppContext();
    return (
    <div className="edit-container todo-editor">
        <div className="edit-container-top">
        <div className="edit-container-top-head">
            <h2>Create To Do</h2>
            <div className="cancel-create-btn">
            <button onClick={toggleAddToDoVisibility} className="cancel-edit-btn">Cancel</button>
            <button className="create-edit-btn" onClick={handleTaskCreated}>Create</button>
            </div>
        </div>
        <div className="title-input-div">
            <p>Title*</p>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} id="title-input" type="text" placeholder="Add a title" />
        </div>
        <div className="notes-input-div">
            <p>Notes</p>
            <textarea value={note} onChange={(e)=>setNote(e.target.value)} id="notes-input" type="text" placeholder="Add notes"/>
        </div>
        </div>
        <div className="edit-container-bottom">
        <div className="checklist-container">
        <div className="checklist-items">
            {checklistItems.map((item, index) => (
            <div key={index} className="checklist-item">
                <input type="checkbox" />
                <span>{item}</span>
            </div>
            ))}
        </div>

        <div className="checklist-input-div">
            <p>Checklist</p>
            <input
            type="text"
            placeholder="New Checklist item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={handleKeyPress}
            />
        </div>
        </div>
        <div className="due-date-input-div">
            <p>Due Date</p>
            <input onChange={(e)=>setDueDate(new Date(e.target.value))} className="due-date-input" type="date"/>
        </div>
        <div className="tags-input-div">
            <p>Tags: Leave Spaces or Use Commas</p>
            <input value={tags} onChange={(e)=>setTags(e.target.value)} className="tags-input" type="text" placeholder="Add tags..."/>
        </div>
        <button onClick={handleTaskCreated} >Create</button>
        </div>
    </div>
    );
};

export default ToDoEditContainer;
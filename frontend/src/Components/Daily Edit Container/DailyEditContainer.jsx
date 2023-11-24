import React, { useState } from 'react'
import './DailyEditContainer.css'
import { useAppContext } from '../context';
import { useTaskContext } from '../TaskContext';

const DailyEditContainer = () => {

  const {fetchDailies} = useTaskContext();
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [title,setTitle] = useState('');
  const [note,setNote] = useState('');
  const [tags,setTags] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && newItemText.trim() !== '') {
    // Add a new checklist item
    setChecklistItems([...checklistItems, newItemText]);
    // Clear the input field
    setNewItemText('');
    }
  };

    const handleSaveDaily = async () => {
      toggleAddDailyVisibility();
      try {
        const response = await fetch("http://localhost:5000/daily-added-through-editor", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, note: note, checklist: checklistItems, tags: tags }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTitle('');
          setNote('');
          setChecklistItems([]);
          setTags('');
          fetchDailies();
        } else {
          console.error("Failed to add dailies");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    const {toggleAddDailyVisibility} = useAppContext();
    return (
      <div className="edit-container daily-editor">
        <div className="edit-container-top">
          <div className="edit-container-top-head">
            <h2>Create Daily</h2>
            <div className="cancel-create-btn">
              <button onClick={toggleAddDailyVisibility} className="cancel-edit-btn">Cancel</button>
              <button className="create-edit-btn" onClick={handleSaveDaily}>Create</button>
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
          <div className="tags-input-div">
            <p>Tags</p>
            <input value={tags} onChange={(e)=>setTags(e.target.value)} type="text" placeholder="Add tags..."/>
          </div>
          <button onClick={handleSaveDaily}>Create</button>
        </div>
      </div>
    );
}

export default DailyEditContainer
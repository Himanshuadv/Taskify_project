import React from 'react'
import { useAppContext } from '../context';
import './HabitsEditContainer.css'

const HabitsEditContainer = () => {
    const {toggleAddHabitVisibility} = useAppContext();
    return (
      <div className="edit-container habit-editor">
        <div className="edit-container-top">
          <div className="edit-container-top-head">
            <h2>Create Habit</h2>
            <div className="cancel-create-btn">
              <button onClick={toggleAddHabitVisibility} className="cancel-edit-btn">Cancel</button>
              <button className="create-edit-btn">Create</button>
            </div>
          </div>
          <div className="title-input-div">
            <p>Title*</p>
            <input id="title-input" type="text" placeholder="Add a title" />
          </div>
          <div className="notes-input-div">
              <p>Notes</p>
              <textarea id="notes-input" type="text" placeholder="Add notes"/>
          </div>
        </div>
        <div className="edit-container-bottom">
          <div className="tags-input-div">
            <p>Tags</p>
            <input type="text" placeholder="Add tags..."/>
          </div>
          <button>Create</button>
        </div>
      </div>
    );
}

export default HabitsEditContainer
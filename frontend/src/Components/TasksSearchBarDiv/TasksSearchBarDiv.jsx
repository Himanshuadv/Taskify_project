import React, { useState } from 'react';
import './TasksSearchBarDiv.css';
import { FiPlus } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAppContext } from '../context';
import { useTaskContext } from '../TaskContext';

const TasksSearchBarDiv = () => {

    const handleSearchBar = async (e) => {
        setSearchTask(e.target.value);
    }

    const [addTaskIsClicked, setAddTaskClicked] = useState(false);
    const [tagsClicked,setTagsClicked] = useState(false);

    const {toggleAddToDoVisibility,toggleAddDailyVisibility,toggleAddHabitVisibility,searchTask,setSearchTask} = useAppContext();

    const handleAddTaskClick = () => {
        setAddTaskClicked(!addTaskIsClicked);
    };
    const handleTagsClick = () => {
        setTagsClicked(!tagsClicked);
    }

    return (
        <div className="add-tasks-tags-div">
            <div className="search-bar">
                <input value={searchTask}  onChange={handleSearchBar} placeholder='Search' />
            </div>
            <div className="tags-dropdown-btn-div">
                <div className="tags-dropdown-btn" onClick={handleTagsClick}>
                <div className="tags-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2m10-2H7.815A2.995 2.995 0 0 0 5 10a2.996 2.996 0 0 0-2.816 2H1a1 1 0 0 0 0 2h1.184A2.995 2.995 0 0 0 5 16a2.993 2.993 0 0 0 2.815-2H15a1 1 0 0 0 0-2m-4-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2m4-2h-1.185A2.995 2.995 0 0 0 11 5a2.996 2.996 0 0 0-2.816 2H1a1 1 0 0 0 0 2h7.184A2.995 2.995 0 0 0 11 11a2.993 2.993 0 0 0 2.815-2H15a1 1 0 0 0 0-2M5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2m10-2H7.815A2.995 2.995 0 0 0 5 0a2.996 2.996 0 0 0-2.816 2H1a1 1 0 0 0 0 2h1.184A2.995 2.995 0 0 0 5 6a2.993 2.993 0 0 0 2.815-2H15a1 1 0 0 0 0-2"></path>
                    </svg>
                </div>
                <span>Tags</span>
                <div className="tags-dropdown-icon">
                    <IoMdArrowDropdown />
                </div>
                </div>
                <div className="tags-dropdown" style={{display: tagsClicked === true? "flex" : "none"}}>
                    <div className="tags-dropdown-top">
                        <p className='tags-dropdown-heading'><strong>Tags</strong></p>
                        <p className='tags-dropdown-edit'>Edit Tasks</p>
                    </div>
                    <div className="tags-dropdown-list">
                        <ul>
                            <li>
                                <input type='checkbox'/>
                                Work
                            </li>
                            <li>
                                <input type='checkbox'/>
                                Health + Wellness
                            </li>
                            <li>
                                <input type='checkbox'/>
                                Exercise
                            </li>
                            <li>
                                <input type='checkbox'/>
                                Teams
                            </li>
                            <li>
                                <input type='checkbox'/>
                                School
                            </li>
                            <li>
                                <input type='checkbox'/>
                                Creativity
                            </li>
                        </ul>
                    </div>
                    <hr className='dropdown-line'/>
                    <div className="tags-dropdown-bottom">
                        <span className='clear-filter-btn'>Clear all filters</span>
                        <span className='cancel-dropdown-btn' onClick={handleTagsClick}>Cancel</span>
                    </div>
                </div>
            </div>
            <div onClick={handleAddTaskClick} className="add-task-btn">
                <FiPlus />
                <span>Add Task</span>
                <div className="add-task-list" style={{ display: addTaskIsClicked ? 'block' : 'none' }}>
                    <ul>
                        {/* <li onClick={toggleAddHabitVisibility}>
                            <div className="add-task-li">
                            <svg className='add-task-btn-habit-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><path fill-rule="evenodd" d="M11 11H9v2H7v-2H5V9h2V7h2v2h2v2zm8 0h6V9h-6v2zm9 5c0 1.103-.897 2-2 2H16V2h10c1.103 0 2 .897 2 2v12zM4 18c-1.103 0-2-.897-2-2V4c0-1.103.897-2 2-2h10v16H4zM26 0H4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z"></path></svg>                                <span>Habit</span>
                            </div>
                        </li> */}
                        <li onClick={toggleAddDailyVisibility}>
                            <div className="add-task-li">
                                <svg className='add-task-btn-daily-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20"><path fillRule="evenodd" d="M13 16h2v-2h-2v2zm-4 0h2v-2H9v2zm-4 0h2v-2H5v2zm12-4h2v-2h-2v2zm-4 0h2v-2h-2v2zm-4 0h2v-2H9v2zm13-4H2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8zm2-2v10a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1V0h2v2h10V0h2v2h1a4 4 0 0 1 4 4zM5 12h2v-2H5v2z"></path></svg>
                                <span>Daily</span>
                            </div>
                        </li>
                        <li onClick={toggleAddToDoVisibility}>
                            <div className="add-task-li">
                                <svg className='add-task-btn-todo-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.343 14.916c-.312 0-.61-.123-.831-.344l-3.831-3.831 1.662-1.662 2.934 2.934 5.938-6.929L16 6.613l-6.764 7.893a1.182 1.182 0 0 1-.848.409l-.045.001zM18 16c0 1.103-.897 2-2 2H4c-1.102 0-2-.897-2-2V4c0-1.103.898-2 2-2h12c1.103 0 2 .897 2 2v12zM16 0H4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z"></path></svg>
                                <span>To Do</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TasksSearchBarDiv;
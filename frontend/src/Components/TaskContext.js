// TaskContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksAdded, setTasksAdded] = useState(false);

  // New state to manage active tasks
  const [activeTasks, setActiveTasks] = useState([]);

  // New state to manage completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-tasks", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const taskData = await response.json();

        // Split tasks into active and completed
        const eactiveTasks = taskData.tasks.filter((task) => !task.done);
        const ecompletedTasks = taskData.tasks.filter((task) => task.done);

        setTasks([...eactiveTasks.reverse(), ...ecompletedTasks.reverse()]);
        setTasksAdded(taskData.tasks.length > 0);

        // Update active and completed states
        setActiveTasks(eactiveTasks);
        setCompletedTasks(ecompletedTasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        tasksAdded,
        activeTasks,
        completedTasks,
        setActiveTasks,
        setCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};

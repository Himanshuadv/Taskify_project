// TaskContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from './context';
import baseurl from '../baseUrl';
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // const contextUsed = useAppContext();
  const { searchTask } = useAppContext();
  const [tasks, setTasks] = useState([]);
  const [tasksAdded, setTasksAdded] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dailiesAdded, setDailiesAdded] = useState(false);
  const [dailies, setDailies] = useState([]);
  const [notdue, setNotDue] = useState([]);
  const [due, setDue] = useState([]);
  const [newDailiesText, setNewDailiesText] = useState("");

  // New state to manage active tasks
  const [activeTasks, setActiveTasks] = useState([]);

  // New state to manage completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchDailies = async () => {
    try {
      const response = await fetch(`{baseurl}/get-dailies`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const dailiesData = await response.json();
        console.log(dailiesData.dailies + " tasks completed");
        setDailies(dailiesData.dailies.reverse());
        const completed = dailiesData.dailies.filter((daily) => daily.done);
        const notCompleted = dailiesData.dailies.filter((daily) => !daily.done);
        setNotDue(completed);
        setDue(notCompleted);
        setDailiesAdded(dailiesData.dailies.length > 0);
      } else {
        console.error("Failed to fetch dailies");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const saveNewNotification = async (e) => {
    try {
      const response = await fetch(`{baseurl}/notification`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.id,
          reminderMessage: e.message,
          note: e.note,
        }),
      });
  
      if (response.ok) {
        console.log("Notification added successfully");
      } else {
        console.error("Failed to add notification of note");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }


  const setNoteReminder = async (e) => {
    try {
      const response = await fetch(`{baseurl}/update-note-reminder`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reminder: e.time,
          id: e.id,
          message: e.message
        }),
      });
  
      if (response.ok) {
        console.log("Reminder updated successfully");
      } else {
        console.error("Failed to update reminder of note");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  const displayAlertAtTime = (id,note,targetTime, message) => {
    const currentTime = new Date().getTime();
    const timeToAlert = new Date(targetTime).getTime();
  
    // Calculate the time difference
    const timeDifference = timeToAlert - currentTime;
  
    // Check if the specified time has already passed
    if (timeDifference > 0) {
      // Set a timeout to display the alert at the specified time
      setTimeout(() => {
        const data = {
          id: id,
          note: note,
          message: message,
        }
        saveNewNotification(data);
        alert(message);
        fetchNotifications();
      }, timeDifference);
    } else {
      console.log("Specified time has already passed.");
    }
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`{baseurl}/get-notification`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const notificationData = await response.json();
        setNotifications(notificationData.notifications);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch(`{baseurl}/get-tasks`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const taskData = await response.json();

        const tasks = taskData.tasks.filter((task) => {
          return task.title.toLowerCase().includes(searchTask.toLowerCase());
      });

        const eactiveTasks = tasks.filter((task) => !task.done);
        const ecompletedTasks = tasks.filter((task) => task.done);

        setTasks([...eactiveTasks.reverse(), ...ecompletedTasks.reverse()]);
        setTasksAdded(taskData.tasks.length > 0);

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
    fetchTasks();
  }, [])

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
        setNoteReminder,
        displayAlertAtTime,
        fetchNotifications,
        notifications,
        dailiesAdded,
        setDailiesAdded,
        dailies,
        setDailies,
        notdue,
        setNotDue,
        due,
        setDue,
        fetchDailies,
        newDailiesText,
        setNewDailiesText,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};

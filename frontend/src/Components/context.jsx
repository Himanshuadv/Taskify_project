import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clicked, setClicked] = useState('tasks');
  const [searchTask, setSearchTask] = useState('');

  const [isAddToDoVisible, setAddToDoVisibility] = useState(false);

  const toggleAddToDoVisibility = () => {
    setAddToDoVisibility((prev) => !prev);
  };
  const [isAddDailyVisible, setAddDailyVisibility] = useState(false);

  const toggleAddDailyVisibility = () => {
    setAddDailyVisibility((prev) => !prev);
  };
  const [isAddHabitVisible, setAddHabitVisibility] = useState(false);

  const toggleAddHabitVisibility = () => {
    setAddHabitVisibility((prev) => !prev);
  };
  const contextValue = {clicked, setClicked,isAddToDoVisible,toggleAddToDoVisibility,isAddDailyVisible,isAddHabitVisible,toggleAddDailyVisibility,toggleAddHabitVisibility,searchTask,setSearchTask};
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

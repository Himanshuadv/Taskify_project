import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clicked, setClicked] = useState('tasks');

<<<<<<< HEAD
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
  const contextValue = {clicked, setClicked,isAddToDoVisible,toggleAddToDoVisibility,isAddDailyVisible,isAddHabitVisible,toggleAddDailyVisibility,toggleAddHabitVisibility};
  return (
    <AppContext.Provider value={contextValue}>
=======
  return (
    <AppContext.Provider value={{ clicked, setClicked }}>
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25
      {children}
    </AppContext.Provider>
  );
};

<<<<<<< HEAD
export const useAppContext = () => useContext(AppContext);
=======
export const useAppContext = () => useContext(AppContext);
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25

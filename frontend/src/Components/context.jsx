import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [clicked, setClicked] = useState('tasks');

  return (
    <AppContext.Provider value={{ clicked, setClicked }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

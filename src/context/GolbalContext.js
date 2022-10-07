import React from 'react';
import { createContext } from 'react';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;

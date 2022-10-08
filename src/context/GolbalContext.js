import React from 'react';
import { createContext } from 'react';
import axiosClient from '~/axiosClient';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const getData = async ( params)=>{
    const res = await axiosClient.get(params);
    return res;
  }
  return <GlobalContext.Provider value={{
    getData
  }}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;

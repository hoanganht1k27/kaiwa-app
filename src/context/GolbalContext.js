import React from 'react';
import { createContext, useRef } from 'react';
// import axiosClient from '~/axiosClient';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const video = useRef();
  const record = useRef();
  const getData = ( params)=>{
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const email = localStorage.getItem('email');
    console.log( token);
    console.log( user_id);
    console.log( email);
    // const res = await axiosClient.get(params);
    return axios.get(params, {token:token, user_id: user_id, email:email, type: "video"});
  }
  return <GlobalContext.Provider value={{
    getData,
    video: video,
    record: record
  }}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;

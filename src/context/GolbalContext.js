import React from 'react';
import { createContext, useRef } from 'react';
// import axiosClient from '~/axiosClient';
import axios from 'axios';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
<<<<<<< HEAD
  const video = useRef();
  const record = useRef();
  const getData = ( params)=>{
=======
  const getData = (params) => {
>>>>>>> 819dde12c9f204f94a93d22157127b02c6f04bbc
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const email = localStorage.getItem('email');
    console.log(token);
    console.log(user_id);
    console.log(email);
    // const res = await axiosClient.get(params);
<<<<<<< HEAD
    return axios.get(params, {token:token, user_id: user_id, email:email, type: "video"});
  }
  return <GlobalContext.Provider value={{
    getData,
    video: video,
    record: record
  }}>{children}</GlobalContext.Provider>;
=======
    return axios.get(params, { token: token, user_id: user_id, email: email, type: 'video' });
  };

  return (
    <GlobalContext.Provider
      value={{
        getData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
>>>>>>> 819dde12c9f204f94a93d22157127b02c6f04bbc
};

export default GlobalContext;

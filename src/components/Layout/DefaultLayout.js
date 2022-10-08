import React from 'react';
import { NavLink } from 'react-router-dom';
import style from "~/asset/css/default.module.css"
import logo from '~/asset/image/image1.svg';
export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className={`grid grid-cols-12 ${style.nav}`}>
        <div className='col-span-3'>
          <img src={logo } alt="text" className={style.logo} />
        </div>
        <div className={`col-span-6 ${style.containerLink}`}>
          <NavLink className={style.link} to="/">Home</NavLink>
          <NavLink className={style.link} to="/">Video</NavLink>
          <NavLink className={style.link} to="/">Record</NavLink>
        </div>
        <div className={`col-span-3 ${style.containerIcon}`}>
          <i className={`fa-solid fa-music ${style.icon}`}></i>
          <i  className={`fa-solid fa-bell ${style.icon}`} ></i>
          <i className={`fa-solid fa-user ${style.icon}`} ></i>
        </div>
      </div>
      {children}
    </div>
  );
}

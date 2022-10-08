import React from 'react';
import { NavLink } from 'react-router-dom';
import style from "~/assets/css/default.module.css"
import logo from '~/assets/images/image1.svg';
import defaultAvatar from '~/assets/images/DefaultAvatar.svg'
export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className={`grid grid-cols-12 ${style.nav}`}>
        <div className='col-span-3'>
          <img src={logo } alt="text" className={style.logo} />
        </div>
        <div className={`col-span-4 ${style.containerLink}`}>
          <NavLink className={style.link} to="/">Home</NavLink>
          <NavLink className={style.link} to="/">Video</NavLink>
          <NavLink className={style.link} to="/">Record</NavLink>
        </div>
        <div className={`col-span-5 ${style.containerIcon}`}>
          <i className={`fa-solid fa-music ${style.icon}`}></i>
          <i  className={`fa-solid fa-bell ${style.icon}`} ></i>
          {/* <i className={`fa-solid fa-user ${style.icon}`} ></i> */}
          <img src={defaultAvatar} alt="text" className={`${style.icon}`} />
        </div>
      </div>
      {children}
    </div>
  );
}

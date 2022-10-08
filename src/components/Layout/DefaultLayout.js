import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from "~/assets/css/default.module.css"
import logo from '~/assets/images/image1.svg';
// import Notification from './Notification';
import { Dropdown, Menu, Space } from 'antd';

import defaultAvatar from '~/assets/images/DefaultAvatar.svg';
const fakeNotis = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
]
export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className={`grid grid-cols-12 ${style.nav}`}>
        <div className='col-span-4'>
          <img src={logo} alt="text" className={style.logo} />
        </div>
        <div className={`col-span-4 ${style.containerLink}`}>
          <NavLink className={style.link} to="/">Home</NavLink>
          <NavLink className={style.link} to="/">Video</NavLink>
          <NavLink className={style.link} to="/">Record</NavLink>
          <NavLink className={style.link} to="/">Ranking</NavLink>
        </div>
        <div className={`pl-4 col-span-4 ${style.containerIcon}`}>
          <i className={`fa-solid fa-music ${style.icon}`}></i>

          <Dropdown  overlay={<Menu className={style.noti} items={fakeNotis}></Menu>} trigger={['click']}>
                <i className={`fa-solid fa-bell ${style.icon}`} ></i>
          </Dropdown>
          {/* <i className={`fa-solid fa-user ${style.icon}`} ></i> */}
          <img src={defaultAvatar} alt="text" className={`${style.icon}`} />
        </div>
      </div>
      {children}
    </div>
  );
}

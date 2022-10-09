import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from "~/assets/css/default.module.css"
import logo from '~/assets/images/image1.svg';
// import Notification from './Notification';
import { Dropdown, Menu, Space } from 'antd';

import defaultAvatar from '~/assets/images/DefaultAvatar.svg';
import GlobalContext from '~/context/GolbalContext';
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
  const {video, record} = useContext(GlobalContext);
  return (
    <div >
      <div className={` z-10 fixed shadow-lg top-0 right-0 left-0 bg-white grid grid-cols-12 ${style.nav}`}>
        <div className='col-span-4'>
          <img src={logo} alt="text" className={style.logo} />
        </div>
        <div className={`col-span-4 ${style.containerLink}`}>
          <NavLink className={style.link} to="/" onClick={()=> video.current?.scrollIntoView()}>Home</NavLink>
          <NavLink className={style.link} to="/" onClick={()=> video.current?.scrollIntoView()}>Video</NavLink>
          <NavLink className={style.link} to="/" onClick={()=> record.current?.scrollIntoView()}>Record</NavLink>
          <NavLink className={style.link} to="/ranking">Ranking</NavLink>
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

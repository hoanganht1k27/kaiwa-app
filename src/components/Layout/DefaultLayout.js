import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from '~/assets/css/default.module.css';
import logo from '~/assets/images/image1.svg';
// import Notification from './Notification';
import { Dropdown, Menu, notification, Space } from 'antd';

import defaultAvatar from '~/assets/images/DefaultAvatar.svg';
import useFirestore from '~/hooks/useFirestore';
import Tippy from '@tippyjs/react';
import MenuNotification from './MenuNotification';

export default function DefaultLayout({ children }) {
  const currentUserId = localStorage.getItem('user_id');
  const [listNoti, setListNoti] = useState([]);

  const condition = useMemo(
    () => ({
      fieldName: 'student_id',
      operator: 'on',
      compareValue: currentUserId,
    }),
    [currentUserId],
  );

  const notiData = useFirestore('notifications');

  // useEffect(() => {
  //   const handleGetListNoti = () => {
  //     let noti = [];
  //     notiData.map((each) => {
  //       if (each.type === 'teacher') {
  //         if (each.teacher_id === currentUserId) {
  //           noti.push({
  //             label: 'Bạn có video cần reivew',
  //           });
  //         }
  //       }
  //     });
  //     setListNoti([...listNoti, ...noti]);
  //   };

  //   return handleGetListNoti();
  // }, [listNoti]);

  return (
    <div>
      <div className={`grid grid-cols-12 ${style.nav}`}>
        <div className="col-span-4">
          <img src={logo} alt="text" className={style.logo} />
        </div>
        <div className={`col-span-4 ${style.containerLink}`}>
          <NavLink className={style.link} to="/">
            Home
          </NavLink>
          <NavLink className={style.link} to="/">
            Video
          </NavLink>
          <NavLink className={style.link} to="/">
            Record
          </NavLink>
          <NavLink className={style.link} to="/ranking">
            Ranking
          </NavLink>
        </div>
        <div className={`pl-4 col-span-4 ${style.containerIcon}`}>
          <i className={`fa-solid fa-music ${style.icon}`}></i>
          <Tippy
            theme={'dark'}
            interactive={true}
            placement={'bottom-end'}
            animation={'fade'}
            arrow={true}
            trigger={'click'}
            allowHTML={true}
            content={<MenuNotification />}
          >
            <i className={`fa-solid fa-bell ${style.icon}`} />
          </Tippy>
          <img src={defaultAvatar} alt="text" className={`${style.icon}`} />
        </div>
      </div>
      {children}
    </div>
  );
}

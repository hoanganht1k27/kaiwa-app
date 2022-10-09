import React from 'react';
import useFirestore from '~/hooks/useFirestore';
import { Link } from 'react-router-dom';

export default function () {
  const notifications = useFirestore('notifications');
  const currentUserId = localStorage.getItem('user_id');

  return (
    <div className="p-2 w-[300px]">
      <ul className="flex flex-col gap-2">
        {notifications.map((noti) => (
          <li className="">
            {noti.type === 'student' ? (
              <Link to={`/record-detail/${noti.recordId}`} className="text-white text-base">
                {noti.student_a_id === currentUserId ? (
                  <>Your record has been checked !!!</>
                ) : (
                  noti.student_b_id === currentUserId && <>Your record has been checked !!!</>
                )}
              </Link>
            ) : (
              noti.type === 'teacher' &&
              noti.teacher_id === currentUserId && (
                <Link to={`/record-detail/${noti.recordId}`} className="text-white text-base">
                  {noti.userFullname}has uploaded a record. Check it now !!!
                </Link>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

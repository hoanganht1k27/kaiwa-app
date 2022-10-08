import React from 'react';
import useFirestore from '~/hooks/useFirestore';

export default function () {
  const notifications = useFirestore('notifications');
  const currentUserId = localStorage.getItem('user_id');

  return (
    <div className="p-2 w-[300px]">
      <ul className="flex flex-col gap-2">
        {notifications.length === 0 ? (
          <h5 className="text-white text-base">Bạn không có thông báo nào !!!</h5>
        ) : (
          <>
            {notifications.map((noti) => (
              <li className="">
                {noti.type === 'teacher' ? (
                  <a className="text-white text-base">
                    {noti.student_a_id === currentUserId ? (
                      `${noti.student_a_fullname}has uploaded a record.
                    Check it now !!!`
                    ) : noti.student_b_id === currentUserId ? (
                      `${noti.student_b_fullname}has uploaded a record.
                    Check it now !!!`
                    ) : (
                      <h5 className="text-white text-base">Bạn không có thông báo nào !!!</h5>
                    )}
                  </a>
                ) : noti.type === 'student' ? (
                  noti.student_a_id === currentUserId || noti.student_b_id === currentUserId ? (
                    <a className="text-white text-base">Your record has been checked !!!</a>
                  ) : (
                    <h5 className="text-white text-base">Bạn không có thông báo nào !!!</h5>
                  )
                ) : (
                  <h5 className="text-white text-base">Bạn không có thông báo nào !!!</h5>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import DefaultAvatar from '~/assets/images/DefaultAvatar.svg';
import { Button, notification } from 'antd';
import axios from 'axios';
import { addDocument } from '~/firebase/servieces';
import useFirestore from '~/hooks/useFirestore';
import { db } from '~/firebase/config';
const ViewDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('user_id');
  const currentUserFullname = localStorage.getItem('fullname');

  const openNotification = (fullname, roomId, index) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        key={index}
        size="normal"
        onClick={() => {
          navigate(`/room-chat/${roomId}/answer`);
        }}
      >
        Confirm
      </Button>
    );
    notification.open({
      message: 'Wating for accept...',
      description: `Please wait for ${fullname} !!!`,
      btn,
      key,
      duration: 30,
    });
  };

  useEffect(() => {
    axios.get(`/video/detail/${videoId}`).then((res) => {
      if (res.status === 200) {
        setVideo(res.data);
        setLoading(false);
      }
    });
  }, [videoId]);

  const watchingPeople = useFirestore('watching');

  useEffect(() => {
    const checkWatching = () => {
      db.collection('watching')
        .get()
        .then((snap) => {
          let added = null;
          snap.forEach((doc) => {
            if (doc.data().videoId == videoId && doc.data().uid == currentUserId) {
              added = true;
            }
          });
          if (!added) {
            addDocument('watching', {
              uid: currentUserId,
              fullname: currentUserFullname,
              videoId: videoId,
            });
          }
        });
    };

    return checkWatching;
  }, [currentUserId]);

  const rooms = useFirestore('rooms');

  // useEffect((e) => {
  //   const handler = () => {
  //     e.preventDefault();
  //     e.returnValue = 'Ngon Chay khá là ổn';
  //   };

  //   window.addEventListener('beforeunload', (e) => handler(e));

  //   return () => {
  //     window.addEventListener('beforeunload', (e) => handler(e));
  //   };
  // });

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-[50px]">
          <Spin size="large"></Spin>
        </div>
      ) : (
        <div className="px-[80px]">
          {rooms?.map((each, index) => {
            if (each.answerUid === currentUserId && each.videoId == videoId) {
              if (each.roomId) {
                openNotification(each.answerUid, each.roomId, index);
              }
            }
          })}
          <div className="flex flex-row gap-4 max-h-[80vh]">
            <div className="basis-3/4 bg-[#272343] h-full">
              <video className="hover:cursor-pointer" width="100%" height="500" controls>
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
            <div className="basis-1/4 justify-between text-center border-2 bg-[#bae8e8]">
              <div className="bg-[#27272a] text-2xl py-4 font-medium text-white ">Watching people</div>
              <div className="flex flex-col gap-2 justify-between p-3 rounded-md">
                {watchingPeople.map((user, index) => (
                  <>
                    {user.videoId == videoId && currentUserId != user.uid && (
                      <div
                        key={index}
                        className="flex flex-row p-3 rounded-md justify-between hover:bg-white hover:cursor-pointer"
                        onClick={() => {
                          addDocument('rooms', {
                            offerFullname: currentUserFullname,
                            offerUid: currentUserId,
                            answerUid: user.uid,
                            answerFullname: user.fullname,
                            videoId: videoId,
                          });
                          db.collection('rooms')
                            .where('videoId', '==', videoId)
                            .orderBy('createdAt', 'asc')
                            .onSnapshot((snapshot) => {
                              snapshot.docs.map((doc) => {
                                if (doc.data().answerUid == user.uid) {
                                  localStorage.setItem('video_id', videoId);
                                  navigate(`/room-chat/${doc.id}/offer`);
                                }
                              });
                            });
                        }}
                      >
                        <div className="flex items-center">
                          <img src={DefaultAvatar} width="40px" height="40px" alt=""></img>
                          <span className="text-lg px-3">{user?.fullname}</span>
                        </div>
                        <div>
                          <PlusCircleFilled className="text-2xl  text-[#ffd803]" />
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-5">
            <div className="basis-3/4">
              <h1 className="text-xl font-semibold">{video.name}</h1>
              <p className="mt-10 mb-20">{video.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ViewDetail;

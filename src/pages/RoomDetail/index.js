import React, {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
import { Input, Button, Spin } from 'antd';
import ChatMessage from './ChatMessage';
import { addDocument } from '~/firebase/servieces';
import useFirestore from '~/hooks/useFirestore';
import Record from './Record';
import axios from 'axios';

export default function RoomDetail() {
  const { roomId } = useParams();
  const [sendMessage, setSendMessage] = useState(null);
  const currentUserId = localStorage.getItem('user_id');
  const [loading, setLoading] = useState(true)
  const [video, setVideo] = useState()

  const videoId = localStorage.getItem('video_id')

  useEffect(() => {
    axios.get(`/video/detail/${videoId}`).then(res => {
      if(res.status === 200){
        setVideo(res.data.url)
        setLoading(false)
      }
    })
  })

  const handleOnSubmit = () => {
    try {
      if (sendMessage) {
        addDocument('messages', {
          roomId: roomId,
          sender: currentUserId,
          content: sendMessage,
        });
        setSendMessage(null);
      }
    } catch (error) {
      console.log('Toang meo chay r loi cc: ', error);
    }
  };

  const messages = useFirestore('messages');

  if(loading){
    return(
      <div className="mt-10 flex justify-center">
        <Spin></Spin>
      </div>
    )
  }
  return (
    <div className="px-8">
      <div className="flex flex-row gap-4 max-h-[80vh]">
        <div className="basis-3/4 flex justify-center bg-[#272343]">
          <video className="hover:cursor-pointer" width="650" height="360" controls>
            <source
              src={video}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="basis-1/4 flex flex-col justify-between text-center bg-[#bae8e8]">
          <div className="basis-1/12 flex justify-center items-center bg-zinc-800">
            <h1 className="text-lg text-[#fffffe]">Room Chat</h1>
          </div>
          <div className="basis-10/12 flex flex-col gap-2 p-4 overflow-y-scroll">
            {messages.length === 0 ? (
              <h1 className="text-gray-400">Message empty !!!</h1>
            ) : (
              <>
                {messages.map((message) => (
                  <>
                    {message.roomId === roomId && (
                      <ChatMessage
                        key={message.id}
                        sender={message.sender === currentUserId}
                        message={message.content}
                      />
                    )}
                  </>
                ))}
              </>
            )}
          </div>
          <div className="basis-1/12 flex flex-row h-full">
            <Input
              className="text-base basis-10/12"
              placeholder="Chatting"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              onPressEnter={() => handleOnSubmit}
            />
            <Button
              className="basis-2/12 h-full"
              type="primary"
              icon={<SendOutlined className="text-xl" />}
              block
              onClick={() => handleOnSubmit()}
            />
          </div>
        </div>
      </div>
      <div>
        <Record video />
      </div>
    </div>
  );
}

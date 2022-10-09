import React, { useEffect, useRef, useState } from 'react';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { db } from '~/firebase/config';
import { ReactMediaRecorder } from 'react-media-recorder';
import uploadFile from '~/hooks/uploadFile';
import { useNavigate, useParams } from 'react-router-dom';
import { addDocument } from '~/firebase/servieces';
import axios from 'axios';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
const pc = new RTCPeerConnection(servers);

export default function Record({ video }) {
  const { roomId, type } = useParams();
  const currentUserId = localStorage.getItem('user_id');
  const localVideo = useRef();
  const remoteVideo = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDownload = async (mediaBlobUrl) => {
    setLoading(true);
    const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
    if (blob) {
      const file = new File([blob], 'asdfasdfasdf', { type: 'audio/wav' });
      if (file) {
        const path = await uploadFile(file);
        if (path) {
          db.collection('rooms')
            .orderBy('createdAt', 'asc')
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                if (doc.id == roomId) {
                  axios
                    .post('/record/add', {
                      url: path,
                      name: video.name,
                      video_id: doc.data().videoId,
                      level: video.level,
                      topic: video.topic,
                      teacher_id: video.created_by_id,
                      student_a_id: doc.data().offerUid,
                      student_b_id: doc.data().answerUid,
                    })
                    .then((res) => {
                      console.log(res);
                      addDocument('notifications', {
                        teacherId: video.created_by_id,
                        userFullname: doc.data().offerFullname,
                        recordId: res.data._id,
                        type: 'teacher',
                      });
                      pc.close();
                      setLoading(false);
                      navigate('/');
                    });
                }
              });
            });
        }
      }
    }
  };

  useEffect(() => {
    const hanldleStart = async () => {
      if (type == 'offer') {
        const streamRes = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Push tracks from local stream to peer connection
        streamRes.getTracks().forEach((track) => {
          pc.addTrack(track, streamRes);
        });

        const remoteStream = new MediaStream();

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };

        localVideo.current.srcObject = streamRes;
        remoteVideo.current.srcObject = remoteStream;

        const callDoc = db.collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');

        pc.onicecandidate = (event) => {
          event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type,
        };

        await callDoc.set({ offer, roomId: roomId });

        callDoc.onSnapshot((snapshot) => {
          const data = snapshot.data();
          if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          }
        });

        answerCandidates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
            }
          });
        });

        const room = db.collection('rooms').doc(roomId);
        room.update({ roomId: roomId });
      } else {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };

        localVideo.current.srcObject = localStream;
        remoteVideo.current.srcObject = remoteStream;

        db.collection('calls')
          .where('roomId', '==', roomId)
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach(async (doc) => {
              const callDoc = db.collection('calls').doc(doc.id);
              const answerCandidates = callDoc.collection('answerCandidates');
              const offerCandidates = callDoc.collection('offerCandidates');
              pc.onicecandidate = (event) => {
                event.candidate && answerCandidates.add(event.candidate.toJSON());
              };

              const callData = (await callDoc.get()).data();

              const offerDescription = callData.offer;
              await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

              const answerDescription = await pc.createAnswer();
              await pc.setLocalDescription(answerDescription);

              const answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
              };

              await callDoc.update({ answer });

              offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                  }
                });
              });
            });
          });
      }
    };

    return hanldleStart;
  }, []);

  return (
    <>
      <div className="mt-5 px-[50px]">
        <div className="flex flex-row">
          <div className="basis-1/2">
            <video
              className="w-[200px] rounded-md"
              style={{ border: '4px solid #ffd803' }}
              autoPlay
              playsInline
              ref={localVideo}
            />
          </div>
          <div className="basis-1/2">
            <video className="w-[250px] rounded-md" autoPlay playsInline ref={remoteVideo} />
          </div>
        </div>
      </div>
      <div className="w-4/5 flex justify-center">
        {type === 'offer' && (
          <ReactMediaRecorder
            screen
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
              <div>
                {status === 'idle' && (
                  <button
                    className="bg-[#55C2D9] py-2 px-4 text-lg font-medium text-white rounded-lg"
                    onClick={startRecording}
                  >
                    Start Recording
                  </button>
                )}
                {status === 'recording' && (
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-center w-[24px] h-[24px] rounded-[50%] mr-2"
                      style={{ border: '2px solid #d61f2c' }}
                    >
                      <div className="bg-[#d61f2c] w-[18px] h-[18px] rounded-[50%]"></div>
                    </div>
                    <button className="bg-[#d61f2c] py-2 px-4 text-white rounded-lg" onClick={stopRecording}>
                      Stop Recording
                    </button>
                  </div>
                )}
                {status === 'stopped' && (
                  <button
                    className="bg-[#ffbd03] flex items-center py-2 px-4 text-white rounded-lg"
                    onClick={() => handleDownload(mediaBlobUrl)}
                  >
                    <span className="pr-2 text-lg font-medium">Send record</span>
                    {loading ? <LoadingOutlined className="text-base" /> : <SendOutlined className="text-base" />}
                  </button>
                )}
              </div>
            )}
          />
        )}
      </div>
    </>
  );
}

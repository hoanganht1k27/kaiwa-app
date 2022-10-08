import React, { useEffect, useRef, useState } from 'react';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import firestore from '~/firebase/config';
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import uploadFile from '~/hooks/uploadFile';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
const pc = new RTCPeerConnection(servers);

export default function Record() {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [roomId, setRoomId] = useState(null);

  const [callId, setCallId] = useState(null);

  const handleStartCall = async () => {
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

    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    setRoomId(callDoc.id);

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

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
  };

  const handleJoin = async (e) => {
    e.preventDefault();

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

    const callDoc = firestore.collection('calls').doc(callId);
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
  };

  const handleStopCall = async () => {
    pc.close();
    window.location.reload();
  };

  const handleDownload = async (mediaBlobUrl) => {
    const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
    if (blob) {
      const file = new File([blob], 'asdfasdfasdf', { type: 'audio/wav' });
      if (file) {
        const path = await uploadFile(file);
        console.log(path);
      }
    }
  };

  return (
    <>
      <div>
        <Button icon={<PlayCircleOutlined />} onClick={handleStartCall} />
        <Button icon={<PauseCircleOutlined />} onClick={handleStopCall} />
        <Input placeholder="room id" onChange={(e) => setCallId(e.target.value)} />
        <Button type="submit" icon={<PlusCircleOutlined />} onClick={(e) => handleJoin(e)} />
        <div className="flex flex-row">
          <div className="basis-1/2">
            <h1>Me</h1>
            <video autoPlay playsInline ref={localVideo} />
          </div>
          <div className="basis-1/2">
            <h1>Orther user</h1>
            <video autoPlay playsInline ref={remoteVideo} />
          </div>
        </div>
      </div>
      <div>
        <ReactMediaRecorder
          screen
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <p>{status}</p>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
              <Button icon={<VerticalAlignBottomOutlined />} onClick={() => handleDownload(mediaBlobUrl)} />
              {status === 'stopped' && <video src={mediaBlobUrl} controls autoPlay loop />}
            </div>
          )}
        />
      </div>
    </>
  );
}

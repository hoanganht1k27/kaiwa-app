import React, { useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
// import GlobalContext from '~/context/GolbalContext';
import style from '~/assets/css/home.module.css'
import Video from './Video';
import Record from './Record';
import Sort from './Sort';
import axios from 'axios';

var originVideo = null;
var originRecord = null;

export default function Home() {
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingRecord, setLoadingRecord] = useState(true);

  const [videos, setVideos] = useState([]);
  const [records, setRecords] = useState([]);
  const setAllVideo = ()=>{
    setVideos(originVideo);
  }
  const setAllRecord = ()=>{
    setRecords(originRecord);
  }
  const setLevelVideo = ( level)=>{
    var levelVideo = originVideo.filter( ( current, index)=>{
      return current.level === level;
    });
    setVideos(levelVideo);
  }
  const setTopicVideo = (topic )=>{
    var levelVideo = originVideo.filter( ( current, index)=>{
      return current.topic === topic;
    });
    setVideos(levelVideo);
  }


  const setLevelRecord = ( level)=>{
    var levelRecord = originRecord.filter( ( current, index)=>{
      return current.level === level;
    });
    setRecords(levelRecord);
  }
  
  const setTopicRecord = ( topic)=>{
    var topicRecord = originRecord.filter( ( current, index)=>{
      return current.topic === topic;
    });
    setRecords(topicRecord);
  }


  const onSearchRecord = (value) =>{
    console.log(value);
  }
  const onSearchVideo = (value) =>{
    console.log(value);
  } 
  useEffect(() => {
    var user_id = localStorage.getItem('user_id');
    const fetchData = () => {
      axios.get(`/video/get`)
        .then((res) => {
          setVideos(res.data);
          setLoadingVideo(false);
          originVideo = res.data;
        })
      axios.get(`/user/profile/${user_id}`)
        .then((res) => {
          setRecords(res.data.records);
          setLoadingRecord(false);
          originRecord = res.data.records;
        })
    }

    fetchData();
  }, []);
  if (loadingVideo && loadingRecord) {
    return <div className='mt-[200px] flex justify-center'>
      <Spin size='large'></Spin>
    </div>
  }
  return (
    <div>
      <div>
        <h1 className={style.title}>Video</h1>
        <Sort onSearch={onSearchVideo} setAll={setAllVideo} setLevel={setLevelVideo} setTopic={setTopicVideo}></Sort>
        {/* <Video videos={videos} /> */}
        {loadingVideo ? <Spin /> : <Video videos={videos} />}
      </div>
      <div>
        <h1 className={style.title}>Record</h1>
        <Sort onSearch={onSearchRecord} setAll={setAllRecord} setLevel={setLevelRecord} setTopic={setTopicRecord}></Sort>
        {loadingRecord ? <Spin /> : <Record records={records} />}
        {/* <Record records={records}></Record> */}
      </div>
    </div>
  );
}

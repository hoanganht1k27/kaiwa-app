import React, { useContext, useEffect, useState } from 'react';
import { Spin} from 'antd';
import style from '~/assets/css/home.module.css'
import Video from './Video';
import Record from './Record';
import Sort from './Sort';
import axios from 'axios';
import GlobalContext from '~/context/GolbalContext';
import NotFound from './NotFound';

var originVideo = null;
var originRecord = null;

export default function Home() {
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingRecord, setLoadingRecord] = useState(true);
  const [videos, setVideos] = useState([]);
  const [records, setRecords] = useState([]);
  
  const {video, record} = useContext(GlobalContext);
  
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
    var text = value.toLowerCase();
    var records = originRecord.filter( ( record, index) =>{
      var name = record.name.toLowerCase();
      let position = name.search( text);
      if( position === -1) return false;
      return true;
    });
    setRecords( records);
  }
  const onSearchVideo = (value) =>{
    var text = value.toLowerCase();
    var videos = originVideo.filter( ( video, index) =>{
      var name = video.name.toLowerCase();
      let position = name.search( text);
      if( position === -1) return false;
      return true;
    });
    
    
    setVideos( videos);
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
          console.log( records);
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
    <div className='mt-[60px]'>
      <div>
        <h1  id="video" className={`pt-[60px] ${style.title}`} ref={video}>Video</h1>
        <Sort onSearch={onSearchVideo} setAll={setAllVideo} setLevel={setLevelVideo} setTopic={setTopicVideo} ></Sort>
        {/* <Video videos={videos} /> */}
        {/* {loadingVideo ? <Spin /> : <Video videos={videos} />} */}
        {!videos.length ? <NotFound /> : <Video videos={videos} />}
      </div>
      <div>
        <h1 id='record' className={`pt-[60px] ${style.title}`} ref={record}>Record</h1>
        <Sort onSearch={onSearchRecord} setAll={setAllRecord} setLevel={setLevelRecord} setTopic={setTopicRecord}></Sort>
        {/* {loadingRecord ? <Spin /> : <Record records={records} />} */}
        {!records.length ? <NotFound /> : <Record records={records} />}
        {/* <Record records={records}></Record> */}
      </div>
    </div>
  );
}

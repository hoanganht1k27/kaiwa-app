import React, { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';
import GlobalContext from '~/context/GolbalContext';
import style from '~/asset/css/home.module.css'
import Video from './Video';
import Record from './Record';
import Sort from './Sort';
export default function Home() {
  const [loadingVideo, setLoadingVideo] = useState( true);
  const [loadingRecord, setLoadingRecord] = useState( true);

  const [videos, setVideos] = useState([]);
  const [records, setRecords] = useState([]);
  const { getData } = useContext(GlobalContext);
  const onSearch = (value) => console.log(value);
  useEffect(() => {
    getData('/videos')
      .then(function (res) {
        setVideos(res);
        setLoadingVideo( false);
      });
    getData('/records')
      .then(function (res) {
        setRecords(res);
        setLoadingRecord( false);
      })
  }, []);

  return (
    <div>
      <div>
        <h1 className={style.title}>Video</h1>
        <Sort onSearch={onSearch}></Sort>
        {/* <Video videos={videos} /> */}
        { loadingVideo ? <Spin/> : <Video videos={videos}/> }
      </div>
      <div>
        <h1 className={style.title}>Record</h1>
        <Sort onSearch={onSearch}></Sort>
        {loadingRecord ? <Spin /> : <Record records={records}/>}
        {/* <Record records={records}></Record> */}
      </div>
    </div>
  );
}

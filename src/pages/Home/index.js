import React, { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';
import GlobalContext from '~/context/GolbalContext';
import style from '~/assets/css/home.module.css'
import Video from './Video';
import Record from './Record';
import Sort from './Sort';
import axios from 'axios';
export default function Home() {
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingRecord, setLoadingRecord] = useState(true);

  const [videos, setVideos] = useState([]);
  const [records, setRecords] = useState([]);
  const { getData } = useContext(GlobalContext);
  const onSearch = (value) => console.log(value);
  useEffect(() => {
    // getData('/inventory/get')
    //   .then((res) => {
    //     console.log(res);
    //     setVideos(res);
    //     setLoadingVideo( false);
    //   });
    var token = localStorage.getItem('token');
    var user_id = localStorage.getItem('user_id');
    var email = localStorage.getItem('email');
    const fetchData = () => {
      axios.get(`/inventory/get?type=video`)
        .then((res) => {
          console.log(res.data);
          setVideos(res.data);
          setLoadingVideo(false);
        })
      axios.get(`/user/${user_id}/records`)
        .then((res) => {
          console.log(res.data);
          setVideos(res.data);
          setLoadingVideo(false);
        })
    }

    fetchData();
  }, []);
  if (loadingRecord || loadingRecord) {
    return <div className='mt-[200px] flex justify-center'>
      <Spin size='large'></Spin>
    </div>
  }
  return (
    <div>
      
          <div>
            <div>
              <h1 className={style.title}>Video</h1>
              <Sort onSearch={onSearch}></Sort>
              <Video videos={videos} />
              {/* {loadingVideo ? <Spin /> : <Video videos={videos} />} */}
            </div>
            <div>
              <h1 className={style.title}>Record</h1>
              <Sort onSearch={onSearch}></Sort>
              {/* {loadingRecord ? <Spin /> : <Record records={records} />} */}
              <Record records={records}></Record>
            </div>

          </div>
    </div>
  );
}

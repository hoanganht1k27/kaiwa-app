import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { PlusCircleFilled } from "@ant-design/icons"
import DefaultAvatar from '~/assets/images/DefaultAvatar.svg'

import axios from "axios";
const ViewDetail = () => {
  let { videoId } = useParams();
  const [video, setVideo] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`/video/detail/${videoId}`).then(res => {
      if(res.status === 200){
        setVideo(res.data)
        setLoading(false)
      }
    })
  },[videoId])

  if(loading){
    return(
      <div className="flex justify-center mt-[50px]">
        <Spin size="large"></Spin>
      </div>
    )
  }

  return(
    <div className="px-[80px] mt-[60px]">
      <div className="flex flex-row gap-4 max-h-[80vh]">
        <div className="basis-3/4 bg-[#272343] h-full">
          <video className="hover:cursor-pointer" width="100%" height="500" controls>
            <source
              src={video.url}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="basis-1/4 justify-between text-center border-2 bg-[#bae8e8]">
          <div className="bg-[#27272a] text-2xl py-4 font-medium text-white ">Watching people</div>
          <div className="flex justify-between mt-5 px-3 hover:cursor-pointer 
          py-3 rounded-md hover:bg-white">
            <div className="flex items-center">
              <img src={DefaultAvatar} width="40px" height="40px" alt=""></img>
              <span className="text-lg px-3">Nguyen Tien Dat</span>
            </div>
            <div >
              <PlusCircleFilled className="text-2xl  text-[#ffd803]" />
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-row gap-4 mt-5">
        <div className="basis-3/4">
          <h1 className="text-xl font-semibold">{video.name}</h1>
          <p className="mt-10 mb-20">{ video.description}</p>
        </div>
      </div>
    </div>
  )
}
export default ViewDetail
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd'
import { Form, Input, Select, message } from "antd";
import uploadFile from "~/hooks/uploadFile";
import axios from "axios";

const UploadVideo = () => {
  const navigate = useNavigate();
  const { Option } = Select
  const { TextArea } = Input
  const [image, setImage] = useState()
  const [video, setVideo] = useState()

  const handleChangeImage = async (info) => {
    setImage(info.file.originFileObj)
  }
  const handleChangeVideo = (info) => {
    setVideo(info.file.originFileObj)
  }
  
  const submitForm = async (values) => {
    const videoPath = await uploadFile(video)
    const thumbnailPath = await uploadFile(image)
    const data = values
    data.created_by_id = localStorage.getItem('user_id')
    data.url = videoPath
    data.thumbnail_url = thumbnailPath
    axios.post('/video/add',data).then(res => {
      if(res.status === 200){
        message.success("Video added successfully")
        navigate('/')
      }
    })
  }
  
  return(
    <div className="w-screen pt-[50px] px-[300px] " style={{ height: "calc(100vh - 60px)"}}>
        <div className=" text-center text-3xl text-[#272243] font font-semibold">Upload Video</div>
        <div className="mt-5">
          <Form
            name="basic"
            onFinish={submitForm}
          >
            <div className="grid grid-cols-12 gap-y-4">
              <div className="col-span-2 text-base font-medium text-right pr-10">Thumbnail: </div>
              <div className="col-span-10">
                <Upload
                  onChange={handleChangeImage}
                >
                    <Button icon={<UploadOutlined  />}>Upload Image</Button>
                </Upload>
              </div>
              <div className="col-span-2 text-base font-medium text-right pr-10">Video: </div>
              <div className="col-span-10">
                <Upload
                  onChange={handleChangeVideo}
                >
                    <Button icon={<UploadOutlined  />}>Upload Video</Button>
                </Upload>
              </div>
              <div className="col-span-2 text-base font-medium text-right pr-10">Name :</div>
              <div className="col-span-10">
                <Form.Item name="name">
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="col-span-2 text-base font-medium text-right pr-10">Topic :</div>
              <div className="col-span-4">
                <Form.Item name="topic">
                  <Input placeholder="Topic" />
                </Form.Item>
              </div>
              <div className="col-span-2 text-base font-medium text-right pr-10">Level :</div>
              <div className="col-span-4">
                <Form.Item name="level">
                  <Select>
                    <Option value="N1">N1</Option>
                    <Option value="N2">N2</Option>
                    <Option value="N3">N3</Option>
                    <Option value="N4">N4</Option>
                    <Option value="N5">N5</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-span-2 text-base font-medium text-right pr-10">Description :</div>
              <div className="col-span-10">
                <Form.Item name="desc">
                  <TextArea rows={4}/>
                </Form.Item>
              </div>
              <div className="col-span-12 flex justify-end">
                <Form.Item >
                  <Button htmlType="submit" className="w-[160px] h-[40px] text-[#272343] bg-[#ffd803] hover:bg-[#ffd803]
                  hover:opacity-8f0 hover:text-[#272343] ">Submit</Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default UploadVideo
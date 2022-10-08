import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber } from 'antd';

import ReactAudioPlayer from 'react-audio-player';
import DefaultAvatar from '~/assets/images/DefaultAvatar.svg';
const RecordDetail = () => {
  let { recordId } = useParams();

  const [feedBack, setFeedBack] = useState({
    comment: '',
    point: '',
  });

  const { TextArea } = Input;
  const handleValueChange = (changedValues, allValues) => {
    setFeedBack(allValues);
  };
  const handleSubmit = () => {};
  return (
    <div className="px-10 mt-[60px] bg-[#e3f6f5]">
      <div className="w-4/5 m-auto">
        <div className="py-1 flex justify-center bg-black">
          <video className="hover:cursor-pointer" width="750" height="500" controls>
            <source
              src="https://res.cloudinary.com/dauzcw4k5/video/upload/v1665154368/kaiwa_n5_zlicza.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="grid grid-cols-12 gap-y-3 bg-white py-10 pl-8">
          <div className="col-span-7 mt-5">
            <ReactAudioPlayer
              className="w-full"
              src="https://res.cloudinary.com/dauzcw4k5/video/upload/v1665157659/14_Track_14_benwct.mp3"
              controls
            />
          </div>
          <div className="col-span-4 col-start-9">
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">
                  <img src={DefaultAvatar} alt="" />
                </div>
                <div className="col-span-9">
                  <span className="text-lg font-medium"> Nguyen Tien Dat</span>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">
                  <img src={DefaultAvatar} alt="" />
                </div>
                <div className="col-span-9">
                  <span className="text-lg font-medium"> Nguyen Hoang Anh</span>
                </div>
              </div>
              <div className=" flex justify-center mt-3">
                <Button className="w-3/5 h-[40px] bg-[#ffd803] text-[#272343] hover:bg-[#ffd803] 
                hover:opacity-90 hover:text-[#272343]" onClick={handleSubmit}>
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-12 text-xl font-semibold w-full">
            <label htmlFor="comment">Comment</label>
          </div>
          <div className="col-span-12">
            <Form name="basic" onValuesChange={handleValueChange}>
              <div className="grid grid-cols-12">
                <div className="col-span-7">
                  <Form.Item name="comment">
                    <TextArea id="comment" rows={4} />
                  </Form.Item>
                  <div className="flex items-center  gap-x-4">
                    <span className="text-xl font-semibold">Bonus Point</span>
                    <Form.Item name="point" className="mb-0">
                      <InputNumber min={0} />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, InputNumber, Spin } from 'antd';

import DefaultAvatar from '~/assets/images/DefaultAvatar.svg';
import axios from 'axios';
import { addDocument } from '~/firebase/servieces';
const RecordDetail = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const teacher_id = localStorage.getItem('user_id');
  const isTeacher = localStorage.getItem('isTeacher');
  const [check, setCheck] = useState(false);
  let { recordId } = useParams();

  const [feedBack, setFeedBack] = useState({
    video_id: '',
    record_id: '',
    student_a_id: '',
    student_b_id: '',
    content: '',
    bonus: '',
  });
  const [myFeedBack, setMyFeedBack] = useState({});
  useEffect(() => {
    axios.get(`/record/${recordId}`).then((res) => {
      if (res.status === 200) {
        setRecord(res.data);
        const new_feedback = feedBack;
        new_feedback.video_id = res.data.video_id;
        new_feedback.record_id = res.data._id;
        new_feedback.student_a_id = res.data.student_a_id;
        new_feedback.student_b_id = res.data.student_b_id;
        setFeedBack(new_feedback);
        // setLoading(false);
      }
    });
    axios.get(`/feedback/detail/${recordId}`).then((res) => {
      // console.log( res.data);
      if (res.data.message) {
        setMyFeedBack({
          content: '',
          bonus: '',
        });
      } else {
        var a = {
          content: res.data.content,
          bonus: res.data.bonus,
        };
        setMyFeedBack(a);
      }
    });
    axios.get(`/record/${recordId}`).then((res) => {
      console.log(res.data.checked);
      setCheck(res.data.checked);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordId]);

  const { TextArea } = Input;
  const handleValueChange = (changedValues, allValues) => {
    setFeedBack({ ...feedBack, ...allValues });
  };

  const handleSubmit = () => {
    axios.post(`/feedback/${teacher_id}/add-feedback`, feedBack).then((res) => {
      if (res.status === 200) {
        console.log(res);
      }
    });
    addDocument('notifications', {
      teacher_id: teacher_id,
      student_a_id: feedBack.student_a_id,
      student_a_fullname: record.a_fullname,
      student_b_id: feedBack.student_b_id,
      student_b_fullname: record.b_fullname,
      recordId: recordId,
      type: 'student',
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <div className="px-10 pt-[60px] mt-[60px] bg-[#e3f6f5]">
      <div className="w-4/5 m-auto">
        <div className="py-1 flex justify-center bg-black">
          <video className="hover:cursor-pointer" width="750" height="500" controls>
            <source src={record?.url} type="video/mp4" />
          </video>
        </div>
        <div className="grid grid-cols-12 gap-y-3 bg-white py-10 pl-8">
          {isTeacher === 'true' && !check ? (
            <div className="col-span-7 grid grid-cols-12 mt-5">
              <div className="col-span-12 text-xl font-semibold w-full">
                <label htmlFor="content">Comment</label>
              </div>
              <div className="col-span-12">
                <Form name="basic" onValuesChange={handleValueChange}>
                  <Form.Item name="content">
                    <TextArea id="content" rows={4} />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-x-4">
                      <span className="text-xl font-semibold">Bonus Point</span>
                      <Form.Item name="bonus" className="mb-0">
                        <InputNumber min={0} />
                      </Form.Item>
                    </div>
                    <Button
                      className="w-2/5 h-[40px] bg-[#ffd803] text-[#272343] hover:bg-[#ffd803] 
                    hover:opacity-80 hover:text-[#272343]"
                      onClick={handleSubmit}
                    >
                      Send Feedback
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          ) : (
            <div className="col-span-7 grid grid-cols-12 mt-5">
              <div className="col-span-12 text-xl font-semibold w-full">
                <label htmlFor="content">Comment : </label>
                <div className="text-sm font-medium h-20 w-full">{myFeedBack.content}</div>
              </div>
              <div className="col-span-12 text-xl font-semibold w-full">
                <label htmlFor="content">Bonus Point : {myFeedBack.bonus}</label>
              </div>
            </div>
          )}
          <div className="col-span-4 col-start-9 mt-12">
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">
                  <img src={DefaultAvatar} alt="" />
                </div>
                <div className="col-span-9">
                  <span className="text-lg font-medium"> {record?.a_fullname} </span>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">
                  <img src={DefaultAvatar} alt="" />
                </div>
                <div className="col-span-9">
                  <span className="text-lg font-medium"> {record?.b_fullname} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;

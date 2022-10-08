import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import welcome from '~/assets/images/welcome.svg';
const Login = () => {
  const handleSubmit = () => {

  }

  return (
    <div
      className="w-screen h-screen bg-gradient-to-r from-[#83EAF1] to-[#63A4FF]
    flex justify-center items-center"
    >
      <div className="w-3/5 h-3/5 bg-white grid grid-cols-12 rounded-md shadow-xl">
        <div className="col-span-5 flex items-center justify-center px-5">
          <img src={welcome} alt="welcome"></img>
        </div>
        <div className="col-span-7 flex flex-col items-center">
          <h1 className="font-semibold text-3xl text-center mt-10">Welcome</h1>
          <div className="w-4/5 mt-12">
            <Form name="basic" autoComplete="off" onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input className="rounded-3xl pl-3" size="large" placeholder="Email" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                className="mt-8"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input className="rounded-3xl pl-3" size="large" placeholder="Password" prefix={<UnlockOutlined />} />
              </Form.Item>
              <Form.Item className="mt-8">
                <Button className="bg-[#63A4FF] w-full h-[40px] text-white rounded-3xl 
                hover:bg-[#63A4FF] hover:text-white hover:opacity-90"  htmlType="submit">
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

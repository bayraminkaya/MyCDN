// src/pages/Login.js
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = ({ onLogin }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {

      const userRole = values.username.toLowerCase() === 'admin' ? 'admin' : 'user';

      if (values.username.toLowerCase() === 'user') {
       
        onLogin({ username: values.username, role: userRole });
      } else {
        
        onLogin({ username: values.username, role: userRole });
      }

    } catch (error) {
      console.error('Login error:', error);
     
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Form form={form} name="login" onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

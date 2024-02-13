import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ onLogin }) => {
  const onFinish = async (values) => {
    try {
      const userRole = values.username.toLowerCase() === 'admin' ? 'admin' : 'user';
      onLogin({ username: values.username, role: userRole });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#162438' }}>
      <div style={{ maxWidth: 300, padding: 20, borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20, color: '#1890ff' }}>Login</h1>
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 10 }}>
            <Checkbox style={{ color: '#1890ff' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

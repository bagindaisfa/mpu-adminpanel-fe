import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setToken } from '../utils/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', values);
      setToken(res.data.token);
      message.success('Login sukses');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      message.error('Login gagal. Periksa email atau password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // <-- ini penting
        padding: '20px', // tambahan padding kecil kalau mobile
      }}
    >
      <Card
        title={
          <div style={{ textAlign: 'center', fontSize: 25 }}>Login Admin</div>
        }
        style={{
          width: '100%',
          maxWidth: '400px', // <-- batasi max-width supaya tidak terlalu lebar
          padding: '20px',
        }}
        hoverable
      >
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

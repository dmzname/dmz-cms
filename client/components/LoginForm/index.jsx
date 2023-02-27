import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

function LoginForm() {
  const [_, setAuth] = useContext(AuthContext);
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post('/signin', values);
      setAuth(data);
      localStorage.setItem('auth', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Row>
      <Col span={6} offset={9}>
        <h1>SignIn</h1>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginForm;

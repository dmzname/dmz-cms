import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import Link from 'next/link';
import styles from './loginform.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setAuth] = useContext(AuthContext);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/signin', values);
      setAuth(data);
      localStorage.setItem('auth', JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(err.response.data.error ? err.response.data.error : 'Server error!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <Form
        className={styles.root}
        name='normal_login'
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <h2 className={styles.title}>Sign in!</h2>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input
            style={{ padding: '10px' }}
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password
            style={{ padding: '10px' }}
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              position: 'relative',
              padding: '10px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type='primary'
            htmlType='submit'
            className='login-form-button'>
            {isLoading && <img src='/images/puff.svg' alt='spinner' className={styles.spinner} />}
            Log in
          </Button>
        </Form.Item>

        <Link className='login-form-forgot' href='/forgot-password'>
          Forgot password
        </Link>
      </Form>
    </div>
  );
}

export default LoginForm;

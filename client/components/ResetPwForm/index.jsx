import React, { useState } from 'react';
import styles from './resetpassword.module.scss';
import { Button, Form, Input } from 'antd';
import { BarcodeOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function ResetPwForm({ dataUser }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const resetPwHandler = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.patch('/reset-password', { ...values, email: dataUser.email });
      if (data.message === 'success') {
        await router.push('/admin-panel');
      }
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
        name='forgot_pw'
        className={styles.root}
        initialValues={{ remember: true }}
        onFinish={resetPwHandler}>
        <h2 className={styles.title}>The secret code has been sent to your email.</h2>

        <Form.Item
          name='code'
          rules={[
            {
              required: true,
              message: 'Please input secret code here!',
            },
          ]}>
          <Input
            style={{ padding: '10px' }}
            prefix={<BarcodeOutlined className='site-form-item-icon' />}
            placeholder='Secret Code'
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback>
          <Input.Password
            style={{ padding: '10px' }}
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item
          name='confirm'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}>
          <Input.Password
            style={{ padding: '10px' }}
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Confirm password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ margin: 'auto', width: '220px' }}
            type='primary'
            htmlType='submit'
            className='login-form-button'>
            Change password
          </Button>
        </Form.Item>

        <Link className='login-form-forgot' href='/admin-panel'>
          I remembered my password
        </Link>
      </Form>
    </div>
  );
}

export default ResetPwForm;

import React, { useState } from 'react';
import styles from './forgotpassword.module.scss';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgotPwForm({ isCode, getDataUser }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/forgot-password', values);
      getDataUser(data);
      isCode(true);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data.error ? err.response.data.error : 'Server error!', {
        position: toast.POSITION.TOP_CENTER,
      });

      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name='forgot_pw'
        className={styles.root}
        initialValues={{ remember: true }}
        onFinish={handleSubmitForm}>
        <h2 className={styles.title}>Forgot password</h2>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your E-mail!', type: 'email' }]}>
          <Input
            className={styles.input}
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='E-mail'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={`${styles['login-button']} login-form-button`}>
            {isLoading && <img src='/images/puff.svg' alt='spinner' className={styles.spinner} />}
            Send me secret
          </Button>
        </Form.Item>

        <Link className='login-form-forgot' href='/admin-panel'>
          I remembered my password
        </Link>
      </Form>
    </div>
  );
}

export default ForgotPwForm;

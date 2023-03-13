import React from 'react';
import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { Button, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

function Categories() {
  async function handleSubmit(values) {
    try {
      const { data } = await axios.post('/category', values);
      console.log(data);
      toast.success('Category created successfully');
    } catch (err) {
      console.log(err);
      toast.error('Category crate failed');
    }
  }

  return (
    <AdminLayout>
      <div>
        <div>
          <h1>Categories</h1>
          <p>Add new category</p>
          <Form onFinish={handleSubmit}>
            <Form.Item name='name'>
              <Input
                prefix={<EditOutlined className='site-form-item-icon' />}
                placeholder='Give it a name'
              />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Categories;

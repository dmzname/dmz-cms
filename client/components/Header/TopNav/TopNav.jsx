import { DashboardOutlined, StarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import Link from 'next/link';

const items = [
  {
    label: <Link href='/'>CMS</Link>,
    key: 'cms',
    icon: <StarOutlined />,
  },
  {
    label: <Link href='/signin'>Signin</Link>,
    key: 'signin',
  },
  {
    label: <Link href='/signup'>Signup</Link>,
    key: 'signup',
  },
  {
    label: 'Dashboard',
    key: 'SubMenu',
    icon: <DashboardOutlined />,
    style: {
      marginLeft: 'auto',
    },
    children: [
      {
        type: 'group',
        label: 'Management',
        children: [
          {
            label: <Link href='/admin'>Admin</Link>,
            key: 'admin',
          },
        ],
      },
    ],
  },
];
export function TopNav() {
  const [current, setCurrent] = useState('cms');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <nav>
      <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
    </nav>
  );
}

import { StarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import Link from 'next/link';

const items = [
  {
    label: <Link href='/'>CMS</Link>,
    key: 'cms',
    icon: <StarOutlined />,
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

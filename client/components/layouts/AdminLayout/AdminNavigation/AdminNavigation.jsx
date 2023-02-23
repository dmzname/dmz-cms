import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BgColorsOutlined,
  CameraOutlined,
  DashboardOutlined,
  MessageOutlined,
  PushpinOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link href='/admin'>DashBoard</Link>, '/admin', <DashboardOutlined />),

  // Posts
  getItem('Posts', 'sub1', <PushpinOutlined />, [
    getItem(<Link href='/admin/posts'>All Posts</Link>, '/admin/posts'),
    getItem(<Link href='/admin/posts/new'>Add Post</Link>, '/admin/posts/new'),
    getItem(<Link href='/admin/categories'>Categories</Link>, '/admin/categories'),
  ]),

  // Media
  getItem('Media', 'sub2', <CameraOutlined />, [
    getItem(<Link href='/admin/media/library'>Library</Link>, '/admin/media/library'),
    getItem(<Link href='/admin/media/new'>Add new</Link>, '/admin/media/new'),
  ]),

  //Comments
  getItem(<Link href='/admin/comments'>Comments</Link>, '/admin/comments', <MessageOutlined />),

  // Users
  getItem('Users', 'sub3', <UserSwitchOutlined />, [
    getItem(<Link href='/admin/users'>All users</Link>, '/admin/users'),
    getItem(<Link href='/admin/users/new'>Add new</Link>, '/admin/users/new'),
  ]),

  //Profile
  getItem(<Link href='/admin/userid'>Profile</Link>, '/admin/userid', <UserOutlined />),

  //Customize
  getItem(<Link href='/admin/customize'>Customize</Link>, '/admin/customize', <BgColorsOutlined />),
];

export const AdminNavigation = () => {
  const windowSize = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    windowSize.width < 800 ? setCollapsed(true) : setCollapsed(false);
  }, [windowSize.width < 800]);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => toggleCollapsed()}>
      <Menu
        selectedKeys={[current]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
        mode='inline'
        inlineCollapsed={collapsed}
        items={items}
      />
    </Sider>
  );
};

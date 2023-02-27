import { Button, Layout, Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BgColorsOutlined,
  CameraOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MessageOutlined,
  PushpinOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import styles from './adminnavigation.module.scss';
import { AuthContext } from '../../../../context/auth';
import { useRouter } from 'next/router';

const { Sider } = Layout;

function getItem(label, key, icon, children, type, style) {
  return {
    key,
    icon,
    children,
    label,
    type,
    style,
  };
}
const items = [
  getItem(<Link href='/admin-panel'>DashBoard</Link>, '/admin-panel', <DashboardOutlined />),

  // Posts
  getItem('Posts', 'sub1', <PushpinOutlined />, [
    getItem(<Link href='/admin-panel/posts'>All Posts</Link>, '/admin-panel/posts'),
    getItem(<Link href='/admin-panel/posts/new'>Add Post</Link>, '/admin-panel/posts/new'),
    getItem(<Link href='/admin-panel/categories'>Categories</Link>, '/admin-panel/categories'),
  ]),

  // Media
  getItem('Media', 'sub2', <CameraOutlined />, [
    getItem(<Link href='/admin-panel/media/library'>Library</Link>, '/admin-panel/media/library'),
    getItem(<Link href='/admin-panel/media/new'>Add new</Link>, '/admin-panel/media/new'),
  ]),

  //Comments
  getItem(
    <Link href='/admin-panel/comments'>Comments</Link>,
    '/admin-panel/comments',
    <MessageOutlined />,
  ),

  // Users
  getItem('Users', 'sub3', <UserSwitchOutlined />, [
    getItem(<Link href='/admin-panel/users'>All users</Link>, '/admin-panel/users'),
    getItem(<Link href='/admin-panel/users/new'>Add new</Link>, '/admin-panel/users/new'),
  ]),

  //Profile
  getItem(<Link href='/admin-panel/userid'>Profile</Link>, '/admin-panel/userid', <UserOutlined />),

  //Customize
  getItem(
    <Link href='/admin-panel/customize'>Customize</Link>,
    '/admin-panel/customize',
    <BgColorsOutlined />,
  ),
];

export const AdminNavigation = () => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');
  const [_, setAuth] = useContext(AuthContext);

  useEffect(() => {
    windowSize.width < 800 ? setCollapsed(true) : setCollapsed(false);
  }, [windowSize.width < 800]);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logoutHandler = () => {
    router.push('/');
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '' });
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider className={styles.sidebar} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        selectedKeys={[current]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
        mode='inline'
        items={items}
        style={{ marginBottom: 'auto' }}
      />
      <Button className={styles.logout} onClick={logoutHandler} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </Sider>
  );
};

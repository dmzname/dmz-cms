import { Layout } from 'antd';
import { AdminNavigation } from './AdminNavigation';
import styles from './adminlayout.module.scss';

const { Content } = Layout;

export function AdminLayout({ children }) {
  return (
    <Layout className={styles.root}>
      <AdminNavigation />
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}

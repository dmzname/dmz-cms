import { AdminLayout } from '../../components/layouts/AdminLayout';
import LoginForm from '../../components/LoginForm';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

function Admin() {
  const [auth] = useContext(AuthContext);

  if (!auth.token) {
    return <LoginForm />;
  }

  return (
    <AdminLayout>
      <h1>Admin</h1>
    </AdminLayout>
  );
}

export default Admin;

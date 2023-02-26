import { AdminLayout } from '../../components/layouts/AdminLayout';
import AuthForms from '../../components/LoginForm';

function Admin() {
  let token = false;

  if (!token) {
    return <AuthForms />;
  }

  return (
    <AdminLayout>
      <h1>Admin</h1>
    </AdminLayout>
  );
}

export default Admin;

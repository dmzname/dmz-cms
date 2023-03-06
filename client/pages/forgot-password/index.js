import { useState } from 'react';
import ResetPwForm from '../../components/ResetPwForm';
import ForgotPwForm from '../../components/ForgotPwForm';

function ForgotPassword() {
  const [isCode, setIsCode] = useState(false);
  const [dataUser, setDataUser] = useState({});

  return (
    <>
      {isCode ? (
        <ResetPwForm dataUser={dataUser} />
      ) : (
        <ForgotPwForm
          isCode={(bool) => setIsCode(bool)}
          getDataUser={(data) => setDataUser(data)}
        />
      )}
    </>
  );
}

export default ForgotPassword;

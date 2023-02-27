import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const userFromLS = JSON.parse(localStorage.getItem('auth'));

    if (userFromLS) {
      setAuth(userFromLS);
    }
  }, []);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

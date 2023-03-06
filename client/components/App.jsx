import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from './Header';
import { ThemeContext } from '../context/theme';

function App() {
  const { myTheme } = useContext(ThemeContext);
  return (
    <>
      <ToastContainer theme={myTheme} />
      <Header />
    </>
  );
}

export default App;

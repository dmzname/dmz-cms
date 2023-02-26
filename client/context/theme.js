import { createContext, useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';

const ThemeContext = createContext({
  myTheme: 'light',
  toggleTheme: () => {},
});

const themeAlgorithm = {
  light: 'defaultAlgorithm',
  dark: 'darkAlgorithm',
};

const ThemeProvider = ({ children }) => {
  const [myTheme, setMyTheme] = useState('light');

  useEffect(() => {
    const themeLS = localStorage.getItem('theme');
    if (themeLS) {
      setMyTheme(themeLS);
    }
    document.body.classList.add(`${themeLS}-theme`);
  }, []);

  function toggleTheme() {
    const changeTheme = myTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', changeTheme);
    setMyTheme(changeTheme);
    document.body.removeAttribute('class');
    document.body.classList.add(`${changeTheme}-theme`);
  }

  return (
    <ConfigProvider
      motion={{}}
      theme={{
        algorithm: theme[themeAlgorithm[myTheme]],
      }}>
      <ThemeContext.Provider value={{ myTheme, toggleTheme }}>{children}</ThemeContext.Provider>
    </ConfigProvider>
  );
};

export { ThemeContext, ThemeProvider };

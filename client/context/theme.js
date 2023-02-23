import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const themeLS = localStorage.getItem('theme');
    if (themeLS) {
      setTheme(themeLS);
    }
    document.body.classList.add(`${themeLS}-theme`);
  }, []);

  function toggleTheme() {
    const changeTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', changeTheme);
    setTheme(changeTheme);
    document.body.removeAttribute('class');
    document.body.classList.add(`${changeTheme}-theme`);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

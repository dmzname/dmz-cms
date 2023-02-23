import { useContext } from 'react';
import styles from './themeswitch.module.scss';
import { ThemeContext } from '../../../context/theme';
import { Sun } from '../../../icons/sun';
import { Moon } from '../../../icons/moon';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={styles.btn} onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}

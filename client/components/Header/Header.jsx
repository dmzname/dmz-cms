import React from 'react';
import { TopNav } from './TopNav';
import { ThemeSwitch } from './ThemeSwitch';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <TopNav />
      <ThemeSwitch />
    </header>
  );
}

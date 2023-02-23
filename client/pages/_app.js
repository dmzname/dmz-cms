import '../styles/main.scss';
import { ThemeProvider } from '../context/theme';
import { Header } from '../components/Header';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

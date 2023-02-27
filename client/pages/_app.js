import '../styles/main.scss';
import { ThemeProvider } from '../context/theme';
import { Header } from '../components/Header';
import { AuthProvider } from '../context/auth';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

import '../styles/main.scss';
import { ThemeProvider } from '../context/theme';
import { AuthProvider } from '../context/auth';
import App from '../components/App';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

import '../styles/globals.css';
import Layout from '../components/Layout';
import BackgroundGrid from '../components/BackgroundGrid';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BackgroundGrid />
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
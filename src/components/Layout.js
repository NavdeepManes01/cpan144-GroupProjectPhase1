import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
            <h2>MultiApp</h2>
          </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.link} ${router.pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
          <Link href="/list-manager" className={`${styles.link} ${router.pathname === '/list-manager' ? styles.active : ''}`}>
            List Manager
          </Link>
          <Link href="/weather" className={`${styles.link} ${router.pathname === '/weather' ? styles.active : ''}`}>
            Weather
          </Link>
          <Link href="/calculator" className={`${styles.link} ${router.pathname === '/calculator' ? styles.active : ''}`}>
            Calculator
          </Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>CPAN144 Group Project - Phase 3</p>
      </footer>
    </div>
  );
}
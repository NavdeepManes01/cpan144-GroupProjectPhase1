import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/list-manager" className={styles.navLink}>List Manager</Link>
        <Link href="/weather" className={styles.navLink}>Weather</Link>
        <Link href="/calculator" className={styles.navLink}>Calculator</Link>
      </nav>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
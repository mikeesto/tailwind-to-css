import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/mikeesto/tailwind-to-css"
        target="_blank"
        rel="noreferrer"
      >
        source
      </a>
    </footer>
  );
}

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>WeGotThis</div>
      <div className={styles.right}>
        <span>Data Privacy</span>
        <span>Support</span>
        <span>Laws</span>
      </div>
    </footer>
  );
};

export default Footer;

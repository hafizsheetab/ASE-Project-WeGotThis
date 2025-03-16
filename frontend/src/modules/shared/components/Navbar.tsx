import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <span className={styles.logo}>WeGotThis</span>
      </div>
      <nav className={styles.navRight}>
        <button className={styles.navButton}>+ Create Offer</button>
        <button className={styles.navButton}>&lt;3 Favorites</button>
        <button className={styles.navButton}>O Notifications</button>
        <button className={styles.navButton}>My Account</button>
        <span className={styles.languageSwitch}>| en</span>
      </nav>
    </header>
  );
};

export default Navbar;

import styles from "./Authentication.module.css";

const Sidebar = () => {
    return (
        <section className={styles.rightSide}>
            <div className={styles.rightSideContent}>
                <div className={styles.brand}>WEGOTTHIS</div>
                <h2 className={styles.message}>
                    Fast and secure learning platform for everyone.
                </h2>
            </div>
        </section>
    );
};

export default Sidebar;

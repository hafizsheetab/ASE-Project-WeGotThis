import styles from "./css/DecorativeSide.module.css";

function DecorativeSide() {
  return (
    <aside className={styles.rightSide}>
      <FontLoader />
      <BlurCircles />
      <ContentSection />
    </aside>
  );
}

function FontLoader() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  );
}

function BlurCircles() {
  return (
    <div className={styles.blurCircles}>
      <div className={styles.blurCircle1} />
      <div className={styles.blurCircle2} />
      <div className={styles.blurCircle3} />
      <div className={styles.blurCircle4} />
      <div className={styles.blurCircle5} />
      <div className={styles.blurCircle6} />
      <div className={styles.blurCircle7} />
    </div>
  );
}

function ContentSection() {
  return (
    <div className={styles.rightContent}>
      <div className={styles.subtitle}>NAMANYAJUGABELAJAR.IO</div>
      <h2 className={styles.title}>
        Belajar secara online semakin mudah – tetep belajar walaupun pake kuota
        dari Kemendikbud hehe~
      </h2>
    </div>
  );
}

export default DecorativeSide;

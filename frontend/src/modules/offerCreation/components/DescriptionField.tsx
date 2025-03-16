import styles from './DescriptionField.module.css'

type DescriptionFieldProps = {
  placeholder? : string
}

const DescriptionField : React.FC<DescriptionFieldProps> = ({placeholder}) => {
  return (
    <section className={styles.descriptionSection}>
      <h2>Description</h2>
      <textarea
        maxLength={250}
        className={styles.descriptionInput}
        placeholder={placeholder}
      />
      <p className={styles.wordCount}>250 words</p>
  </section>
  )
}

export default DescriptionField
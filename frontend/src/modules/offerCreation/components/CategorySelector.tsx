import styles from './CategorySelector.module.css'
import CategoryList from './CategoryList';
import ActiveButton from './ActiveClickButton';
import AddIcon from "@mui/icons-material/Add";

const CategorySelector = () => {
  return (
    <section className={styles.categorySelector}>
      <div className={styles.categoryHeaderSection}>
        <div className={styles.categoryHeader}>
          <h2>Categories</h2>
          <p>You can select up to 5 categories</p>
        </div>

        <ActiveButton buttonTxt="Add Item" startIcon={<AddIcon />} />

      </div>

      <CategoryList className={styles.chipContainer} deletableChip={true}/>
  </section>
  )
}

export default CategorySelector
import styles from './OfferCreation.module.css'
import CategoryList from '../../shared/components/CategoryChipDisplay';
import ActiveButton from '../../shared/components/ActiveClickButton';
import AddIcon from "@mui/icons-material/Add";
import DialogSelect from './CategorySelectorDialog';

const CategorySelector = () => {
  return (
    <section className={styles.categorySelector}>
      <div className={styles.categoryHeaderSection}>
        <div className={styles.categoryHeader}>
          <h2>Categories</h2>
          <p>You can select up to 5 categories</p>
          
        </div>

        <DialogSelect/>

      </div>

      <CategoryList className={styles.chipContainer} deletableChip={true}/>
  </section>
  )
}

export default CategorySelector
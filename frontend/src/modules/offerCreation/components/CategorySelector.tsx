import styles from "./OfferCreation.module.css";
import CategoryList from "../../shared/components/CategoryChipDisplay";
import DialogSelect from "./CategorySelectorDialog";
import { OfferCategory, OfferTemplateResponse } from "../Types";

type CategorySelectorProps = {
    initialValues?: {
        categories?: string[],
        template: OfferTemplateResponse;
    };
    addCategory: (x : number[]) => void
    removeCategory: (x : number) => void
    categoryIds: number[]
};

const CategorySelector: React.FC<CategorySelectorProps> = ({initialValues, addCategory, removeCategory, categoryIds}) => {
    console.log(categoryIds)
    return (
        <section className={styles.categorySelector}>
            <div className={styles.categoryHeaderSection}>
                <div className={styles.categoryHeader}>
                    <h2>Categories</h2>
                    <p>You can select up to 5 categories</p>
                </div>
                <DialogSelect initialSelected={initialValues?.categories} addCategory={addCategory} removeCategory={removeCategory} categoryIds={categoryIds} template={initialValues?.template}/>
            </div>
            <CategoryList className={styles.chipContainer} deletableChip={true} categories={initialValues?.template.offerCategories.filter(oct => categoryIds.includes(oct.id))} removeCategory={removeCategory}/>
        </section>
    );
};

export default CategorySelector;
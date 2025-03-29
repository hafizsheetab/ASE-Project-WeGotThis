import styles from "./OfferCreation.module.css";
import CategoryList from "../../shared/components/CategoryChipDisplay";
import DialogSelect from "./CategorySelectorDialog";
import { OfferTemplateResponse } from "../Types";

type CategorySelectorProps = {
    initialValues?: {
        categories?: string[],
        template: OfferTemplateResponse;
    };
};

const CategorySelector: React.FC<CategorySelectorProps> = ({initialValues}) => {
    return (
        <section className={styles.categorySelector}>
            <div className={styles.categoryHeaderSection}>
                <div className={styles.categoryHeader}>
                    <h2>Categories</h2>
                    <p>You can select up to 5 categories</p>
                </div>
                <DialogSelect initialSelected={initialValues?.categories}/>
            </div>
            <CategoryList className={styles.chipContainer} deletableChip={true}/>
        </section>
    );
};

export default CategorySelector;
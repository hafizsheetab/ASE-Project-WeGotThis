import { OfferCategory } from '../../offerCreation/Types';
import InterestChip from './InterestChip';

type CategoryListProps = {
    deletableChip? : boolean;
    className? : string;
    removeCategory? : (x: number) => void
    categories?: Array<OfferCategory>;
    size?: "medium" | "small"
}

const CategoryList : React.FC<CategoryListProps> = ({className, deletableChip = false, removeCategory, categories, size="medium"}) => {



    return (
        <div className={className} style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "1em"
        }}>
            {categories?.map((item) => (
            <InterestChip size={size} label={item.displayValue} deletable={deletableChip} onDelete={(label) => {
                const category = categories?.find(ct => ct.displayValue === label)
                if(category && removeCategory){
                    removeCategory(category.id)
                }
            }}/>
            ))}
        </div>
    )
}

export default CategoryList
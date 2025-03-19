import InterestChip from './InterestChip';

type CategoryListProps = {
    deletableChip? : boolean;
    className? : string;
}

const CategoryList : React.FC<CategoryListProps> = ({className, deletableChip = false}) => {

    const categories = [
        "Dog",
        "Walking",
        "Shopping",
        "Software Development",
        "Cleaning",
      ];

    return (
        <div className={className} style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "1em"
        }}>
            {categories.map((item) => (
            <InterestChip label={item} deletable={deletableChip}/>
            ))}
        </div>
    )
}

export default CategoryList
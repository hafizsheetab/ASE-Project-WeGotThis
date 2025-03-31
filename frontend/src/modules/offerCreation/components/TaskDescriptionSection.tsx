import DescriptionField from "../../shared/components/DescriptionField";

type TaskDescriptionSectionProps = {
    initialValues?: {
        description?: string;
    };
    value?: string
    setValue?: (x: string) =>  void
    hasError? : boolean;
    readonly? : boolean;
    maxWordsCount? : number;
};

const TaskDescriptionSection: React.FC<TaskDescriptionSectionProps> = ({initialValues, value, setValue, hasError, readonly, maxWordsCount = -1}) => {
    return (
        <section style={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <h2>Description</h2>
            <DescriptionField
                hasError={hasError}
                label= {!readonly? "Describe your offer here" : "About the offer"}
                maxWords={maxWordsCount}
                value={value}
                readonly={readonly}
                onChange={setValue}
            />
        </section>
    );
};

export default TaskDescriptionSection;
import DescriptionField from "../../shared/components/DescriptionField";

type TaskDescriptionSectionProps = {
    initialValues?: {
        description?: string;
    };
    value?: string
    setValue?: (x: string) =>  void
    hasError? : boolean
};

const TaskDescriptionSection: React.FC<TaskDescriptionSectionProps> = ({initialValues, value, setValue, hasError}) => {
    return (
        <section style={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <h2>Description</h2>
            <DescriptionField
                hasError={hasError}
                label="Describe your task here"
                maxWords={150}
                value={value}
                onChange={setValue}
            />
        </section>
    );
};

export default TaskDescriptionSection;
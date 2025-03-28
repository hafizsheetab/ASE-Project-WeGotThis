import DescriptionField from "../../shared/components/DescriptionField";

type TaskDescriptionSectionProps = {
    initialValues?: {
        description?: string;
    };
};

const TaskDescriptionSection: React.FC<TaskDescriptionSectionProps> = ({initialValues}) => {
    return (
        <section style={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <h2>Description</h2>
            <DescriptionField
                label="Describe your task here"
                maxWords={150}
                value={initialValues?.description}
            />
        </section>
    );
};

export default TaskDescriptionSection;
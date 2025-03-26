import DescriptionField from "../../shared/components/DescriptionField";

const TaskDescriptionSection = () => {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h2>Description</h2>
      <DescriptionField label="Describe your task here" maxWords={150}/>
    </section>
  );
};

export default TaskDescriptionSection;

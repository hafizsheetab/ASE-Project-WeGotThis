import { useState } from "react";
import styles from "./SeekerTypeSelection.module.css";

const SeekerTypeSelection = () => {
  const [selectedRole, setSelectedRole] = useState<string>("seeker");

  const handleRoleChange = () => {
    setSelectedRole(selectedRole === 'seeker' ? 'provider' : 'seeker');
  }

  return (
    <section className={styles.roleToggle}>
      <label className={`${styles.roleButton} ${selectedRole === "seeker" ? styles.active : ""}`}>
        <input
          type="radio"
          name="role"
          value="seeker"
          checked={selectedRole === "seeker"}
          onChange={handleRoleChange}
          className={styles.radioButton}
        />
        Service Seeker
      </label>

      <label className={`${styles.roleButton} ${selectedRole === "provider" ? styles.active : ""}`}>
        <input
          type="radio"
          name="role"
          value="provider"
          checked={selectedRole === "provider"}
          onChange={handleRoleChange}
          className={styles.radioButton}
        />
        Service Provider / Volunteer
      </label>
    </section>
  );
};

export default SeekerTypeSelection;

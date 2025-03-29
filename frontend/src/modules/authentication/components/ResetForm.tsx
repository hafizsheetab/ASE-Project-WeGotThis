import styles from "./Authentication.module.css";
import AuthenticationHeader from "./AuthenticationHeader";
import ResetTextInputs from "./ResetTextInputs";

export function ResetForm() {
  const pageHeader = "Reset Password";
  const pageDescrip = "Enter your new password. It must be different than your previous one."

  return (
    <section className={styles.formSection}>
      <AuthenticationHeader header={pageHeader} text={pageDescrip}/>
      <ResetTextInputs/>
    </section>
  );
}
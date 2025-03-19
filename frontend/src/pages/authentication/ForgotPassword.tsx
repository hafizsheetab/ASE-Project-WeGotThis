"use client";
import ForgotPasswordBody from "../../modules/authentication/components/ForgotPassworBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";

function ForgotPassword() {
  return (
    <div className={styles.authenticationContainer}>
      <ForgotPasswordBody />
      <Sidebar />
    </div>
  );
}

export default ForgotPassword;

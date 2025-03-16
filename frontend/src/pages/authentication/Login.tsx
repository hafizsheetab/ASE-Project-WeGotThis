"use client";
import LoginBody from "../../modules/authentication/components/LoginBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";

function Login() {
  return (
    <div className={styles.authenticationContainer}>
      <LoginBody />
      <Sidebar />
    </div>
  );
}

export default Login;

"use client";
import LoginBody from "../../modules/authentication/components/LoginBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";

function Login() {

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <LoginBody />
      <Sidebar />
    </Paper>
  );
}

export default Login;

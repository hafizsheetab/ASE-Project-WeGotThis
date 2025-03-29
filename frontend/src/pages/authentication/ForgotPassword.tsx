"use client";
import { Paper } from "@mui/material";
import ForgotPasswordBody from "../../modules/authentication/components/ForgotPassworBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";

function ForgotPassword() {

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <ForgotPasswordBody />
      <Sidebar />
    </Paper>
  );
}

export default ForgotPassword;

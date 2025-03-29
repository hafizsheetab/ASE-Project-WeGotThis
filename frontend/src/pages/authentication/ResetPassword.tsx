"use client";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";
import { ResetForm } from "../../modules/authentication/components/ResetForm";

const Register: React.FC = () => {

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <ResetForm />
      <Sidebar />
    </Paper>
  )
};

export default Register;

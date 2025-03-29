"use client";
import RegisterBody from "../../modules/authentication/components/RegisterBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";

const Register: React.FC = () => {

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <RegisterBody />
      <Sidebar />
    </Paper>
  )
};

export default Register;

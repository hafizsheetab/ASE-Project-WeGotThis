"use client";
import React, { useEffect } from "react";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";
import { ResetForm } from "../../modules/authentication/components/ResetForm";

const Register: React.FC = () => {

  useEffect(() => {
    document.body.classList.add(styles.appContainerBackground);

    return () => {
      document.body.classList.remove("app-container-background");
    };
  }, []);

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <ResetForm />
      <Sidebar />
    </Paper>
  )
};

export default Register;

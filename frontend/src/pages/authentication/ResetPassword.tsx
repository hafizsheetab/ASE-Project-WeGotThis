"use client";
import React, { useEffect } from "react";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import ResetBody from "../../modules/authentication/components/ResetBody";
import { Paper } from "@mui/material";

const Register: React.FC = () => {

  useEffect(() => {
    document.body.classList.add(styles.appContainerBackground);

    return () => {
      document.body.classList.remove("app-container-background");
    };
  }, []);

  return (
    <Paper className={styles.authenticationContainer} elevation={3}>
      <ResetBody />
      <Sidebar />
    </Paper>
  )
};

export default Register;

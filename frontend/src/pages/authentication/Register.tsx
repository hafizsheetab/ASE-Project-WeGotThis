"use client";
import RegisterBody from "../../modules/authentication/components/RegisterBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";

const Register = () => {

  return (
    <div style={{minHeight: "100vh", display:"flex", alignItems:"center"}}>
      <Paper className={styles.authenticationContainer} elevation={3}>
        <RegisterBody />
        <Sidebar />
      </Paper>
    </div>

  )
};

export default Register;

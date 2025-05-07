"use client";
import LoginBody from "../../modules/authentication/components/LoginBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";

const Login = () => {

  return (
    <div style={{minHeight: "100vh", display:"flex", alignItems:"center"}}>
          <Paper className={styles.authenticationContainer} elevation={3}>
      <LoginBody />
      <Sidebar />
    </Paper>
    </div>
  );
}

export default Login;

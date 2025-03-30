"use client";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";
import { Paper } from "@mui/material";
import { ResetForm } from "../../modules/authentication/components/ResetForm";

const Register: React.FC = () => {

  return (
    <div style={{minHeight: "100vh", display:"flex", alignItems:"center"}}>
      <Paper className={styles.authenticationContainer} elevation={3}>
        <ResetForm />
        <Sidebar />
      </Paper>
    </div>

  )
};

export default Register;

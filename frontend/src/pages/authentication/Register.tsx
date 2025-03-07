"use client";
import React from "react";
import RegisterBody from "../../modules/authentication/components/RegisterBody";
import Sidebar from "../../modules/authentication/components/Sidebar";
import styles from "../css/Pages.module.css";

const Register: React.FC = () => {
  return (
    <div className={styles.authenticationContainer}>
      <RegisterBody />
      <Sidebar />
    </div>
  )
};

export default Register;

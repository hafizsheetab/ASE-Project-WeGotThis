"use client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "../css/Register.module.css";
import styles from "./Authentication.module.css";
import { RegisterFormBody, TokenResponse } from "../Types";
import { checkForError, showAlert } from "../../shared/services";
import { register } from "../services";
import ContextStore from "../../../utils/ContextStore";
import AuthenticationHeader from "./AuthenticationHeader";
import RegisterTextInputs from "./RegisterTextInput";
import { Link, Typography } from "@mui/material";

const RegisterBody: React.FC = () => {
    const store = useContext(ContextStore)
    const navigate = useNavigate(); // Initialize navigate 
    
    const handleCreateAccount = () => {
        navigate("/login");
    };
    
    useEffect(() => {
        console.log(store.context)
        if(store.context.token){
            navigate("/home")
        }
    },[])

    const pageHeader = "Create an Account"
    const pageDescrip = "Please enter your information to create an account."
    return (
        <section className={styles.formSection}>
            <AuthenticationHeader header={pageHeader} text={pageDescrip}/>
            <RegisterTextInputs/>
            
            <Typography  style={{marginTop: '1em', cursor:"default", width:'90%'}}variant="body2" align="center">
                Already have an account?&nbsp;
                <Link
                    underline="hover"
                    variant="body2"
                    style={{cursor:"pointer"}}
                    onClick={handleCreateAccount} // Navigate to /login
                    className={styles.signupLink}
                >
                    Login here.
                </Link>
            </Typography>

            
        </section>
    );
};

export default RegisterBody;

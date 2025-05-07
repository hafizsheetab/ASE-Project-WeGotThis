"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.css";
import ContextStore from "../../../utils/ContextStore";
import AuthenticationHeader from "./AuthenticationHeader";
import RegisterTextInputs from "./RegisterTextInput";
import { Link, Typography } from "@mui/material";

const RegisterBody = () => {
    const store = useContext(ContextStore)
    const navigate = useNavigate(); 
    
    const handleCreateAccount = () => {
        navigate("/login");
    };
    
    useEffect(() => {
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
                    onClick={handleCreateAccount}
                    className={styles.signupLink}
                >
                    Login here.
                </Link>
            </Typography>

            
        </section>
    );
};

export default RegisterBody;

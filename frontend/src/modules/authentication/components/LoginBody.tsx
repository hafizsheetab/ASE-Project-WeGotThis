"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Authentication.module.css";
import ContextStore from "../../../utils/ContextStore";
import AuthenticationHeader from "./AuthenticationHeader";
import LoginTextInputs from "./LoginTextInputs";
import { Link, Typography } from "@mui/material";

const LoginBody = () => {
    const navigate = useNavigate();
    const store = useContext(ContextStore);

    const handleCreateAccount = () => {
        navigate("/register");
    };

    useEffect(() => {
        if(store.context.token){
            navigate("/home")
        }
    },[])

    const pageHeader = "Welcome Back!"
    const pageDescrip = "Please enter your email and password";
    return (
        <section className={styles.formSection}>
            <AuthenticationHeader header={pageHeader} text={pageDescrip}/>
            <LoginTextInputs/>

            <Typography  style={{marginTop: '1em', cursor:"default", width:'90%'}} variant="body2" align="center">
                Don't have an account? &nbsp;
                <Link
                    underline="hover"
                    variant="body2"
                    style={{cursor:"pointer"}}
                    onClick={handleCreateAccount}
                >
                    Click here to create one.
                </Link>
            </Typography> 
        </section>
    );
}

export default LoginBody;

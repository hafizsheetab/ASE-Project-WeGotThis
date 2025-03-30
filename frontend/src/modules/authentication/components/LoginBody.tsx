"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Authentication.module.css";
import ContextStore from "../../../utils/ContextStore";
import AuthenticationHeader from "./AuthenticationHeader";
import LoginTextInputs from "./LoginTextInputs";
import { Link, Typography } from "@mui/material";

function LoginBody() {
    const navigate = useNavigate(); // Initialize navigate function
    const store = useContext(ContextStore);

    const handleCreateAccount = () => {
        // Redirect to /register when the user clicks to create an account
        navigate("/register");
    };

    useEffect(() => {
        if(store.context.token){
            console.log(store.context)
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

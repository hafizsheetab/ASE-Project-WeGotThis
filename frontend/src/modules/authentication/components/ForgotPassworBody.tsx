"use client";
import styles from "./Authentication.module.css"; 
import AuthenticationHeader from "./AuthenticationHeader";
import ForgotPasswordTextInputs from "./ForgotPasswordTextInput";

function ForgotPasswordBody() {

    const pageHeader = "Forgot Password?"
    const pageDescrip = "Enter your email address, and we'll give you instructions how to reset your password."
    return (
        <section className={styles.formSection} >
            <AuthenticationHeader header={pageHeader} text={pageDescrip}/>
            <ForgotPasswordTextInputs/>
           
        </section>
    );
}

export default ForgotPasswordBody;

"use client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "../css/Register.module.css";
import styles from "./Authentication.module.css";
import { RegisterFormBody, TokenResponse } from "../Types";
import { checkForError, showAlert } from "../../shared/services";
import { register } from "../services";
import ContextStore from "../../../utils/ContextStore";

const RegisterBody: React.FC = () => {
    const store = useContext(ContextStore)
    const navigate = useNavigate(); // Initialize navigate function
    const [registerForm, setRegisterForm] = useState<RegisterFormBody>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isPasswordVisible: false,
        agreedToTerms: false
    });

    const changeForm = (e: React.ChangeEvent<HTMLInputElement> ) => {
        switch(e.target.name){
            case "firstName":
                setRegisterForm({...registerForm, firstName: e.target.value})
                break
            case "lastName":
                setRegisterForm({...registerForm, lastName: e.target.value})
                break
            case "email":
                setRegisterForm({...registerForm, email: e.target.value})
                break
            case "password":
                setRegisterForm({...registerForm, password: e.target.value})
                break
            case "confirmPassword":
                setRegisterForm({...registerForm, confirmPassword: e.target.value})
                break
        }
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!registerForm.agreedToTerms) {
            showAlert("Please agree to the terms of service", "warning")
            return;
        }
        if(registerForm.password !== registerForm.confirmPassword){
            showAlert("Passwords do not match", "error")
            return
        }
        let response = await register({email: registerForm.email, password: registerForm.password, expire: true, firstName: registerForm.firstName, lastName: registerForm.lastName}, store)
        if(checkForError(response)){
            return
        }
        response = response as TokenResponse
        store.setContext({...store.context, token: response.access_token})
        // Form submission logic
        console.log("Form submitted");
        // navigate("/login"); // Redirect to login page after registration
    };

    const handleCreateAccount = () => {
        navigate("/login");
    };
    useEffect(() => {
        console.log(store.context)
        if(store.context.token){
            navigate("/home")
        }
    },[])
    return (
        <main>
            {/* Left Side */}
            <section className={styles.leftSide}>
                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Create an Account</h1>
                    <p className={styles.welcomeSubtitle}>
                        Please enter your name, email, and password
                    </p>
                </div>

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    {/* First Name and Last Name Fields */}
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName" className={styles.label}>
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={registerForm.firstName}
                            onChange={changeForm}
                            className={styles.input}
                            required
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="lastName" className={styles.label}>
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={registerForm.lastName}
                            onChange={changeForm}
                            className={styles.input}
                            required
                            placeholder="Enter your last name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={registerForm.email}
                            onChange={changeForm}
                            className={styles.input}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className={styles.formGroup}>
                        <div className={styles.passwordHeader}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="password"
                                name="password"
                                type={registerForm.isPasswordVisible ? "text" : "password"}
                                value={registerForm.password}
                                onChange={changeForm}
                                className={styles.input}
                                required
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setRegisterForm({...registerForm, isPasswordVisible: !registerForm.isPasswordVisible})
                                }
                                className={styles.togglePasswordVisibility}
                            >
                                {registerForm.isPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    {/* Confirm Password Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={registerForm.isPasswordVisible ? "text" : "password"}
                                value={registerForm.confirmPassword}
                                onChange={changeForm}
                                className={styles.input}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    {/* Terms of Service Checkbox */}
                    <div className={styles.agreement}>
                        <input
                            type="checkbox"
                            id="terms"
                            className={styles.checkbox}
                            checked={registerForm.agreedToTerms}
                            onChange={() => setRegisterForm({...registerForm, agreedToTerms: !registerForm.agreedToTerms})}
                        />
                        <label htmlFor="terms" className={styles.agreementText}>
                            By checking this box, you are agreeing to our
                            <a href="#" className={styles.link}>
                                terms of service
                            </a>
                            .
                        </label>
                    </div>

                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>
                </form>

                <p className={styles.signupText}>
                    <span>Already have an account? </span>
                    <a
                        href="#"
                        onClick={handleCreateAccount} // Navigate to /login
                        className={styles.signupLink}
                    >
                        Login here.
                    </a>
                </p>
            </section>
            
            
        </main>
    );
};

export default RegisterBody;

"use client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Authentication.module.css"; // Import the combined CSS file
import { LoginFormBody } from "../Types";
import { login } from "../services";
import ContextStore from "../../../utils/ContextStore";

function LoginBody() {
    const navigate = useNavigate(); // Initialize navigate function
    const store = useContext(ContextStore);
    const [loginForm, setLoginForm] = useState<LoginFormBody>({
        email: "",
        password: "",
        isPasswordVisible: false
    });

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with", loginForm);
        const response = await login({email: loginForm.email, password: loginForm.password, expire: true}, store.context)
        if("status" in response){
            return
        }
        store.setContext({...store.context, token: response.access_token})
        // After successful login, navigate to /home
        // navigate("/home");
    };

    const handleCreateAccount = () => {
        // Redirect to /register when the user clicks to create an account
        navigate("/register");
    };

    const handleForgotPassword = () => {
        navigate("/reset")
    }

    useEffect(() => {
        if(store.context.token){
            console.log(store.context)
            navigate("/home")
        }
    },[])
    return (
        <main >
            {/* Left Side */}
            <section className={styles.leftSide}>
                {/* <header className={styles.logo}>WeGotThis</header> */}

                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Welcome Back</h1>
                    <p className={styles.welcomeSubtitle}>
                        Please enter your email and password
                    </p>
                </div>

                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) =>
                                setLoginForm({
                                    ...loginForm,
                                    email: e.target.value,
                                })
                            }
                            className={styles.input}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.passwordHeader}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <a href="#" className={styles.forgotPassword} onClick={handleForgotPassword}>
                                Forgot Password?
                            </a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="password"
                                type={loginForm.isPasswordVisible ? "text" : "password"}
                                value={loginForm.password}
                                onChange={(e) =>
                                    setLoginForm({
                                        ...loginForm,
                                        password: e.target.value,
                                    })
                                }
                                className={styles.input}
                                required
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setLoginForm({...loginForm, isPasswordVisible: !loginForm.isPasswordVisible})
                                }
                                className={styles.togglePasswordVisibility}
                            >
                                {loginForm.isPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                </form>

                <p className={styles.signupText}>
                    <span>Don't have an account? </span>
                    <a
                        href="#"
                        onClick={handleCreateAccount} // Navigate to /register
                        className={styles.signupLink}
                    >
                        Click here to create one.
                    </a>
                </p>
            </section>

            {/* Right Side */}
           
        </main>
    );
}

export default LoginBody;

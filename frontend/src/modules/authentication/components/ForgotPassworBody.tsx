"use client";
import { useContext, useState } from "react";// Import useNavigate
import styles from "./Authentication.module.css"; // Import the combined CSS file
import { forgotPassword, } from "../services";
import ContextStore from "../../../utils/ContextStore";
import { checkForError } from "../../shared/services";

function ForgotPasswordBody() {

    const store = useContext(ContextStore);
    const  [email, setEmail] = useState<string>("")
    const [success, setSuccess] = useState(false)
    const handleForgotPassword = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await forgotPassword({email: email}, store.context)
        if(checkForError(response)){
            return
        }
        setSuccess(true)
        // After successful login, navigate to /home
        // navigate("/home");
    };
    return (
        <main >
            {/* Left Side */}
            <section className={styles.leftSide}>
                {/* <header className={styles.logo}>WeGotThis</header> */}

                <div className={styles.welcomeSection}>
                    <p className={styles.welcomeSubtitle}>
                        {!success ? "Please enter your email to reset password": "An email has been sent. Please check your email."}
                    </p>
                </div>
                {
                    !success && <form className={styles.loginForm} onSubmit={handleForgotPassword}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className={styles.input}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Send Email
                    </button>
                </form>
                }

            </section>

            {/* Right Side */}
           
        </main>
    );
}

export default ForgotPasswordBody;

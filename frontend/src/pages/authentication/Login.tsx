"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../css/Login.module.css"; // Import the combined CSS file

function Login() {
  const navigate = useNavigate(); // Initialize navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    // After successful login, navigate to /home
    navigate("/home");
  };

  const handleCreateAccount = () => {
    // Redirect to /register when the user clicks to create an account
    navigate("/register");
  };

  return (
    <main className={styles.loginContainer}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <a href="#" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className={styles.togglePasswordVisibility}
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
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
      <section className={styles.rightSide}>
        <p>
          Belajar secara online semakin mudah – tetep belajar walaupun pake
          kuota dari Kemendikbud hehe~
        </p>
      </section>
    </main>
  );
}

export default Login;

"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "../css/Register.module.css";
import styles from "../css/Login.module.css";

const Register: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms of service");
      return;
    }
    // Form submission logic
    console.log("Form submitted");
    navigate("/login"); // Redirect to login page after registration
  };

  const handleCreateAccount = () => {
    navigate("/login");
  };

  return (
    <main className={styles.loginContainer}>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          {/* Terms of Service Checkbox */}
          <div className={styles.agreement}>
            <input
              type="checkbox"
              id="terms"
              className={styles.checkbox}
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            <label htmlFor="terms" className={styles.agreementText}>
              By checking this box, you are agreeing to our
              <a href="#" className={styles.link}>
                terms of service
              </a>
              .
            </label>
          </div>

          <button type="submit" className={styles.loginButton}>
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

      {/* Right Side */}
      <section className={styles.rightSide}>
        <p>
          Belajar secara online semakin mudah – tetep belajar walaupun pake
          kuota dari Kemendikbud hehe~
        </p>
      </section>
    </main>
  );
};

export default Register;

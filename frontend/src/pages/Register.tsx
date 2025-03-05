import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration Data:", formData);

    // Simulate a successful registration, then navigate to the login page
    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 500); // Simulate a short delay (optional)
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Account Registration</h2>
        <p>Please enter your name, email, and password.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="terms">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label>
              I agree to the <a href="#">terms of service</a>
            </label>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="#" onClick={() => navigate("/login")}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

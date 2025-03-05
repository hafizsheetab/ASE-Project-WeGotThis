import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p>Please enter your email and password</p>
        <form className="w-80 mt-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-500 text-sm">
              Forgot Password?
            </Link>
          </div>
          <button className="w-full mt-3 bg-orange-500 text-white py-2 rounded">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Click here to create one.
          </Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-blue-900 text-white flex justify-center items-center">
        <p>Learning online has never been easier!</p>
      </div>
    </div>
  );
};

export default Login;

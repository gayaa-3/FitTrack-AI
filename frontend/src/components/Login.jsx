import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful:", res.data);
      // toast.success("Successfully Logged in.");
      // TODO: Save token or update auth context here
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
      // toast.error("Oops:( Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 className="auth-title">Login</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">
          Login
        </button>
        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

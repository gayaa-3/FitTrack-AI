import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Auth.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // Get the login function from our context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      
      // Navigate to the protected page after successful login
      navigate("/fitness-goal");

      // Anusha code 
      // const res = await axios.post(
      //   "http://localhost:8000/api/users/login",
      //   { email, password },
      //   { withCredentials: true }
      // );
      // console.log("Login successful:", res.data);
      // // Assuming the response has an _id field
      // const userId = res.data._id; 
      // if (userId) {
      //   // Pass the userId in the 'state' object when you navigate
      //   navigate("/fitness-goal", { state: { userId: userId } }); 
      // } else {
      //   console.error("Login successful, but no user ID was returned.");
      // }
      // navigate('/fitness-goal');
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
        <button className="auth-button bg-orange-400 hover:bg-orange-500" type="submit">
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

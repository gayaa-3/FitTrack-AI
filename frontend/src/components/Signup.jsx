import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/register",
        form,
        { withCredentials: true }
      );
      console.log("Signup successful:", res.data);
      // toast.success("Registration successful! Login To Continue.");
      // alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
      // toast.error("Oops:( Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2 className="auth-title">Sign Up</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          required
          onChange={handleChange}
        />
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={handleChange}
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleChange}
        />
        <button className="auth-button" type="submit">
          Sign Up
        </button>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

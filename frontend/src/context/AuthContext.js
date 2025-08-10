import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// A helper function to safely get the initial user from localStorage
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  // If nothing is stored, or the stored value is the string "undefined", return null
  if (!storedUser || storedUser === 'undefined') {
    return null;
  }
  // Otherwise, try to parse it
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    // If parsing fails, it's invalid data, so return null
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  
  // Initialize state from localStorage to stay logged in
  const [user, setUser] = useState(getInitialUser());
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  console.log(token);

  // Login function that components can call
  const login = async (email, password) => {
    try{
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        // { withCredentials: true }
      );

      if (res.data && res.data.token) {
        // The API response has a user object and a token
        const userPayload = {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email
        };

        // Update state
        setUser(userPayload);
        setToken(res.data.token);

        // Store in localStorage to persist session
        localStorage.setItem('user', JSON.stringify(userPayload));
        localStorage.setItem('token', res.data.token);
        return res.data; // Return data for navigation
      } 
    }catch (error) {
      // Re-throw the error so the login component can catch it
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // The value provided to consuming components
  const value = { user, token, login, logout };

  // You can add this log to see exactly what your provider is offering
  console.log('AuthProvider is providing this value:', value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy consumption
export const useAuth = () => {
  return useContext(AuthContext);
};
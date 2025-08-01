import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Homepage.jsx";
import { ToastContainer } from "react-toastify";
import FitnessGoalPage from "./pages/fitnessgoalpage.js";
import WorkVisualization from "./components/WorkVisualization.jsx";
// import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/workvisual" element={<WorkVisualization />} />
        <Route path="/fitness-goal" element={<FitnessGoalPage />} />
      </Routes>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
};

export default App;

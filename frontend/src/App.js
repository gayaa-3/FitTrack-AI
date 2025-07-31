// 
import React from "react";
import WorkoutVisualization from "./components/WorkoutVisualization";
import "./App.css"; // If Tailwind is set up here

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto py-10">
        <WorkoutVisualization />
      </div>
    </div>
  );
}

export default App;

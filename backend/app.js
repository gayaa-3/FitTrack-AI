// import express from "express";
// const app = express();
// export default app;
// backend/app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";


dotenv.config({ path: "backend/config/config.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));
export default app;

import express from "express";
import {
  getTodayWorkout,
  createWorkoutPlan,
  startWorkout,
  endWorkout,
  getWorkoutLogs
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/today", getTodayWorkout);
router.post("/create", createWorkoutPlan);
router.post("/start", startWorkout);
router.post("/end", endWorkout);
router.get("/logs", getWorkoutLogs);

export default router;

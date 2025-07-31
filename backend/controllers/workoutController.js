import WorkoutPlan from "../models/WorkoutPlan.js";
import WorkoutLog from "../models/WorkoutLog.js";
import User from "../models/userModel.js"; 

export const getTodayWorkout = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const plan = await WorkoutPlan.findOne({
      userId,
      date: { $gte: today }
    });

    if (!plan) {
      return res.status(404).json({ message: "No workout for today" });
    }

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWorkoutPlan = async (req, res) => {
  try {
    const { userId, goal, exercises } = req.body;

    const plan = new WorkoutPlan({ userId, goal, exercises });
    await plan.save();

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const startWorkout = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const log = new WorkoutLog({
      userId,
      planId,
      startTime: new Date(),
      status: "in-progress"
    });

    await log.save();
    res.status(201).json({ message: "Workout started", sessionId: log._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const endWorkout = async (req, res) => {
  try {
    const { sessionId, completedExercises } = req.body;

    const log = await WorkoutLog.findById(sessionId);
    if (!log) return res.status(404).json({ message: "Session not found" });

    log.endTime = new Date();
    log.duration = Math.round((log.endTime - log.startTime) / 60000); // minutes
    log.completedExercises = completedExercises;
    log.status = "completed";

    await log.save();
    res.status(200).json({ message: "Workout completed", log });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWorkoutLogs = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    const logs = await WorkoutLog.find({ userId }).sort({ date: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

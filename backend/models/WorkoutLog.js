import mongoose from "mongoose";

const completedExerciseSchema = new mongoose.Schema({
  name: String,
  setsDone: Number,
  notes: String
});

const workoutLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },
  startTime: Date,
  endTime: Date,
  date: { type: Date, default: Date.now },
  completedExercises: [completedExerciseSchema],
  duration: Number,
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" }
});

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema);

export default WorkoutLog;

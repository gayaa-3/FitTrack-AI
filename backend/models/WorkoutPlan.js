import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  rest: { type: String, required: true }
});

const workoutPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: String,
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema]
});

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
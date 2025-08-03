// import mongoose from "mongoose";

// const exerciseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   sets: { type: Number, required: true },
//   reps: { type: String, required: true },
//   rest: { type: String, required: true }
// });

// const workoutPlanSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   goal: String,
//   date: { type: Date, default: Date.now },
//   exercises: [exerciseSchema]
// });

// const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

// export default WorkoutPlan;

import mongoose from "mongoose";

// Defines the structure for a single exercise
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: String, required: true },
  reps: { type: String, required: true },
  rest: { type: String },
  form: { type: String }
});

// Defines the structure for a single day's workout
const workoutDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String },
  focus: { type: String },
  exercises: [exerciseSchema] // An array of exercises
});

// This is the main schema for the entire workout plan
const workoutPlanSchema = new mongoose.Schema({
  // This links the plan to a specific user. It's the most important field.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, default: "My AI Workout Plan" },
  // --- Fields from the AI response ---
  planOverview: { type: String },
  expectedResults: { type: String },
  weeklyStructure: { type: String },
  workouts: [workoutDaySchema], // An array of workout days
  nutritionTips: [String],
  safetyTips: [String],
  totalDays: { type: Number }
}, {
  // This automatically adds `createdAt` and `updatedAt` fields
  timestamps: true 
});

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
export default WorkoutPlan;
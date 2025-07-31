import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Backend is running!' });
});
const genAI = new GoogleGenerativeAI("AIzaSyB3ze6AI0qFomAhqLecKZHd36muIBc1430");
router.post('/workout-suggestion', async (req, res) => {
  console.log("AI workout plan generation started...");
  try {
    const {
      fitnessGoal,
      timeframe,
      fitnessLevel,
      workoutFrequency,
      sessionDuration,
      availableEquipment,
      preferredWorkoutTypes,
      additionalNotes
    } = req.body;

    if (!fitnessGoal || !fitnessLevel || !workoutFrequency || !sessionDuration) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields to generate a plan.'
      });
    }
    const prompt = `
      You are an expert fitness coach who ONLY responds with perfectly valid, RFC 8259 compliant JSON.
      Create a personalized workout plan based on the following user details.

      **User Details:**
      - Goal: ${fitnessGoal}
      - Level: ${fitnessLevel}
      - Frequency: ${workoutFrequency} days per week
      - Duration: ${sessionDuration} minutes per session
      - Equipment: ${availableEquipment || 'Bodyweight only'}
      - Preferred Workouts: ${preferredWorkoutTypes || 'General Mix'}
      - Timeframe: ${timeframe || 'Not specified'}
      - Notes: ${additionalNotes || 'None'}

      **Required JSON Structure:**
      {
        "planOverview": "A brief, encouraging description of the plan.",
        "totalDays": ${Number(workoutFrequency)},
        "expectedResults": "A realistic summary of expected results.",
        "weeklyStructure": "A short overview of the weekly schedule.",
        "workouts": [
          {
            "day": 1,
            "title": "Full Body Workout",
            "duration": "${sessionDuration} minutes",
            "focus": "Strength and Cardio",
            "exercises": [
              { "name": "Squats", "sets": "3", "reps": "12", "rest": "60s", "form": "Keep back straight." }
            ]
          }
        ],
        "nutritionTips": ["First nutrition tip.", "Second nutrition tip.", "Third nutrition tip."],
        "safetyTips": ["First safety tip.", "Second safety tip."]
      }

      **IMPORTANT INSTRUCTIONS:**
      - The entire response MUST be a single JSON object.
      - Do not include any text, explanations, or markdown formatting like \`\`\`json before or after the JSON object.
      - Ensure all strings are enclosed in double quotes.
      - Ensure every element in an array is separated by a comma, except for the last one.
      - Generate exactly ${workoutFrequency} workout objects in the "workouts" array.
      - Each workout must have 4-6 exercises.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let workoutPlan;
    try {
      const cleanedText = responseText.replace(/```json\n?/, '').replace(/```$/, '').trim();
      workoutPlan = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("AI returned invalid JSON:", responseText);
      throw new Error("Failed to parse the AI's response. Please try again.");
    }
    
    console.log("Successfully generated workout plan!");
    res.status(200).json({
      success: true,
      data: workoutPlan
    });

  } catch (error) {
    console.error('Error in /generate-workout-plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate workout plan due to a server error.'
    });
  }
});

export default router;
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import WorkoutPlan from '../models/WorkoutPlan.js';

dotenv.config({ path: "config/.env" });

// console.log('Gemini Key:', process.env.GEMINI_API_KEY);
// console.log('port: ', process.env.PORT);
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Backend is running!' });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
      // console.log(responseText);
      const cleanedText = responseText.replace(/```json\n?/, '').replace(/```$/, '').trim();
      //This line is used to clean up a code block string (usually returned by an AI like Gemini or ChatGPT) that is wrapped in triple backticks and labeled as JSON
      console.log(cleanedText);
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

router.post('/save-plan', async (req, res) => {
  try {
    const {userId, planName, workoutPlan } = req.body;
    // console.log(req.body);
    // IMPORTANT: You need to get the logged-in user's ID.
    // This usually comes from an authentication middleware that decodes a JWT.
    // I'll use a placeholder here. Replace 'PLACEHOLDER_USER_ID' with your actual user ID logic.
    // const userId = req.user ? req.user.id : '68921de81dca11dae7072c8c';//'PLACEHOLDER_USER_ID'; 
    console.log("received userId: " + userId)
    if (!workoutPlan || !userId) {
      return res.status(400).json({ error: 'Workout plan and user ID are required.' });
    }

    // Create a new document using the WorkoutPlan model
    const newPlan = new WorkoutPlan({
      userId,
      planName,
      // Spread all the properties from the workoutPlan object
      ...workoutPlan
    });

    // Save the document to the database
    await newPlan.save();

    res.status(201).json({ 
      success: true, 
      message: 'Workout plan saved successfully!',
      data: newPlan 
    });

  } catch (error) {
    console.error('Error saving workout plan:', error);
    res.status(500).json({ error: 'Failed to save workout plan.' });
  }
});

export default router;
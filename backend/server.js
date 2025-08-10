import app from "./app.js";
import dotenv from "dotenv";
import cors from 'cors';
import express from 'express';

dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 8000;


// ✅ CORS Configuration
const corsOptions = {
  // This is the URL of your deployed frontend app
  origin: process.env.CORS_ORIGIN,
  // This is important for handling cookies or authorization headers
  credentials: true, 
};

// Use the cors middleware with your options
app.use(cors(corsOptions));

// This middleware is for parsing JSON bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const API_BASE_URL = 'http://localhost:8000/api';


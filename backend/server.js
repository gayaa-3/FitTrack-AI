import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const API_BASE_URL = 'http://localhost:8000/api';

